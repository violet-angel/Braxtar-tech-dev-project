function computeBuyerPrice(listing) {
  const sellerPrice = Number(listing.sellerPrice || 0);
  const value = Number(listing.commissionValue || 0);
  if (listing.commissionType === "percentage") {
    return Math.round(sellerPrice + sellerPrice * (value / 100));
  }
  return Math.round(sellerPrice + value);
}

function toBuyerListing(listing) {
  return {
    id: listing.id,
    title: listing.title,
    category: listing.category,
    brand: listing.brand,
    model: listing.model,
    yearManufactured: listing.yearManufactured,
    condition: listing.condition,
    hoursUsed: listing.hoursUsed ?? null,
    description: listing.description,
    specs: listing.specs,
    buyerPrice: computeBuyerPrice(listing),
    currency: listing.currency,
    region: listing.region,
    status: listing.status,
    images: listing.images,
    publicDocuments: listing.publicDocuments,
    createdAt: listing.createdAt
  };
}

function toAdminListing(listing) {
  return {
    ...listing,
    buyerPrice: computeBuyerPrice(listing)
  };
}

module.exports = { computeBuyerPrice, toBuyerListing, toAdminListing };
