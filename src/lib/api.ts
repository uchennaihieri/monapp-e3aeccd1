export interface AddressData {
  sneeph: string;
  street_no: string;
  street_name: string;
  lga: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
}

const MOCK_ADDRESSES: AddressData[] = [
  { sneeph: "OWR-2401-0087", street_no: "12", street_name: "Orlu Road", lga: "Owerri Municipal", state: "Imo", country: "Nigeria", latitude: 5.4836, longitude: 7.0333 },
  { sneeph: "OWR-2312-0042", street_no: "5", street_name: "Wetheral Road", lga: "Owerri Municipal", state: "Imo", country: "Nigeria", latitude: 5.4850, longitude: 7.0350 },
  { sneeph: "OWR-2402-0110", street_no: "24", street_name: "GRA Phase 2", lga: "Owerri Municipal", state: "Imo", country: "Nigeria", latitude: 5.4900, longitude: 7.0400 },
  { sneeph: "OWR-2403-0055", street_no: "8", street_name: "Douglas Road", lga: "Owerri Municipal", state: "Imo", country: "Nigeria", latitude: 5.4820, longitude: 7.0310 },
  { sneeph: "OWR-2404-0033", street_no: "17", street_name: "Okigwe Road", lga: "Owerri North", state: "Imo", country: "Nigeria", latitude: 5.4950, longitude: 7.0450 },
  { sneeph: "OWR-2405-0021", street_no: "3", street_name: "Tetlow Road", lga: "Owerri Municipal", state: "Imo", country: "Nigeria", latitude: 5.4810, longitude: 7.0290 },
  { sneeph: "OWR-2406-0099", street_no: "31", street_name: "Port Harcourt Road", lga: "Owerri West", state: "Imo", country: "Nigeria", latitude: 5.4780, longitude: 7.0250 },
  { sneeph: "OWR-2407-0076", street_no: "15", street_name: "Royce Road", lga: "Owerri Municipal", state: "Imo", country: "Nigeria", latitude: 5.4870, longitude: 7.0380 },
];

export async function findAddress(query: string): Promise<AddressData | null> {
  await new Promise((r) => setTimeout(r, 600));
  const q = query.toLowerCase().trim();
  return MOCK_ADDRESSES.find(
    (a) =>
      a.sneeph.toLowerCase() === q ||
      `${a.street_no} ${a.street_name}`.toLowerCase().includes(q) ||
      a.street_name.toLowerCase().includes(q)
  ) || null;
}

export async function suggestAddresses(query: string): Promise<AddressData[]> {
  await new Promise((r) => setTimeout(r, 300));
  const q = query.toLowerCase().trim();
  if (!q || q.length < 2) return [];
  return MOCK_ADDRESSES.filter(
    (a) =>
      a.sneeph.toLowerCase().includes(q) ||
      `${a.street_no} ${a.street_name}`.toLowerCase().includes(q) ||
      a.street_name.toLowerCase().includes(q) ||
      a.lga.toLowerCase().includes(q)
  ).slice(0, 5);
}
