const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) }
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export const api = {
  listings: (params = {}) => {
    const qs = new URLSearchParams(Object.entries(params).filter(([,v]) => v !== "" && v != null));
    return request(`/listings?${qs}`);
  },
  listing: id => request(`/listings/${id}`),
  inquiry: body => request("/inquiries", { method:"POST", body:JSON.stringify(body) }),
  adminListings: () => request("/admin/listings", { headers: {"x-demo-role":"admin"} }),
  adminInquiries: () => request("/admin/inquiries", { headers: {"x-demo-role":"admin"} }),
  updateInquiry: (id,status) => request(`/admin/inquiries/${id}`, { method:"PATCH", headers: {"x-demo-role":"admin"}, body:JSON.stringify({status}) }),
  adminDeals: () => request("/admin/deals", { headers: {"x-demo-role":"admin"} }),
  createDeal: body => request("/admin/deals", { method:"POST", headers: {"x-demo-role":"admin"}, body:JSON.stringify(body) })
};
