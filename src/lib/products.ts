export type GarmentType =
  | "tee"
  | "babytee"
  | "cargo"
  | "hoodie"
  | "visor"
  | "skirt"
  | "bag"
  | "jacket"

export type Tier = "Silver" | "Gold" | "Platinum" | "Diamond"

export type Product = {
  id: number
  sku: string
  name: string
  kind: string
  type: GarmentType
  price: number
  tier: Tier
  /** garment fill */
  color: string
  /** pastel background used by the hero and tiles */
  bg: string
  blurb: string
  mat: string
  fit: string
}

export const SIZES = ["XS", "S", "M", "L", "XL", "2K"] as const

export const PRODUCTS: Product[] = [
  { id: 1, sku: "RB-001", name: "Rainbow.exe", kind: "Baby Tee", type: "babytee", price: 1499, tier: "Silver", color: "#F26B5B", bg: "#F6BBC1",
    blurb: "Cropped, ringer-necked, printed on pre-millennium cotton. Fits like a pop-up: small and impossible to ignore.", mat: "100% deadstock cotton", fit: "Cropped / slim" },
  { id: 2, sku: "RB-002", name: "Floor Plan", kind: "Cargo Pants", type: "cargo", price: 3299, tier: "Gold", color: "#5E9E4A", bg: "#BFE3B2",
    blurb: "2BHK of pockets. One of them fits a flip phone. Carpet area: your whole personality.", mat: "Ripstop nylon", fit: "Relaxed / low-rise" },
  { id: 3, sku: "RB-003", name: "Highpoint", kind: "Zip Hoodie", type: "hoodie", price: 3999, tier: "Platinum", color: "#6E66D6", bg: "#B9B7EE",
    blurb: "Hood big enough to live in. Advanced MIVAN construction (we googled it).", mat: "480 gsm loopback", fit: "Oversized" },
  { id: 4, sku: "RB-004", name: "Skyline", kind: "Chrome Visor", type: "visor", price: 999, tier: "Silver", color: "#4FA3E0", bg: "#B5DAF2",
    blurb: "Mirror lens. See the city. Let the city see you back.", mat: "Mirror PC lens", fit: "One size" },
  { id: 5, sku: "RB-005", name: "Seven Stripes", kind: "Pleated Mini", type: "skirt", price: 1999, tier: "Gold", color: "#E7B93A", bg: "#F3E3A5",
    blurb: "Pleated like a brochure spread. Every stripe hand-matched to the rainbow.", mat: "Poly twill", fit: "Mid-rise" },
  { id: 6, sku: "RB-006", name: "Moon Phase", kind: "Puffer Jacket", type: "jacket", price: 5499, tier: "Diamond", color: "#9B6FC4", bg: "#CDB4E6",
    blurb: "Quilted in seven horizontal storeys. Weatherproof, apocalypse-resistant.", mat: "Recycled down / nylon", fit: "Boxy" },
  { id: 7, sku: "RB-007", name: "Artistic Impression", kind: "Baguette Bag", type: "bag", price: 2499, tier: "Platinum", color: "#F08A4B", bg: "#F7C3A8",
    blurb: "Holds a flip phone, a lip gloss and a burned CD. Shown for representation purposes only.", mat: "Vegan leather", fit: "Shoulder" },
  { id: 8, sku: "RB-008", name: "Rise Naturally", kind: "Ringer Tee", type: "tee", price: 1299, tier: "Silver", color: "#2FA872", bg: "#B8E6CF",
    blurb: "Giant type across the chest. Readable from the 37th floor.", mat: "100% organic cotton", fit: "Regular" },
]

export const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n)
