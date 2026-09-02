/** Curated editorial imagery (Unsplash). Tight crops, architecture, materials,
 *  motion, creative work — no corporate stock. */
const base = "https://images.unsplash.com/"

function img(id: string, w = 1200, h = 1500) {
  return `${base}${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`
}

export const IMAGES = {
  strategy: img("photo-1546414701-81cc6963c67f", 1200, 1400),
  identity: img("photo-1611241893603-3c359704e0ee", 1200, 1400),
  marketing: img("photo-1572272622046-db9812816992", 1200, 1400),
  digital: img("photo-1633259584604-afdc243122ea", 1200, 1400),

  work1: img("photo-1625390711106-3728815ebcd9", 1400, 1000),
  work2: img("photo-1597773150796-e5c14ebecbf5", 1200, 1500),
  work3: img("photo-1712265858498-4514ea90e20f", 1600, 900),
  work4: img("photo-1565626424178-c699f6601afd", 1000, 1300),
  work5: img("photo-1535957998253-26ae1ef29506", 1000, 1300),
} as const

/** Editorial imagery for the Journal. Architecture, materials, light, texture —
 *  never literal "blog stock". Wider crops for covers, tall crops for rows. */
export const BLOG = {
  logoFirst: img("photo-1618005182384-a83a8bd57fbe", 1600, 1100),
  louderMarket: img("photo-1462331940025-496dfbfc7564", 1000, 1250),
  simplicity: img("photo-1519681393784-d120267933ba", 1000, 1250),
  aiCreativity: img("photo-1620712943543-bcc4688e7485", 1000, 1250),
  sameWebsites: img("photo-1517430816045-df4b7de11d1d", 1000, 1250),
  clearBrand: img("photo-1558655146-9f40138edfeb", 1000, 1250),
  growthTool: img("photo-1503387762-592deb58ef4e", 1000, 1250),
  cover: (id: string) => img(id, 1800, 1100),
} as const
