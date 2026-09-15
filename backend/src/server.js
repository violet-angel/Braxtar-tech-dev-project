const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { randomUUID } = require("crypto");
const { readDb, writeDb } = require("./data/store");
const { computeBuyerPrice, toBuyerListing, toAdminListing } = require("./middleware/serializers");
const { requireRole } = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors({ origin: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (_, res) => res.json({ ok: true, service: "Braxtar Tech Marketplace API" }));

// PUBLIC: strict allowlist serialization.
app.get("/api/listings", (req, res) => {
  const db = readDb();
  let listings = db.listings.filter(l => l.status === "active");
  const { category, brand, condition, minPrice, maxPrice, q } = req.query;

  if (category) listings = listings.filter(l => l.category === category);
  if (brand) listings = listings.filter(l => l.brand === brand);
  if (condition) listings = listings.filter(l => l.condition === condition);
  if (minPrice) listings = listings.filter(l => computeBuyerPrice(l) >= Number(minPrice));
  if (maxPrice) listings = listings.filter(l => computeBuyerPrice(l) <= Number(maxPrice));
  if (q) {
    const term = String(q).toLowerCase();
    listings = listings.filter(l =>
      [l.title, l.category, l.brand, l.model, l.description].some(v => String(v || "").toLowerCase().includes(term))
    );
  }

  res.json({ listings: listings.map(toBuyerListing) });
});

app.get("/api/listings/:id", (req, res) => {
  const db = readDb();
  const listing = db.listings.find(l => l.id === req.params.id && l.status === "active");
  if (!listing) return res.status(404).json({ error: "Listing not found" });
  res.json({ listing: toBuyerListing(listing) });
});

app.post("/api/inquiries", (req, res) => {
  const db = readDb();
  const { listingId, buyerName, buyerEmail, buyerPhone, message } = req.body;
  const listing = db.listings.find(l => l.id === listingId && l.status === "active");
  if (!listing) return res.status(404).json({ error: "Listing not found" });
  if (!buyerName || !buyerEmail || !buyerPhone || !message) {
    return res.status(400).json({ error: "All inquiry fields are required." });
  }
  const inquiry = {
    id: randomUUID(), listingId, buyerId: null, buyerName, buyerEmail, buyerPhone, message,
    status: "new", createdAt: new Date().toISOString()
  };
  db.inquiries.push(inquiry);
  writeDb(db);
  res.status(201).json({ inquiry: { id: inquiry.id, status: inquiry.status } });
});

// ADMIN: full internal data is only returned here.
app.get("/api/admin/listings", requireRole("admin"), (_, res) => {
  const db = readDb();
  res.json({ listings: db.listings.map(toAdminListing) });
});

app.post("/api/admin/listings", requireRole("admin"), (req, res) => {
  const db = readDb();
  const body = req.body;
  const now = new Date().toISOString();
  const listing = {
    id: body.id || `bx-${randomUUID().slice(0, 8)}`,
    title: body.title, category: body.category, brand: body.brand, model: body.model,
    yearManufactured: body.yearManufactured || null, condition: body.condition,
    hoursUsed: body.hoursUsed ?? null, description: body.description || "",
    specs: body.specs || {}, sellerId: body.sellerId || null, sellerName: body.sellerName || "",
    sellerContact: body.sellerContact || "", sellerPrice: Number(body.sellerPrice || 0),
    commissionType: body.commissionType || "percentage", commissionValue: Number(body.commissionValue || 0),
    currency: body.currency || "KES", exactLocation: body.exactLocation || "",
    region: body.region || "", status: body.status || "pending_review",
    images: body.images || [], publicDocuments: body.publicDocuments || [],
    createdAt: now, updatedAt: now
  };
  db.listings.push(listing);
  writeDb(db);
  res.status(201).json({ listing: toAdminListing(listing) });
});

app.put("/api/admin/listings/:id", requireRole("admin"), (req, res) => {
  const db = readDb();
  const index = db.listings.findIndex(l => l.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Listing not found" });
  const existing = db.listings[index];
  db.listings[index] = { ...existing, ...req.body, id: existing.id, updatedAt: new Date().toISOString() };
  writeDb(db);
  res.json({ listing: toAdminListing(db.listings[index]) });
});

app.delete("/api/admin/listings/:id", requireRole("admin"), (req, res) => {
  const db = readDb();
  const listing = db.listings.find(l => l.id === req.params.id);
  if (!listing) return res.status(404).json({ error: "Listing not found" });
  listing.status = "removed";
  listing.updatedAt = new Date().toISOString();
  writeDb(db);
  res.json({ ok: true });
});

app.get("/api/admin/inquiries", requireRole("admin"), (_, res) => {
  const db = readDb();
  const inquiries = db.inquiries.map(i => ({
    ...i,
    listingTitle: db.listings.find(l => l.id === i.listingId)?.title || "Unknown listing"
  }));
  res.json({ inquiries });
});

app.patch("/api/admin/inquiries/:id", requireRole("admin"), (req, res) => {
  const db = readDb();
  const inquiry = db.inquiries.find(i => i.id === req.params.id);
  if (!inquiry) return res.status(404).json({ error: "Inquiry not found" });
  if (!["new","contacted","negotiating","closed","lost"].includes(req.body.status)) {
    return res.status(400).json({ error: "Invalid inquiry status" });
  }
  inquiry.status = req.body.status;
  writeDb(db);
  res.json({ inquiry });
});

app.get("/api/admin/deals", requireRole("admin"), (_, res) => {
  const db = readDb();
  res.json({ deals: db.deals });
});

app.post("/api/admin/deals", requireRole("admin"), (req, res) => {
  const db = readDb();
  const listing = db.listings.find(l => l.id === req.body.listingId);
  if (!listing) return res.status(404).json({ error: "Listing not found" });
  const finalPrice = Number(req.body.finalPrice || 0);
  const commissionAmount = Math.max(0, finalPrice - Number(listing.sellerPrice || 0));
  const deal = {
    id: randomUUID(), listingId: listing.id, inquiryId: req.body.inquiryId || null,
    sellerPrice: listing.sellerPrice, finalPrice, commissionAmount,
    status: req.body.status || "closed", closedAt: new Date().toISOString()
  };
  db.deals.push(deal);
  listing.status = "sold";
  writeDb(db);
  res.status(201).json({ deal });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => console.log(`Braxtar API running on port ${PORT}`));
