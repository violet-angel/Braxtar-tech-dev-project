const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

const ADMIN_HEADERS = {
  "x-demo-role": "admin"
};

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
}

export const api = {
  // =========================
  // PUBLIC
  // =========================

  listings: (params = {}) => {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== "" && v != null)
    );

    return request(`/listings?${qs}`);
  },

  listing: (id) =>
    request(`/listings/${id}`),

  inquiry: (body) =>
    request("/inquiries", {
      method: "POST",
      body: JSON.stringify(body)
    }),


  // =========================
  // ADMIN - LISTINGS
  // =========================

  adminListings: () =>
    request("/admin/listings", {
      headers: ADMIN_HEADERS
    }),

  createListing: (body) =>
    request("/admin/listings", {
      method: "POST",
      headers: ADMIN_HEADERS,
      body: JSON.stringify({
        ...body,
        currency: "USD"
      })
    }),

  updateListing: (id, body) =>
    request(`/admin/listings/${id}`, {
      method: "PUT",
      headers: ADMIN_HEADERS,
      body: JSON.stringify({
        ...body,
        currency: "USD"
      })
    }),

  deleteListing: (id) =>
    request(`/admin/listings/${id}`, {
      method: "DELETE",
      headers: ADMIN_HEADERS
    }),


  // =========================
  // ADMIN - INQUIRIES
  // =========================

  adminInquiries: () =>
    request("/admin/inquiries", {
      headers: ADMIN_HEADERS
    }),

  updateInquiry: (id, status) =>
    request(`/admin/inquiries/${id}`, {
      method: "PATCH",
      headers: ADMIN_HEADERS,
      body: JSON.stringify({ status })
    }),


  // =========================
  // ADMIN - DEALS
  // =========================

  adminDeals: () =>
    request("/admin/deals", {
      headers: ADMIN_HEADERS
    }),

  createDeal: (body) =>
    request("/admin/deals", {
      method: "POST",
      headers: ADMIN_HEADERS,
      body: JSON.stringify({
        ...body,
        currency: "USD"
      })
    })
};