import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  Menu,
  X,
  ShieldCheck,
  ArrowRight,
  Heart,
  MessageSquare,
  LayoutDashboard,
  PackageSearch,
  Users,
  CircleDollarSign,
  MapPin,
  CheckCircle2
} from "lucide-react";
import { api } from "./api";
import "./index.css";

const LOGO = "/braxtar-logo.svg";

const categories = [
  [
    "Radiology & Imaging",
    "MRI, CT, Digital X-Ray, Mobile DR, Ultrasound, C-Arm"
  ],
  [
    "ICU & Critical Care",
    "Patient monitors, ventilators, ECG, pumps, defibrillators"
  ],
  [
    "Theatre & Surgical",
    "Operating tables, surgical lights, anaesthesia and sterilization"
  ],
  [
    "Dialysis",
    "Dialysis machines and consumables"
  ],
  [
    "Spare Parts & Accessories",
    "X-ray tubes, detectors, probes, sensors and connectors"
  ]
];

const sliderImages = [
  "/products/medical-equipment-1.png",
  "/products/medical-equipment-2.png",
  "/products/medical-equipment-3.png",
  "/products/medical-equipment-4.png",
  "/products/medical-equipment-5.png",
  "/products/medical-equipment-6.png"
];

/* =========================================================
   LOGO
========================================================= */

function Logo({ small = false }) {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 font-bold text-slate-900"
    >
      <img
        src={LOGO}
        alt="Braxtar Tech"
        className={small ? "h-9 w-9" : "h-11 w-11"}
      />

      {!small && (
        <span className="tracking-tight">
          BRAXTAR{" "}
          <span className="text-braxtar-600">
            TECH
          </span>
        </span>
      )}
    </Link>
  );
}

/* =========================================================
   HEADER
========================================================= */

function Header() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">

        <Logo />

        <nav className="hidden items-center gap-7 md:flex">

          <Link
            to="/"
            className="text-sm font-semibold hover:text-braxtar-600"
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            className="flex items-center gap-1 text-sm font-semibold hover:text-braxtar-600"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>

          <Link
            to="/catalog"
            className="text-sm font-semibold hover:text-braxtar-600"
          >
            Equipment
          </Link>

          <Link
            to="/about"
            className="text-sm font-semibold hover:text-braxtar-600"
          >
            About Braxtar
          </Link>

          <Link
            to="/admin"
            className="text-sm font-semibold hover:text-braxtar-600"
          >
            Admin
          </Link>

        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {open && (
        <div className="border-t bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">

            <Link
              onClick={closeMenu}
              to="/"
              className="font-semibold"
            >
              Home
            </Link>

            <Link
              onClick={closeMenu}
              to="/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>

            <Link
              onClick={closeMenu}
              to="/catalog"
              className="font-semibold"
            >
              Equipment
            </Link>

            <Link
              onClick={closeMenu}
              to="/about"
              className="font-semibold"
            >
              About Braxtar
            </Link>

            <Link
              onClick={closeMenu}
              to="/admin"
              className="font-semibold"
            >
              Admin
            </Link>

          </div>
        </div>
      )}
    </header>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  return (
    <footer className="mt-20 bg-slate-950 text-slate-300">

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3">

        <div>
          <Logo small />

          <p className="mt-4 max-w-sm text-sm leading-6">
            Medical equipment supply, installation and engineering
            solutions. Buyers work directly with Braxtar Tech
            throughout the transaction.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">
            Scope of supply
          </h3>

          <p className="mt-3 text-sm leading-6">
            Radiology & Imaging · ICU & Critical Care · Theatre &
            Surgical · Dialysis · Spare Parts & Accessories
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">
            Contact
          </h3>

          <p className="mt-3 text-sm">
            Diamond Plaza, Parklands
            <br />
            P.O. Box 53556-00200
            <br />
            +254 759624355
            <br />
            info@braxtartech.com
          </p>
        </div>

      </div>

      <div className="border-t border-slate-800 py-5 text-center text-xs">
        © 2026 Braxtar Tech Limited. All rights reserved.
      </div>

    </footer>
  );
}

/* =========================================================
   PRICE
========================================================= */

function Price({ listing }) {
  return (
    <div>
      <p className="text-2xl font-black text-braxtar-700">
        {listing.currency}{" "}
        {Number(listing.buyerPrice).toLocaleString()}
      </p>

      <p className="text-xs text-slate-500">
        Braxtar price · contact us to negotiate
      </p>
    </div>
  );
}

/* =========================================================
   CONDITION
========================================================= */

function Condition({ value }) {
  const labels = {
    new: "New",
    "used-excellent": "Used — Excellent",
    "used-good": "Used — Good",
    "for-parts": "For Parts"
  };

  return (
    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
      {labels[value] || value}
    </span>
  );
}

/* =========================================================
   LISTING CARD
========================================================= */

function ListingCard({ listing }) {
  return (
    <Link
      to={`/listing/${listing.id}`}
      className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="aspect-[4/3] overflow-hidden bg-slate-100">

        <img
          src={listing.images?.[0]?.url}
          alt={listing.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

      </div>

      <div className="p-5">

        <div className="mb-3 flex items-center justify-between gap-2">

          <Condition value={listing.condition} />

          <span className="text-xs text-slate-500">
            {listing.region}
          </span>

        </div>

        <h3 className="font-bold leading-6 group-hover:text-braxtar-700">
          {listing.title}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {listing.brand} · {listing.model}
        </p>

        <div className="mt-5">
          <Price listing={listing} />
        </div>

      </div>
    </Link>
  );
}

/* =========================================================
   PRODUCT IMAGE SLIDER
========================================================= */

function ProductSlider() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) =>
      prev === sliderImages.length - 1 ? 0 : prev + 1
    );
  };

  const previous = () => {
    setCurrent((prev) =>
      prev === 0 ? sliderImages.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) =>
        prev === sliderImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-slate-100 shadow-sm">

      <div className="relative h-[320px] sm:h-[400px] md:h-[480px]">

        {sliderImages.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`Braxtar medical equipment ${index + 1}`}
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${
              index === current
                ? "opacity-100"
                : "opacity-0"
            }`}
          />
        ))}

        <button
          onClick={previous}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-4 py-3 text-xl font-bold shadow hover:bg-white"
          aria-label="Previous product"
        >
          ←
        </button>

        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-4 py-3 text-xl font-bold shadow hover:bg-white"
          aria-label="Next product"
        >
          →
        </button>

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">

          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2.5 w-2.5 rounded-full ${
                index === current
                  ? "bg-braxtar-700"
                  : "bg-white"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

/* =========================================================
   HOME
========================================================= */

function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api
      .listings()
      .then((x) => setFeatured(x.listings.slice(0, 3)))
      .catch(console.error);
  }, []);

  return (
    <>
      <section className="bg-gradient-to-br from-braxtar-900 via-braxtar-700 to-braxtar-600 text-white">

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:grid-cols-2 md:py-28">

          <div>

            <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest">
              Medical equipment marketplace
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
              Source hospital equipment with confidence.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Braxtar Tech connects healthcare buyers with new and
              secondhand medical equipment, handling sourcing,
              verification, negotiation and coordination.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              <Link
                to="/catalog"
                className="rounded-xl bg-white px-6 py-3 font-bold text-braxtar-800"
              >
                Browse equipment{" "}
                <ArrowRight className="ml-2 inline h-4" />
              </Link>

              <Link
                to="/dashboard"
                className="rounded-xl border border-white/30 px-6 py-3 font-bold"
              >
                Open dashboard
              </Link>

              <Link
                to="/about"
                className="rounded-xl border border-white/30 px-6 py-3 font-bold"
              >
                How Braxtar works
              </Link>

            </div>

          </div>

          <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur">

            <div className="grid grid-cols-2 gap-4">

              {[
                "MRI & CT",
                "Digital X-Ray",
                "Ultrasound",
                "ICU Equipment",
                "ECG Machines",
                "Theatre Equipment"
              ].map((x) => (
                <div
                  key={x}
                  className="rounded-2xl bg-white/10 p-5"
                >
                  <ShieldCheck className="mb-5 h-6" />

                  <p className="font-bold">
                    {x}
                  </p>

                  <p className="mt-1 text-xs text-blue-100">
                    Source through Braxtar
                  </p>
                </div>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* Product slider */}

      <section className="mx-auto max-w-7xl px-4 py-16">

        <div className="mb-8">

          <p className="text-sm font-bold uppercase tracking-widest text-braxtar-600">
            Featured equipment
          </p>

          <h2 className="mt-2 text-3xl font-black">
            Equipment we market
          </h2>

          <p className="mt-3 max-w-2xl text-slate-600">
            Explore medical equipment sourced and coordinated
            through Braxtar Tech.
          </p>

        </div>

        <ProductSlider />

      </section>

      {/* Existing featured listings */}

      <section className="mx-auto max-w-7xl px-4 py-16">

        <div className="flex items-end justify-between">

          <div>

            <p className="text-sm font-bold uppercase tracking-widest text-braxtar-600">
              Featured
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Available equipment
            </h2>

          </div>

          <Link
            to="/catalog"
            className="font-bold text-braxtar-700"
          >
            View all{" "}
            <ArrowRight className="inline h-4" />
          </Link>

        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          {featured.map((x) => (
            <ListingCard
              key={x.id}
              listing={x}
            />
          ))}

        </div>

      </section>

      {/* Existing Why Braxtar section */}

      <section className="bg-white">

        <div className="mx-auto max-w-7xl px-4 py-16">

          <h2 className="text-3xl font-black">
            Why buy through Braxtar?
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">

            {[
              [
                "One trusted contact",
                "Buyers deal with Braxtar Tech throughout the process."
              ],
              [
                "Equipment-focused review",
                "Listings are reviewed before publication, including photos and documents."
              ],
              [
                "Engineering support",
                "Supply, installation, maintenance, calibration, troubleshooting and training are part of Braxtar's service scope."
              ]
            ].map(([a, b]) => (
              <div
                className="rounded-2xl border p-6"
                key={a}
              >

                <ShieldCheck className="h-7 text-braxtar-600" />

                <h3 className="mt-5 font-bold">
                  {a}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {b}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>
    </>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard() {
  const navigate = useNavigate();

  const [featured, setFeatured] = useState([]);
  const [categoryListings, setCategoryListings] = useState([]);

  useEffect(() => {
    api
      .listings()
      .then((x) => {
        setFeatured(x.listings || []);
        setCategoryListings(x.listings || []);
      })
      .catch(console.error);
  }, []);

  const categories = [
    "Radiology & Imaging",
    "ICU & Critical Care",
    "Theatre & Surgical",
    "Dialysis",
    "Spare Parts & Accessories",
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(Number(price) || 0);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">

      {/* Dashboard Hero */}

      <div className="rounded-3xl bg-gradient-to-br from-braxtar-900 via-braxtar-700 to-braxtar-600 p-8 text-white md:p-12">

        <div className="max-w-3xl">

          <p className="text-sm font-bold uppercase tracking-widest text-blue-100">
            Braxtar Tech
          </p>

          <h1 className="mt-3 text-4xl font-black md:text-5xl">
            Medical Equipment Dashboard
          </h1>

          <p className="mt-5 text-lg leading-8 text-blue-100">
            Browse available medical equipment, explore products
            and send your equipment requests directly to Braxtar Tech.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">

            <button
              onClick={() => navigate("/catalog")}
              className="rounded-xl bg-white px-6 py-3 font-bold text-braxtar-800"
            >
              Browse equipment
            </button>

            <button
              onClick={() => navigate("/about")}
              className="rounded-xl border border-white/30 px-6 py-3 font-bold"
            >
              About Braxtar
            </button>

          </div>

        </div>

      </div>


      {/* Quick access */}

      <section className="mt-12">

        <h2 className="text-2xl font-black">
          Quick access
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-3">

          <Link
            to="/catalog"
            className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >

            <PackageSearch className="h-8 text-braxtar-600" />

            <h3 className="mt-5 text-lg font-bold">
              Browse Equipment
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Search and filter medical equipment available through
              the Braxtar marketplace.
            </p>

          </Link>


          <Link
            to="/about"
            className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >

            <Users className="h-8 text-braxtar-600" />

            <h3 className="mt-5 text-lg font-bold">
              About Braxtar
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Learn about Braxtar's medical equipment and engineering
              services.
            </p>

          </Link>


          <Link
            to="/admin"
            className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >

            <LayoutDashboard className="h-8 text-braxtar-600" />

            <h3 className="mt-5 text-lg font-bold">
              Administration
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Internal listing, inquiry and deal management.
            </p>

          </Link>

        </div>

      </section>


      {/* Equipment Categories */}

      <section className="mt-14">

        <div className="mb-8">

          <p className="text-sm font-bold uppercase tracking-widest text-braxtar-600">
            Equipment categories
          </p>

          <h2 className="mt-2 text-3xl font-black">
            Browse by category
          </h2>

          <p className="mt-3 max-w-2xl text-slate-600">
            Explore medical equipment by category. Each category
            displays the lowest-priced equipment currently available.
          </p>

        </div>


        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {categories.map((category) => {

            const categoryEquipment = categoryListings.filter(
              (item) => item.category === category
            );

            const cheapestEquipment = categoryEquipment.reduce(
              (cheapest, item) => {

                if (!cheapest) {
                  return item;
                }

                return Number(item.buyerPrice) <
                  Number(cheapest.buyerPrice)
                  ? item
                  : cheapest;

              },
              null
            );

            const coverImage =
              cheapestEquipment?.images?.[0]?.url;

            return (
              <Link
                key={category}
                to={`/catalog?category=${encodeURIComponent(category)}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">

                  {coverImage ? (

                    <img
                      src={coverImage}
                      alt={
                        cheapestEquipment?.name || category
                      }
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                  ) : (

                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100">

                      <PackageSearch className="h-10 w-10 text-slate-400" />

                      <p className="mt-3 text-sm text-slate-500">
                        No equipment available
                      </p>

                    </div>

                  )}


                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />


                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">

                    <h3 className="text-lg font-bold">
                      {category}
                    </h3>

                    {cheapestEquipment && (
                      <p className="mt-1 text-sm text-white/80">
                        From{" "}
                        {formatPrice(
                          cheapestEquipment.buyerPrice
                        )}
                      </p>
                    )}

                    <p className="mt-3 text-sm font-semibold">
                      View equipment →
                    </p>

                  </div>

                </div>

              </Link>
            );

          })}

        </div>

      </section>


      {/* Dashboard Product Slider */}

      <section className="mt-14">

        <div className="mb-6">

          <p className="text-sm font-bold uppercase tracking-widest text-braxtar-600">
            Product showcase
          </p>

          <h2 className="mt-2 text-3xl font-black">
            Equipment being marketed
          </h2>

        </div>

        <ProductSlider />

      </section>


      {/* Current equipment */}

      <section className="mt-14">

        <div className="flex items-end justify-between">

          <div>

            <p className="text-sm font-bold uppercase tracking-widest text-braxtar-600">
              Marketplace
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Current equipment
            </h2>

          </div>

          <Link
            to="/catalog"
            className="font-bold text-braxtar-700"
          >
            View all
          </Link>

        </div>


        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {featured.slice(0, 6).map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
            />
          ))}

        </div>

      </section>

    </main>
  );
}

/* =========================================================
   CATALOG
========================================================= */

function Catalog() {
  const [searchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";

  const [filters, setFilters] = useState({
    q: "",
    category: selectedCategory,
    condition: "",
    minPrice: "",
    maxPrice: ""
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setFilters((current) => ({
      ...current,
      category: selectedCategory
    }));
  }, [selectedCategory]);

  useEffect(() => {

    setLoading(true);

    api
      .listings(filters)
      .then((x) => setData(x.listings))
      .finally(() => setLoading(false));

  }, [JSON.stringify(filters)]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">

      <div className="mb-10">

        <p className="text-sm font-bold uppercase tracking-widest text-braxtar-600">
          Marketplace
        </p>

        <h1 className="mt-2 text-4xl font-black">
          Medical equipment
        </h1>

        <p className="mt-3 max-w-2xl text-slate-600">
          Browse Braxtar-reviewed equipment. Exact seller identity
          and facility location are kept confidential.
        </p>

      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

        <aside className="h-fit rounded-2xl border bg-white p-5">

          <h2 className="font-bold">
            Filter
          </h2>

          <label className="mt-5 block text-xs font-bold">

            Search

            <input
              value={filters.q}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  q: e.target.value
                })
              }
              className="mt-2 w-full rounded-lg border p-2.5"
              placeholder="MRI, ECG, ultrasound..."
            />

          </label>

          <label className="mt-5 block text-xs font-bold">

            Category

            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  category: e.target.value
                })
              }
              className="mt-2 w-full rounded-lg border p-2.5"
            >

              <option value="">
                All
              </option>

              {categories.map(([c]) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}

            </select>

          </label>

          <label className="mt-5 block text-xs font-bold">

            Condition

            <select
              value={filters.condition}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  condition: e.target.value
                })
              }
              className="mt-2 w-full rounded-lg border p-2.5"
            >

              <option value="">
                All
              </option>

              <option value="new">
                New
              </option>

              <option value="used-excellent">
                Used — Excellent
              </option>

              <option value="used-good">
                Used — Good
              </option>

              <option value="for-parts">
                For Parts
              </option>

            </select>

          </label>

          <div className="mt-5 grid grid-cols-2 gap-2">

            <input
              value={filters.minPrice}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  minPrice: e.target.value
                })
              }
              type="number"
              placeholder="Min"
              className="rounded-lg border p-2.5"
            />

            <input
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  maxPrice: e.target.value
                })
              }
              type="number"
              placeholder="Max"
              className="rounded-lg border p-2.5"
            />

          </div>

        </aside>

        <section>

          {loading ? (

            <div className="grid gap-6 md:grid-cols-2">

              <div className="h-96 animate-pulse rounded-2xl bg-slate-200" />

              <div className="h-96 animate-pulse rounded-2xl bg-slate-200" />

            </div>

          ) : data.length ? (

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

              {data.map((x) => (
                <ListingCard
                  key={x.id}
                  listing={x}
                />
              ))}

            </div>

          ) : (

            <div className="rounded-2xl border bg-white p-12 text-center">

              <PackageSearch className="mx-auto h-10 text-slate-400" />

              <h2 className="mt-4 font-bold">
                No equipment found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your filters.
              </p>

            </div>

          )}

        </section>

      </div>

    </main>
  );
}

/* =========================================================
   LISTING DETAIL
========================================================= */

function ListingDetail() {
  const { id } = useParams();

  const [listing, setListing] = useState(null);

  const [form, setForm] = useState({
    buyerName: "",
    buyerEmail: "",
    buyerPhone: "",
    message: ""
  });

  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {

    api
      .listing(id)
      .then((x) => setListing(x.listing))
      .catch(() => setError("Listing not found."));

  }, [id]);

  if (error) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-20 text-center">

        <h1 className="text-3xl font-black">
          {error}
        </h1>

        <Link
          to="/catalog"
          className="mt-6 inline-block font-bold text-braxtar-700"
        >
          ← Back to equipment
        </Link>

      </main>
    );
  }

  if (!listing) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20">

        <div className="h-96 animate-pulse rounded-3xl bg-slate-200" />

      </main>
    );
  }

  const submit = async (e) => {

    e.preventDefault();

    setError("");

    try {

      await api.inquiry({
        ...form,
        listingId: id
      });

      setSent(true);

    } catch (err) {

      setError(err.message);

    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">

      <div className="mb-5 flex flex-wrap gap-4">

        <Link
          to="/"
          className="text-sm font-bold text-braxtar-700"
        >
          ← Home
        </Link>

        <Link
          to="/catalog"
          className="text-sm font-bold text-braxtar-700"
        >
          ← Back to equipment
        </Link>

        <Link
          to="/dashboard"
          className="text-sm font-bold text-braxtar-700"
        >
          Dashboard
        </Link>

      </div>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">

        {/* LEFT SIDE */}

        <div>

          <div className="overflow-hidden rounded-3xl bg-slate-100">

            <img
              src={listing.images?.[0]?.url}
              alt={listing.title}
              className="max-h-[620px] w-full object-cover"
            />

          </div>

          <div className="mt-5 rounded-2xl border bg-white p-6">

            <h2 className="font-black">
              Equipment specifications
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-4">

              {Object.entries(listing.specs || {}).map(
                ([k, v]) => (

                  <div key={k}>

                    <p className="text-xs font-bold uppercase text-slate-400">
                      {k}
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {String(v)}
                    </p>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div>

          <div className="flex items-center gap-3">

            <Condition value={listing.condition} />

            <span className="flex items-center gap-1 text-sm text-slate-500">

              <MapPin className="h-4" />

              {listing.region}

            </span>

          </div>

          <h1 className="mt-4 text-4xl font-black leading-tight">
            {listing.title}
          </h1>

          <p className="mt-2 text-slate-500">
            {listing.brand} · {listing.model} ·{" "}
            {listing.yearManufactured}
          </p>

          <div className="mt-7">
            <Price listing={listing} />
          </div>

          <p className="mt-6 leading-7 text-slate-600">
            {listing.description}
          </p>

          {/* Protected sourcing */}

          <div className="mt-8 rounded-2xl border-2 border-braxtar-100 bg-braxtar-50 p-5">

            <div className="flex gap-3">

              <ShieldCheck className="mt-1 h-6 shrink-0 text-braxtar-600" />

              <div>

                <h3 className="font-bold">
                  Protected sourcing
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Braxtar handles buyer communication and seller
                  coordination.
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Seller identity and exact facility location are
                  not published.
                </p>

              </div>

            </div>

          </div>

          {/* Inquiry form */}

          <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="text-xl font-black">
              Ask Braxtar about this equipment
            </h2>

            {sent ? (

              <div className="py-8 text-center">

                <CheckCircle2 className="mx-auto h-12 text-green-600" />

                <h3 className="mt-4 font-bold">
                  Inquiry received
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Braxtar Tech will contact you directly.
                </p>

                <Link
                  to="/dashboard"
                  className="mt-6 inline-block font-bold text-braxtar-700"
                >
                  Return to dashboard
                </Link>

              </div>

            ) : (

              <form
                onSubmit={submit}
                className="mt-5 space-y-4"
              >

                {[
                  "buyerName",
                  "buyerEmail",
                  "buyerPhone"
                ].map((k) => (

                  <input
                    required
                    key={k}
                    value={form[k]}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [k]: e.target.value
                      })
                    }
                    type={
                      k === "buyerEmail"
                        ? "email"
                        : "text"
                    }
                    placeholder={{
                      buyerName: "Full name",
                      buyerEmail: "Email address",
                      buyerPhone: "Phone number"
                    }[k]}
                    className="w-full rounded-xl border p-3.5"
                  />

                ))}

                <textarea
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value
                    })
                  }
                  placeholder="Tell us what you need to know..."
                  rows="4"
                  className="w-full rounded-xl border p-3.5"
                />

                {error && (
                  <p className="text-sm font-semibold text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-braxtar-700 px-5 py-3.5 font-bold text-white hover:bg-braxtar-800"
                >
                  Send inquiry{" "}
                  <MessageSquare className="ml-2 inline h-4" />
                </button>

              </form>

            )}

          </div>

        </div>

      </div>

    </main>
  );
}

/* =========================================================
   ABOUT
========================================================= */

function About() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14">

      <div className="max-w-3xl">

        <p className="text-sm font-bold uppercase tracking-widest text-braxtar-600">
          Braxtar Tech Limited
        </p>

        <h1 className="mt-3 text-4xl font-black">
          Medical equipment supply & engineering solutions
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          Braxtar Tech is a Nairobi-based medical equipment supplier
          and engineering solution provider. Its stated scope includes
          supply, installation and training, alongside biomedical
          engineering services.
        </p>

      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">

        {categories.map(([a, b]) => (

          <div
            key={a}
            className="rounded-2xl border bg-white p-7"
          >

            <h2 className="text-xl font-black">
              {a}
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {b}
            </p>

          </div>

        ))}

      </div>

      <div className="mt-10 rounded-3xl bg-slate-900 p-8 text-white">

        <h2 className="text-2xl font-black">
          How the marketplace works
        </h2>

        <div className="mt-7 grid gap-6 md:grid-cols-4">

          {[
            "Source",
            "Review",
            "Inquire",
            "Coordinate"
          ].map((x, i) => (

            <div key={x}>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-black text-slate-900">
                {i + 1}
              </div>

              <h3 className="mt-4 font-bold">
                {x}
              </h3>

              <p className="mt-2 text-sm text-slate-300">
                {
                  [
                    "Braxtar sources equipment from suppliers.",
                    "Listings, photos and documents are reviewed before publication.",
                    "Buyers send inquiries directly to Braxtar.",
                    "Braxtar negotiates and coordinates the transaction."
                  ][i]
                }
              </p>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}

/* =========================================================
   ADMIN
========================================================= */

function Admin() {
  const [tab, setTab] = useState("listings");

  const [listings, setListings] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [deals, setDeals] = useState([]);

  const [showListingForm, setShowListingForm] = useState(false);
  const [showDealForm, setShowDealForm] = useState(false);

  const [saving, setSaving] = useState(false);

  const [listingForm, setListingForm] = useState({
    title: "",
    category: "Radiology & Imaging",
    brand: "",
    model: "",
    condition: "Used",
    sellerName: "",
    sellerContact: "",
    sellerPrice: "",
    commissionType: "percentage",
    commissionValue: "",
    exactLocation: "",
    region: "",
    status: "pending_review",
    description: ""
  });

  const [dealForm, setDealForm] = useState({
    listingId: "",
    finalPrice: "",
    status: "closed"
  });

  const refresh = () => {
    api.adminListings().then((x) => setListings(x.listings));
    api.adminInquiries().then((x) => setInquiries(x.inquiries));
    api.adminDeals().then((x) => setDeals(x.deals));
  };

  useEffect(() => {
    refresh();
  }, []);

  // =========================
  // PRICE HELPERS
  // =========================

  const formatUSD = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(Number(value || 0));
  };

  const calculateCommission = (sellerPrice, type, value) => {
    const price = Number(sellerPrice || 0);
    const commission = Number(value || 0);

    if (type === "percentage") {
      return price * (commission / 100);
    }

    return commission;
  };

  const calculateBuyerPrice = (sellerPrice, type, value) => {
    return (
      Number(sellerPrice || 0) +
      calculateCommission(sellerPrice, type, value)
    );
  };

  // =========================
  // LISTING FORM
  // =========================

  const listingCommission = calculateCommission(
    listingForm.sellerPrice,
    listingForm.commissionType,
    listingForm.commissionValue
  );

  const listingBuyerPrice = calculateBuyerPrice(
    listingForm.sellerPrice,
    listingForm.commissionType,
    listingForm.commissionValue
  );

  const handleListingChange = (e) => {
    const { name, value } = e.target;

    setListingForm((current) => ({
      ...current,
      [name]: value
    }));
  };

  const addListing = async (e) => {
    e.preventDefault();

    if (!listingForm.title || !listingForm.sellerPrice) {
      alert("Equipment title and seller price are required.");
      return;
    }

    try {
      setSaving(true);

      await api.createListing({
        ...listingForm,
        sellerPrice: Number(listingForm.sellerPrice),
        commissionValue: Number(listingForm.commissionValue || 0),
        currency: "USD"
      });

      setListingForm({
        title: "",
        category: "Radiology & Imaging",
        brand: "",
        model: "",
        condition: "Used",
        sellerName: "",
        sellerContact: "",
        sellerPrice: "",
        commissionType: "percentage",
        commissionValue: "",
        exactLocation: "",
        region: "",
        status: "pending_review",
        description: ""
      });

      setShowListingForm(false);
      refresh();
    } catch (error) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // UPDATE LISTING
  // =========================

  const updateListingField = async (listing, field, value) => {
    try {
      await api.updateListing(listing.id, {
        [field]:
          field === "sellerPrice" || field === "commissionValue"
            ? Number(value)
            : value,
        currency: "USD"
      });

      refresh();
    } catch (error) {
      alert(error.message);
    }
  };

  // =========================
  // DEAL FORM
  // =========================

  const selectedDealListing = listings.find(
    (l) => l.id === dealForm.listingId
  );

  const dealSellerPrice = selectedDealListing
    ? Number(selectedDealListing.sellerPrice || 0)
    : 0;

  const dealFinalPrice = Number(dealForm.finalPrice || 0);

  const dealCommission = Math.max(
    0,
    dealFinalPrice - dealSellerPrice
  );

  const handleDealChange = (e) => {
    const { name, value } = e.target;

    setDealForm((current) => ({
      ...current,
      [name]: value
    }));
  };

  const addDeal = async (e) => {
    e.preventDefault();

    if (!dealForm.listingId || !dealForm.finalPrice) {
      alert("Select a listing and enter the final selling price.");
      return;
    }

    try {
      setSaving(true);

      await api.createDeal({
        listingId: dealForm.listingId,
        finalPrice: Number(dealForm.finalPrice),
        status: dealForm.status,
        currency: "USD"
      });

      setDealForm({
        listingId: "",
        finalPrice: "",
        status: "closed"
      });

      setShowDealForm(false);
      refresh();
    } catch (error) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">

      {/* HEADER */}

      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-braxtar-600">
            Internal
          </p>

          <h1 className="mt-2 text-4xl font-black">
            Braxtar Admin
          </h1>

          <p className="mt-2 text-slate-500">
            Seller-sensitive information is visible only in this area.
          </p>
        </div>

      </div>

      {/* TABS */}

      <div className="mt-8 flex gap-2 overflow-auto border-b">

        {[
          ["listings", "Listings", PackageSearch],
          ["inquiries", "Inquiries", MessageSquare],
          ["deals", "Deals", CircleDollarSign]
        ].map(([key, label, I]) => (

          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold ${
              tab === key
                ? "border-braxtar-700 text-braxtar-700"
                : "border-transparent text-slate-500"
            }`}
          >
            <I className="h-4 w-4" />
            {label}
          </button>

        ))}

      </div>

      {/* =====================================================
          LISTINGS
      ===================================================== */}

      {tab === "listings" && (

        <div className="mt-6">

          <div className="mb-4 flex justify-end">

            <button
              onClick={() => setShowListingForm(!showListingForm)}
              className="rounded-xl bg-braxtar-700 px-5 py-3 text-sm font-bold text-white hover:bg-braxtar-800"
            >
              {showListingForm ? "Close Form" : "+ Add Listing"}
            </button>

          </div>

          {/* ADD LISTING FORM */}

          {showListingForm && (

            <form
              onSubmit={addListing}
              className="mb-6 rounded-2xl border bg-white p-6 shadow-sm"
            >

              <h2 className="text-xl font-black">
                Add Equipment Listing
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                All marketplace prices are entered in USD.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-2">

                <input
                  name="title"
                  value={listingForm.title}
                  onChange={handleListingChange}
                  placeholder="Equipment title"
                  className="rounded-lg border p-3"
                />

                <select
                  name="category"
                  value={listingForm.category}
                  onChange={handleListingChange}
                  className="rounded-lg border p-3"
                >
                  <option>Radiology & Imaging</option>
                  <option>ICU & Critical Care</option>
                  <option>Theatre & Surgical</option>
                  <option>Dialysis</option>
                  <option>Spare Parts & Accessories</option>
                </select>

                <input
                  name="brand"
                  value={listingForm.brand}
                  onChange={handleListingChange}
                  placeholder="Brand"
                  className="rounded-lg border p-3"
                />

                <input
                  name="model"
                  value={listingForm.model}
                  onChange={handleListingChange}
                  placeholder="Model"
                  className="rounded-lg border p-3"
                />

                <select
                  name="condition"
                  value={listingForm.condition}
                  onChange={handleListingChange}
                  className="rounded-lg border p-3"
                >
                  <option>New</option>
                  <option>Used</option>
                  <option>Refurbished</option>
                </select>

                <input
                  name="sellerName"
                  value={listingForm.sellerName}
                  onChange={handleListingChange}
                  placeholder="Seller name"
                  className="rounded-lg border p-3"
                />

                <input
                  name="sellerContact"
                  value={listingForm.sellerContact}
                  onChange={handleListingChange}
                  placeholder="Seller contact"
                  className="rounded-lg border p-3"
                />

                <input
                  name="sellerPrice"
                  type="number"
                  min="0"
                  value={listingForm.sellerPrice}
                  onChange={handleListingChange}
                  placeholder="Seller price (USD)"
                  className="rounded-lg border p-3"
                />

                <select
                  name="commissionType"
                  value={listingForm.commissionType}
                  onChange={handleListingChange}
                  className="rounded-lg border p-3"
                >
                  <option value="percentage">
                    Percentage commission
                  </option>

                  <option value="fixed">
                    Fixed commission
                  </option>
                </select>

                <input
                  name="commissionValue"
                  type="number"
                  min="0"
                  value={listingForm.commissionValue}
                  onChange={handleListingChange}
                  placeholder={
                    listingForm.commissionType === "percentage"
                      ? "Commission (%)"
                      : "Commission (USD)"
                  }
                  className="rounded-lg border p-3"
                />

                <input
                  name="exactLocation"
                  value={listingForm.exactLocation}
                  onChange={handleListingChange}
                  placeholder="Exact location"
                  className="rounded-lg border p-3"
                />

                <input
                  name="region"
                  value={listingForm.region}
                  onChange={handleListingChange}
                  placeholder="Public region"
                  className="rounded-lg border p-3"
                />

                <select
                  name="status"
                  value={listingForm.status}
                  onChange={handleListingChange}
                  className="rounded-lg border p-3"
                >
                  <option value="pending_review">
                    Pending Review
                  </option>

                  <option value="active">
                    Active
                  </option>

                  <option value="sold">
                    Sold
                  </option>

                  <option value="removed">
                    Removed
                  </option>
                </select>

              </div>

              <textarea
                name="description"
                value={listingForm.description}
                onChange={handleListingChange}
                placeholder="Equipment description"
                rows="4"
                className="mt-4 w-full rounded-lg border p-3"
              />

              {/* AUTOMATIC PRICE CALCULATION */}

              <div className="mt-5 grid gap-4 md:grid-cols-3">

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase text-slate-500">
                    Seller Price
                  </p>

                  <p className="mt-1 text-xl font-black">
                    {formatUSD(listingForm.sellerPrice)}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase text-slate-500">
                    Commission
                  </p>

                  <p className="mt-1 text-xl font-black">
                    {formatUSD(listingCommission)}
                  </p>
                </div>

                <div className="rounded-xl bg-braxtar-50 p-4">
                  <p className="text-xs font-bold uppercase text-braxtar-700">
                    Buyer Price
                  </p>

                  <p className="mt-1 text-xl font-black text-braxtar-800">
                    {formatUSD(listingBuyerPrice)}
                  </p>
                </div>

              </div>

              <button
                type="submit"
                disabled={saving}
                className="mt-5 rounded-xl bg-braxtar-700 px-6 py-3 font-bold text-white disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Listing"}
              </button>

            </form>

          )}

          {/* LISTINGS TABLE */}

          <div className="overflow-x-auto rounded-2xl border bg-white">

            <table className="w-full min-w-[1100px] text-left text-sm">

              <thead className="bg-slate-50 text-xs uppercase text-slate-500">

                <tr>
                  <th className="p-4">Equipment</th>
                  <th className="p-4">Seller</th>
                  <th className="p-4">Seller Price</th>
                  <th className="p-4">Commission</th>
                  <th className="p-4">Buyer Price</th>
                  <th className="p-4">Exact Location</th>
                  <th className="p-4">Status</th>
                </tr>

              </thead>

              <tbody>

                {listings.map((l) => (

                  <tr
                    key={l.id}
                    className="border-t"
                  >

                    <td className="p-4">
                      <input
                        defaultValue={l.title}
                        onBlur={(e) =>
                          updateListingField(
                            l,
                            "title",
                            e.target.value
                          )
                        }
                        className="w-48 rounded-lg border p-2 font-semibold"
                      />

                      <p className="mt-1 text-xs text-slate-400">
                        {l.brand} {l.model}
                      </p>
                    </td>

                    <td className="p-4">

                      <input
                        defaultValue={l.sellerName}
                        onBlur={(e) =>
                          updateListingField(
                            l,
                            "sellerName",
                            e.target.value
                          )
                        }
                        className="w-40 rounded-lg border p-2"
                      />

                      <input
                        defaultValue={l.sellerContact}
                        onBlur={(e) =>
                          updateListingField(
                            l,
                            "sellerContact",
                            e.target.value
                          )
                        }
                        className="mt-2 w-40 rounded-lg border p-2 text-xs"
                      />

                    </td>

                    <td className="p-4">

                      <div className="flex items-center gap-1">

                        <span className="font-bold">$</span>

                        <input
                          type="number"
                          defaultValue={l.sellerPrice}
                          onBlur={(e) =>
                            updateListingField(
                              l,
                              "sellerPrice",
                              e.target.value
                            )
                          }
                          className="w-32 rounded-lg border p-2"
                        />

                      </div>

                    </td>

                    <td className="p-4">

                      <div className="space-y-2">

                        <select
                          value={l.commissionType || "percentage"}
                          onChange={(e) =>
                            updateListingField(
                              l,
                              "commissionType",
                              e.target.value
                            )
                          }
                          className="rounded-lg border p-2 text-xs"
                        >
                          <option value="percentage">%</option>
                          <option value="fixed">$</option>
                        </select>

                        <input
                          type="number"
                          defaultValue={l.commissionValue || 0}
                          onBlur={(e) =>
                            updateListingField(
                              l,
                              "commissionValue",
                              e.target.value
                            )
                          }
                          className="w-24 rounded-lg border p-2"
                        />

                      </div>

                    </td>

                    <td className="p-4 font-black text-braxtar-700">
                      {formatUSD(
                        calculateBuyerPrice(
                          l.sellerPrice,
                          l.commissionType,
                          l.commissionValue
                        )
                      )}
                    </td>

                    <td className="p-4">

                      <input
                        defaultValue={l.exactLocation}
                        onBlur={(e) =>
                          updateListingField(
                            l,
                            "exactLocation",
                            e.target.value
                          )
                        }
                        className="w-48 rounded-lg border p-2"
                      />

                    </td>

                    <td className="p-4">

                      <select
                        value={l.status}
                        onChange={(e) =>
                          updateListingField(
                            l,
                            "status",
                            e.target.value
                          )
                        }
                        className="rounded-lg border p-2 font-semibold"
                      >
                        <option value="pending_review">
                          Pending Review
                        </option>

                        <option value="active">
                          Active
                        </option>

                        <option value="sold">
                          Sold
                        </option>

                        <option value="removed">
                          Removed
                        </option>
                      </select>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

      {/* =====================================================
          INQUIRIES
      ===================================================== */}

      {tab === "inquiries" && (

        <div className="mt-6 grid gap-4">

          {inquiries.length ? (

            inquiries.map((i) => (

              <div
                key={i.id}
                className="rounded-2xl border bg-white p-5"
              >

                <div className="flex flex-wrap justify-between gap-3">

                  <div>

                    <h3 className="font-bold">
                      {i.listingTitle}
                    </h3>

                    <p className="mt-1 text-sm">
                      {i.buyerName} · {i.buyerEmail} ·{" "}
                      {i.buyerPhone}
                    </p>

                  </div>

                  <select
                    value={i.status}
                    onChange={async (e) => {

                      try {
                        await api.updateInquiry(
                          i.id,
                          e.target.value
                        );

                        refresh();
                      } catch (error) {
                        alert(error.message);
                      }

                    }}
                    className="rounded-lg border p-2 text-sm font-semibold"
                  >

                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="negotiating">Negotiating</option>
                    <option value="closed">Closed</option>
                    <option value="lost">Lost</option>

                  </select>

                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {i.message}
                </p>

              </div>

            ))

          ) : (

            <p className="py-10 text-center text-slate-500">
              No inquiries yet.
            </p>

          )}

        </div>

      )}

      {/* =====================================================
          DEALS
      ===================================================== */}

      {tab === "deals" && (

        <div className="mt-6">

          <div className="mb-4 flex justify-end">

            <button
              onClick={() => setShowDealForm(!showDealForm)}
              className="rounded-xl bg-braxtar-700 px-5 py-3 text-sm font-bold text-white hover:bg-braxtar-800"
            >
              {showDealForm ? "Close Form" : "+ Add Deal"}
            </button>

          </div>

          {/* ADD DEAL */}

          {showDealForm && (

            <form
              onSubmit={addDeal}
              className="mb-6 rounded-2xl border bg-white p-6 shadow-sm"
            >

              <h2 className="text-xl font-black">
                Record New Deal
              </h2>

              <div className="mt-5 grid gap-4 md:grid-cols-2">

                <select
                  name="listingId"
                  value={dealForm.listingId}
                  onChange={handleDealChange}
                  className="rounded-lg border p-3"
                >

                  <option value="">
                    Select equipment listing
                  </option>

                  {listings
                    .filter((l) => l.status !== "removed")
                    .map((l) => (

                      <option
                        key={l.id}
                        value={l.id}
                      >
                        {l.title}
                      </option>

                    ))}

                </select>

                <input
                  name="finalPrice"
                  type="number"
                  min="0"
                  value={dealForm.finalPrice}
                  onChange={handleDealChange}
                  placeholder="Final selling price (USD)"
                  className="rounded-lg border p-3"
                />

                <select
                  name="status"
                  value={dealForm.status}
                  onChange={handleDealChange}
                  className="rounded-lg border p-3"
                >
                  <option value="pending">Pending</option>
                  <option value="closed">Closed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

              </div>

              {/* AUTOMATIC DEAL CALCULATION */}

              <div className="mt-5 grid gap-4 md:grid-cols-3">

                <div className="rounded-xl bg-slate-50 p-4">

                  <p className="text-xs font-bold uppercase text-slate-500">
                    Seller Price
                  </p>

                  <p className="mt-1 text-xl font-black">
                    {formatUSD(dealSellerPrice)}
                  </p>

                </div>

                <div className="rounded-xl bg-slate-50 p-4">

                  <p className="text-xs font-bold uppercase text-slate-500">
                    Final Price
                  </p>

                  <p className="mt-1 text-xl font-black">
                    {formatUSD(dealFinalPrice)}
                  </p>

                </div>

                <div className="rounded-xl bg-braxtar-50 p-4">

                  <p className="text-xs font-bold uppercase text-braxtar-700">
                    Commission
                  </p>

                  <p className="mt-1 text-xl font-black text-braxtar-800">
                    {formatUSD(dealCommission)}
                  </p>

                </div>

              </div>

              <button
                type="submit"
                disabled={saving}
                className="mt-5 rounded-xl bg-braxtar-700 px-6 py-3 font-bold text-white disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Deal"}
              </button>

            </form>

          )}

          {/* DEALS TABLE */}

          <div className="overflow-x-auto rounded-2xl border bg-white">

            <table className="w-full min-w-[900px] text-left text-sm">

              <thead className="bg-slate-50 text-xs uppercase text-slate-500">

                <tr>
                  <th className="p-4">Listing</th>
                  <th className="p-4">Seller Price</th>
                  <th className="p-4">Final Price</th>
                  <th className="p-4">Commission</th>
                  <th className="p-4">Status</th>
                </tr>

              </thead>

              <tbody>

                {deals.map((d) => {

                  const listing = listings.find(
                    (l) => l.id === d.listingId
                  );

                  return (
                    <tr
                      className="border-t"
                      key={d.id}
                    >

                      <td className="p-4 font-semibold">
                        {listing?.title || d.listingId}
                      </td>

                      <td className="p-4">
                        {formatUSD(d.sellerPrice)}
                      </td>

                      <td className="p-4">

                        <input
                          type="number"
                          defaultValue={d.finalPrice}
                          onBlur={(e) => {
                            const newFinalPrice =
                              Number(e.target.value || 0);

                            const commission = Math.max(
                              0,
                              newFinalPrice -
                                Number(d.sellerPrice || 0)
                            );

                            console.log(
                              "Updated deal:",
                              d.id,
                              newFinalPrice,
                              commission
                            );
                          }}
                          className="w-32 rounded-lg border p-2"
                        />

                      </td>

                      <td className="p-4 font-black text-braxtar-700">
                        {formatUSD(d.commissionAmount)}
                      </td>

                      <td className="p-4">

                        <select
                          value={d.status}
                          onChange={(e) => {

                            setDeals((current) =>
                              current.map((deal) =>
                                deal.id === d.id
                                  ? {
                                      ...deal,
                                      status: e.target.value
                                    }
                                  : deal
                              )
                            );

                          }}
                          className="rounded-lg border p-2 font-semibold"
                        >

                          <option value="pending">
                            Pending
                          </option>

                          <option value="closed">
                            Closed
                          </option>

                          <option value="cancelled">
                            Cancelled
                          </option>

                        </select>

                      </td>

                    </tr>
                  );

                })}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </main>
  );
}

/* =========================================================
   APP ROUTES
========================================================= */

function App() {
  return (
    <>
      <Header />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/catalog"
          element={<Catalog />}
        />

        <Route
          path="/listing/:id"
          element={<ListingDetail />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

        <Route
          path="*"
          element={<Home />}
        />

      </Routes>

      <Footer />
    </>
  );
}

createRoot(
  document.getElementById("root")
).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);