export type BikeSpec = { label: string; value: string };

export type PerformanceStat = {
  label: string;
  value: string;
  unit: string;
  pct: number;
  isDecimal?: boolean;
};

export type FAQ = { q: string; a: string };

export type CinematicDetail = {
  image: string;
  title: string;
  subtitle: string;
  spec: string;
};

export type ComparisonRow = { label: string; value: string; pct: number };

export type BikeVariant = {
  id: string;
  label: string;
  colorHex: string;
  heroImage: string;
  galleryImages: string[];
  galleryLabels?: string[];
  accentHex?: string;
  glowColor?: string;
  titleGradient?: string;
  price?: number;
  available?: boolean;
  shopifyCartUrl?: string;
};

export type BikePageData = {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: number;
  tag: string;
  badge: string;
  featured?: boolean;
  isPreOrder?: boolean;
  deliveryEta?: string;
  preOrderDeposit?: number;
  currencyLabel?: string;
  // Color system — all components derive from these
  tagColor: string;
  titleGradient: string;
  barColor: string;       // solid Tailwind bg class (used in product-page stat bars)
  barGradient: string;    // gradient Tailwind bg classes (used in comparison bars)
  accentFrom: string;
  glowColor: string;
  accentHex: string;
  // Hero + gallery
  heroImage: string;
  galleryImages: string[];
  galleryLabels?: string[];
  heroStats: { label: string; value: string }[];
  performanceCallout: { value: string; unit: string; label: string };
  performanceStats: PerformanceStat[];
  specGroups: { title: string; specs: BikeSpec[] }[];
  features: { title: string; body: string; icon: React.ReactNode }[];
  financing: { months: number; apr: string; monthly: number; down: number };
  faqs: FAQ[];
  // Colour variants (omit for single-version products — hides selector automatically)
  variants?: BikeVariant[];
  defaultVariant?: string;
  // Optional edition label shown when no colour variants are available
  edition?: string;
  // When set, the "View Specs" / "Learn More" CTA smoothly scrolls to this element id
  scrollToSpecsId?: string;
  // Shopify Storefront — set to your product handle (the slug in Shopify admin)
  // e.g. "sur-ron-light-bee". Buy Now / Pre-Order Now will redirect to Shopify checkout.
  // Leave undefined to fall back to /#contact (site works without Shopify configured).
  shopifyHandle?: string;
  // Optional direct cart URL — overrides the product page redirect when set.
  // Format: https://{store}.myshopify.com/cart/{variantId}:1
  // Use this when you have a specific variant ID and want to skip the product page.
  shopifyCartUrl?: string;
  // Optional premium cinematic visual sections
  cinematic?: {
    actionBanner: string;
    actionImmersive: string;
    specsVisual: string;
    detail: {
      primary: CinematicDetail;
      secondary: CinematicDetail;
    };
  };
};

// ─── Shared SVG icons ─────────────────────────────────────────────────────────

const BoltIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);
const ShieldIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const ChipIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H7a2 2 0 00-2 2v2M9 3h6M9 3v0M15 3h2a2 2 0 012 2v2M15 3v0M3 9h2M3 9v6M3 15h2M19 9h2M19 15h2M9 21H7a2 2 0 01-2-2v-2M9 21h6M15 21h2a2 2 0 002-2v-2M9 21v0M15 21v0M9 9h6v6H9z" />
  </svg>
);
const DisplayIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const WifiIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
  </svg>
);
const RefreshIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);
const AdjustIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);
const FlashIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
  </svg>
);

// ─── STRIKE SHADOW — Black / Crimson Red ─────────────────────────────────────
export const strikeShadow: BikePageData = {
  name: "Strike Shadow",
  slug: "strike-shadow",
  shopifyHandle: "strike-shadow",
  shopifyCartUrl: "https://voltisemotos.myshopify.com/cart/43743029395522:1",
  tagline: "Stealth mode. Maximum impact.",
  description:
    "Designed for high-performance off-road riding. The Strike Shadow pairs 7kW of peak power with a reinforced steel frame, Fast Ace suspension, and Samsung lithium-ion efficiency — built for riders who refuse to be held back.",
  price: 3800,
  currencyLabel: "AUD",
  tag: "Urban",
  badge: "Fast Ace Suspension · G518 Display",
  featured: true,
  tagColor: "border-red-600/40 text-red-400 bg-red-600/10",
  titleGradient: "from-red-400 via-rose-300 to-red-200",
  barColor: "bg-red-600",
  barGradient: "bg-gradient-to-r from-red-700 to-red-500",
  accentFrom: "from-red-700/25",
  glowColor: "rgba(220, 38, 38, 0.22)",
  accentHex: "#dc2626",
  heroImage: "/strike-shadow/strike-shadow.png",
  galleryImages: [
    "/strike-shadow/strike-shadow.png",
    "/strike-shadow/side.png",
    "/strike-shadow/front.png",
    "/strike-shadow/frame.jpg",
    "/strike-shadow/suspension.jpg",
    "/strike-shadow/wheels.jpg",
  ],
  galleryLabels: ["Studio", "Side Profile", "Front View", "Frame Detail", "Suspension", "Brakes & Wheels"],
  cinematic: {
    actionBanner: "/strike-shadow/action-1.jpg",
    actionImmersive: "/strike-shadow/action-2.jpg",
    specsVisual: "/strike-shadow/strike-shadow.png",
    detail: {
      primary: {
        image: "/strike-shadow/suspension.jpg",
        title: "Fast Ace Suspension",
        subtitle: "Premium Front & Rear",
        spec: "Hydraulic",
      },
      secondary: {
        image: "/strike-shadow/wheels.jpg",
        title: "420 Chain Drive",
        subtitle: "Heavy Duty Drivetrain",
        spec: "60T Sprocket",
      },
    },
  },
  heroStats: [
    { label: "Top Speed", value: "80–85 km/h" },
    { label: "Range", value: "48–64 km" },
    { label: "Peak Power", value: "7 kW" },
  ],
  performanceCallout: { value: "85", unit: "km/h", label: "Top Speed · Sport Mode" },
  performanceStats: [
    { label: "Top Speed", value: "85", unit: "km/h", pct: 85 },
    { label: "Range", value: "64", unit: "km", pct: 64 },
    { label: "Motor Power", value: "7", unit: "kW", pct: 55 },
    { label: "Max Rider Weight", value: "127", unit: "kg", pct: 80 },
  ],
  specGroups: [
    {
      title: "Electrical",
      specs: [
        { label: "Peak Power", value: "7 kW" },
        { label: "Battery", value: "Samsung 72V 25Ah Lithium-Ion" },
        { label: "Controller", value: "72V / 100A" },
        { label: "Drive Chain", value: "420 Heavy-Duty Chain" },
        { label: "Rear Sprocket", value: "60T" },
        { label: "Ride Modes", value: "Eco / Sport" },
        { label: "Display", value: "G518 Digital Dashboard" },
        { label: "Charger", value: "UL-Certified 72V 6A Smart Fast Charger" },
      ],
    },
    {
      title: "Mechanical",
      specs: [
        { label: "Frame", value: "Reinforced Steel Main Frame" },
        { label: "Swingarm", value: "Aluminum Swingarm" },
        { label: "Front Suspension", value: "Fast Ace Premium Fork" },
        { label: "Rear Suspension", value: "Fast Ace Heavy-Duty Shock" },
        { label: "Front Tire", value: "70/100-17 Knobby Moto" },
        { label: "Rear Tire", value: "90/100-14 Knobby Moto" },
        { label: "Brakes", value: "Hydraulic Disc (F & R)" },
        { label: "Weight", value: "64–67 kg" },
        { label: "Seat Height", value: "813 mm" },
        { label: "Ground Clearance", value: "279 mm" },
        { label: "Handlebar Width", value: "72 cm" },
        { label: "Max Rider Weight", value: "127 kg" },
      ],
    },
  ],
  features: [
    { title: "7 kW Peak Power", body: "7kW of instant torque delivered through a 420 heavy-duty chain with 60T rear sprocket. Smooth in Eco, relentless in Sport. Samsung 72V lithium-ion efficiency behind every hit.", icon: <BoltIcon /> },
    { title: "Fast Ace Suspension", body: "Fast Ace premium fork up front, Fast Ace heavy-duty shock at the rear. Engineered for off-road punishment — planted through corners, composed over anything rough.", icon: <AdjustIcon /> },
    { title: "Reinforced Steel Frame", body: "Reinforced steel main frame with aluminium swingarm. Built for the repetitive stress of off-road riding — rigid where it counts, compliant where it matters.", icon: <ShieldIcon /> },
    { title: "G518 Digital Dashboard", body: "G518 digital dashboard puts speed, battery level, and ride mode front and centre. UL-certified 72V 6A smart fast charger included — ready to go again fast.", icon: <DisplayIcon /> },
  ],
  financing: { months: 48, apr: "5.4%", monthly: 228, down: 1000 },
  faqs: [
    { q: "What ride modes does the Strike Shadow have?", a: "The Strike Shadow offers two ride modes: Eco for smooth, efficient riding with maximum range, and Sport for full 7kW power delivery and peak off-road performance." },
    { q: "What is the maximum rider weight?", a: "The Strike Shadow's reinforced steel main frame supports a maximum rider weight of 127 kg, making it suitable for a wide range of riders." },
    { q: "What suspension does the Strike Shadow use?", a: "Fast Ace premium fork up front and a Fast Ace heavy-duty shock at the rear — purpose-built for off-road conditions. Delivers a controlled, planted ride on technical terrain." },
    { q: "What tyres does the Strike Shadow run?", a: "70/100-17 knobby moto tyres up front and 90/100-14 at the rear — both purpose-built for off-road grip and control on loose, mixed, and hard-packed surfaces." },
    { q: "What warranty does the Strike Shadow carry?", a: "2-year powertrain (motor, battery, controller), 2-year structural frame warranty, and 1-year on components. Extended coverage plans available at checkout." },
  ],
  // Single version — no colour selector rendered
  edition: "Original Edition",
};

// ─── FALCON — Purple / Violet ─────────────────────────────────────────────────
export const falcon: BikePageData = {
  name: "Falcon Pro",
  slug: "falcon",
  shopifyHandle: "falcon-pro", // ← update to match your Shopify product handle
  tagline: "Born to dominate the trail.",
  description:
    "10kW peak power. 410 N·m of wheel torque. Liquid-cooled LPMSM motor in a 59 kg triple-beam aluminium chassis. The 79BIKE Falcon Pro is built for riders who want serious performance without the weight penalty.",
  price: 5600,
  currencyLabel: "AUD",
  tag: "Trail",
  badge: "10 kW Liquid-Cooled · 410 N·m",
  tagColor: "border-purple-500/40 text-purple-400 bg-purple-500/10",
  titleGradient: "from-purple-400 via-violet-400 to-purple-300",
  barColor: "bg-purple-500",
  barGradient: "bg-gradient-to-r from-purple-500 to-violet-400",
  accentFrom: "from-purple-600/25",
  glowColor: "rgba(147, 51, 234, 0.22)",
  accentHex: "#a855f7",
  heroImage: "/falcon/falcon.png",
  galleryImages: [
    "/falcon/falcon.png",
    "/falcon/side.png",
    "/falcon/front.png",
    "/falcon/frame.jpg",
    "/falcon/suspension.jpg",
    "/falcon/wheels.jpg",
  ],
  galleryLabels: ["Studio", "Side Profile", "Front View", "Frame Detail", "Suspension", "Brakes & Wheels"],
  cinematic: {
    actionBanner: "/falcon/action-1.jpg",
    actionImmersive: "/falcon/action-2.jpg",
    specsVisual: "/falcon/falcon.png",
    detail: {
      primary: {
        image: "/falcon/suspension.jpg",
        title: "Fast Ace 2.0 Inverted Forks",
        subtitle: "200mm Front Travel",
        spec: "200mm F / 85mm R",
      },
      secondary: {
        image: "/falcon/wheels.jpg",
        title: "4-Piston Hydraulic Disc",
        subtitle: "Front & Rear Braking",
        spec: 'Dual 19" Wheels',
      },
    },
  },
  heroStats: [
    { label: "Top Speed", value: "90 km/h" },
    { label: "Eco Range", value: "120 km" },
    { label: "Peak Power", value: "10 kW" },
  ],
  performanceCallout: { value: "410", unit: "N·m", label: "Wheel Torque · Peak Output" },
  performanceStats: [
    { label: "Top Speed", value: "90", unit: "km/h", pct: 100 },
    { label: "Eco Range", value: "120", unit: "km", pct: 100 },
    { label: "Peak Power", value: "10", unit: "kW", pct: 100 },
    { label: "Weight", value: "59", unit: "kg", pct: 75 },
  ],
  specGroups: [
    {
      title: "Electrical",
      specs: [
        { label: "Motor", value: "Liquid-Cooled LPMSM (5 kW rated / 10 kW peak)" },
        { label: "Wheel Torque", value: "410 N·m" },
        { label: "Battery", value: "72V 35Ah LG Lithium-Ion" },
        { label: "Charge Time", value: "~3.5 hrs (0 → 100%)" },
        { label: "Throttle", value: "Electronic Twist Throttle" },
        { label: "Regen Braking", value: "Integrated" },
        { label: "Ride Modes", value: "Multiple Selectable Modes + Neutral (N) Parking" },
        { label: "Display", value: "HD Multifunction Digital Dashboard" },
        { label: "Ignition", value: "Keyless NFC + Standard Key Fob" },
        { label: "Sensors", value: "Automatic Day/Night" },
      ],
    },
    {
      title: "Mechanical",
      specs: [
        { label: "Frame", value: "Triple-Beam 6061 Forged Aluminium Alloy" },
        { label: "Front Suspension", value: "Fast Ace 2.0 Inverted Forks — 200mm travel" },
        { label: "Rear Suspension", value: "Fast Ace Adjustable Linkage Shock — 85mm travel" },
        { label: "Wheels", value: '19" (70/100-19) Front & Rear — Heavy-Duty Spoked' },
        { label: "Tires", value: "All-Terrain Knobby Off-Road" },
        { label: "Brakes", value: "4-Piston Hydraulic Disc (F & R)" },
        { label: "Weight", value: "59 kg" },
        { label: "Seat Height", value: "830 mm" },
        { label: "Ground Clearance", value: "275 mm" },
        { label: "Max Rider Weight", value: "136 kg" },
      ],
    },
  ],
  features: [
    { title: "10 kW · 410 N·m", body: "Liquid-cooled LPMSM delivers 10 kW peak and 410 N·m of wheel torque from a 59 kg chassis. More power-to-weight than bikes twice its price.", icon: <BoltIcon /> },
    { title: "Liquid-Cooled Motor", body: "The LPMSM runs cooler under sustained load — maintaining peak output on long climbs and repeated hard acceleration where air-cooled motors begin to derate.", icon: <ShieldIcon /> },
    { title: "Fast Ace 2.0 Suspension", body: "Fast Ace 2.0 inverted forks provide 200mm of front travel. Adjustable Fast Ace linkage rear shock adds 85mm of tunable rear travel — set for any terrain.", icon: <AdjustIcon /> },
    { title: "NFC + HD Dashboard", body: "Tap-to-unlock NFC ignition backed by a standard key fob. HD multifunction dashboard with automatic day/night sensors keeps critical info visible in all conditions.", icon: <DisplayIcon /> },
  ],
  financing: { months: 36, apr: "6.9%", monthly: 154, down: 500 },
  faqs: [
    { q: "What makes the 79BIKE Falcon Pro stand out?", a: "10kW peak power and 410 N·m of wheel torque from a liquid-cooled LPMSM — all in a 59 kg triple-beam 6061 aluminium frame. Fast Ace 2.0 inverted forks with 200mm of travel, 4-piston hydraulic disc brakes, NFC keyless ignition, and an HD dashboard with automatic day/night sensors." },
    { q: "What is a liquid-cooled motor?", a: "The LPMSM (Liquid-Cooled Permanent Magnet Synchronous Motor) uses coolant to manage heat rather than relying on airflow. This allows the motor to sustain peak output for longer — critical on extended climbs or repeated hard accelerations where air-cooled motors derate." },
    { q: "How long does a full charge take?", a: "Approximately 3.5 hours from empty to full with the standard charger. The 72V 35Ah LG cell pack charges consistently without significant thermal throttling." },
    { q: "What terrain is the Falcon Pro built for?", a: "The Falcon Pro is designed for trail riding, hard-packed dirt, gravel, and technical single-track. Dual 19\" all-terrain knobby tires, 200mm Fast Ace front travel, and 4-piston discs handle everything from fire roads to rooted enduro sections." },
    { q: "What does the NFC ignition do?", a: "NFC ignition lets you tap a card or NFC-enabled device to unlock the bike — no key required for everyday use. A standard key fob is also included as a backup, and the system prevents ride-away without authorisation." },
  ],
  defaultVariant: "silver",
  variants: [
    {
      id: "silver",
      label: "Silver",
      colorHex: "#9ca3af",
      heroImage: "/falcon/falcon.png",
      galleryImages: [
        "/falcon/falcon.png",
        "/falcon/side.png",
        "/falcon/front.png",
        "/falcon/frame.jpg",
        "/falcon/suspension.jpg",
        "/falcon/wheels.jpg",
      ],
      available: true,
      shopifyCartUrl: "https://voltisemotos.myshopify.com/cart/43789995180098:1",
    },
    {
      id: "black",
      label: "Black",
      colorHex: "#1a1a1a",
      accentHex: "#7c3aed",
      glowColor: "rgba(109, 40, 217, 0.14)",
      heroImage: "/falcon/blackfalcon.png",
      galleryImages: [
        "/falcon/blackfalcon.png",
        "/falcon/blackside.png",
        "/falcon/blackfront.png",
        "/falcon/blackframe.jpg",
        "/falcon/blacksuspension.jpg",
        "/falcon/blackwheels.jpg",
      ],
      available: true,
      shopifyCartUrl: "https://voltisemotos.myshopify.com/cart/43789995212866:1",
    },
  ],
};

// ─── ARCTIC LEOPARD — Black / Crimson ────────────────────────────────────────
export const arcticLeopard: BikePageData = {
  name: "Arctic Leopard",
  slug: "arctic-leopard",
  shopifyHandle: "arctic-leopard",
  shopifyCartUrl: "https://voltisemotos.myshopify.com/cart/36218730676290:1",
  tagline: "Relentless in any condition.",
  description:
    "20kW peak power. 500–600 Nm of direct-drive torque. Up to 160 km in Eco. The Arctic Leopard XE Pro S is engineered for riders who demand the absolute maximum — on any terrain, in any condition.",
  price: 7199,
  currencyLabel: "AUD",
  tag: "Enduro",
  badge: "20 kW Direct Drive · Gold KKE Forks",
  tagColor: "border-red-700/40 text-red-400 bg-red-900/15",
  titleGradient: "from-white via-red-300 to-red-600",
  barColor: "bg-red-600",
  barGradient: "bg-gradient-to-r from-red-700 to-red-500",
  accentFrom: "from-red-700/20",
  glowColor: "rgba(220, 38, 38, 0.22)",
  accentHex: "#dc2626",
  heroImage: "/arctic-leopard/arctic.png",
  galleryImages: [
    "/arctic-leopard/arctic.png",
    "/arctic-leopard/side.png",
    "/arctic-leopard/front.png",
    "/arctic-leopard/frame.jpg",
    "/arctic-leopard/suspension.jpg",
    "/arctic-leopard/wheels.jpg",
  ],
  galleryLabels: ["Studio", "Side Profile", "Front View", "Frame Detail", "Suspension", "Brakes & Wheels"],
  cinematic: {
    actionBanner: "/arctic-leopard/action-1.jpg",
    actionImmersive: "/arctic-leopard/action-2.jpg",
    specsVisual: "/arctic-leopard/arctic.png",
    detail: {
      primary: {
        image: "/arctic-leopard/suspension.jpg",
        title: "Gold KKE 37mm Forks",
        subtitle: "215mm Travel · Full Adjustable",
        spec: "215mm F / 200mm R",
      },
      secondary: {
        image: "/arctic-leopard/wheels.jpg",
        title: "220mm Disc · 4-Piston",
        subtitle: "Hydraulic Braking",
        spec: "F & R 220mm",
      },
    },
  },
  heroStats: [
    { label: "Top Speed", value: "101 km/h" },
    { label: "Eco Range", value: "160 km" },
    { label: "Peak Power", value: "20 kW" },
  ],
  performanceCallout: { value: "101", unit: "km/h", label: "Top Speed · Sport Mode" },
  performanceStats: [
    { label: "Top Speed", value: "101", unit: "km/h", pct: 100 },
    { label: "Eco Range", value: "160", unit: "km", pct: 100 },
    { label: "Peak Power", value: "20", unit: "kW", pct: 100 },
    { label: "Trail Range", value: "80", unit: "km", pct: 80 },
  ],
  specGroups: [
    {
      title: "Electrical",
      specs: [
        { label: "Motor", value: "20,000W PMSM" },
        { label: "Peak Torque", value: "500–600 N·m" },
        { label: "Battery", value: "72V 55Ah / 3,960 Wh Lithium-Ion" },
        { label: "Drive Chain", value: "428 Heavy-Duty Chain" },
        { label: "Ride Modes", value: "Eco / Normal / Sport" },
        { label: "Display", value: "High-Resolution TFT Dashboard" },
        { label: "Keyless Start", value: "NFC Card" },
        { label: "Controller", value: "Far Driver (Bluetooth-Tunable)" },
        { label: "Regen Braking", value: "Adjustable" },
        { label: "Lighting", value: "Full LED System" },
      ],
    },
    {
      title: "Mechanical",
      specs: [
        { label: "Frame", value: "6061 Forged Aluminium Alloy" },
        { label: "Swingarm", value: "Extended High-Stability" },
        { label: "Front Suspension", value: "Gold KKE 37mm Inverted Forks — 215mm travel" },
        { label: "Rear Suspension", value: "KKE Adjustable Linkage Shock — 200mm travel" },
        { label: "Wheels", value: '21" (80/100-21) Front / 18" (100/90-18) Rear' },
        { label: "Brakes", value: "220mm Hydraulic Disc — 4-Piston Calipers (F & R)" },
        { label: "Seat Height", value: "870 mm" },
        { label: "Weight", value: "72–75 kg" },
      ],
    },
  ],
  features: [
    { title: "20 kW Peak Power", body: "500–600 N·m of peak torque channelled through a 428 heavy-duty chain. Massive, immediate pull off the line — engineered for trail enduro and hard-pack alike.", icon: <BoltIcon /> },
    { title: "Gold KKE Suspension", body: "37mm inverted gold KKE forks deliver 215mm of front travel with independent compression, rebound, and preload adjustment. KKE linkage rear shock adds 200mm of tunable travel.", icon: <AdjustIcon /> },
    { title: "TFT · NFC · Far Driver", body: "Full-colour TFT display paired with NFC card keyless start. The Far Driver controller is Bluetooth-tunable — adjust power curves, regen braking strength, and ride modes from your phone.", icon: <DisplayIcon /> },
    { title: "160 km Eco Range", body: "72V 55Ah / 3,960 Wh lithium-ion battery delivers up to 160 km in Eco mode and 64–80 km of aggressive trail riding. Three modes let you balance power and endurance on the fly.", icon: <ChipIcon /> },
  ],
  financing: { months: 48, apr: "5.9%", monthly: 174, down: 750 },
  faqs: [
    { q: "What makes the Arctic Leopard XE Pro S stand out?", a: "20kW peak power, 500–600 N·m torque, 101 km/h top speed, and up to 160 km in Eco mode. Gold KKE 37mm inverted forks with 215mm travel, 220mm 4-piston hydraulic discs, TFT display, NFC keyless start, and a Bluetooth-tunable Far Driver controller — full enduro capability at a trail price." },
    { q: "What is the Far Driver controller?", a: "Far Driver is a high-performance motor controller with Bluetooth connectivity. Using a companion app, you can adjust power delivery curves, regen braking intensity, and ride mode thresholds — customised tuning without touching a laptop." },
    { q: "What does the TFT NFC system do?", a: "The full-colour TFT dashboard displays speed, battery state, ride mode, and trip data in real time. NFC card start means no key — tap your card to unlock and go. Ride profiles are stored per card." },
    { q: "How does the KKE suspension adjust?", a: "The 37mm inverted gold KKE front forks offer independent compression, rebound, and preload adjustment across 215mm of travel. The KKE linkage rear shock provides the same three-way tuning over 200mm — set it soft for loose enduro terrain or firm for hard-pack." },
    { q: "What's the difference between Eco, Normal, and Sport modes?", a: "Eco caps power output for maximum range — ideal for long trail days where you need every kilometre. Normal delivers balanced everyday performance. Sport unleashes the full 20kW and peak torque response for aggressive, technical riding." },
  ],
};

// ─── ULTRA BEE — Orange / Gold ────────────────────────────────────────────────
export const ultraBee: BikePageData = {
  name: "26 Sur-Ron Ultra Bee",
  slug: "ultra-bee",
  shopifyHandle: "sur-ron-ultra-bee", // ← update to match your Shopify product handle
  tagline: "Maximum force. Zero restraint.",
  description:
    "The 26 Sur-Ron Ultra Bee was built for one purpose: to dominate. 21kW peak power, 511 N·m of torque, SRTC traction control, and 115km of range — the most capable machine LBX has ever made.",
  price: 8499,
  currencyLabel: "AUD",
  tag: "Pro",
  badge: "21 kW Peak · SRTC + BERS",
  tagColor: "border-orange-500/40 text-orange-400 bg-orange-500/10",
  titleGradient: "from-orange-400 via-amber-300 to-yellow-200",
  barColor: "bg-orange-500",
  barGradient: "bg-gradient-to-r from-orange-500 to-amber-400",
  accentFrom: "from-orange-600/25",
  glowColor: "rgba(249, 115, 22, 0.25)",
  accentHex: "#f97316",
  heroImage: "/ultrabee/ultrabee.png",
  galleryImages: [
    "/ultrabee/ultrabee.png",
    "/ultrabee/front-view.png",
    "/ultrabee/frame.jpg",
    "/ultrabee/suspension.jpg",
    "/ultrabee/wheels.jpg",
  ],
  galleryLabels: ["Studio", "Front View", "Frame Detail", "Suspension", "Brakes & Wheels"],
  cinematic: {
    actionBanner: "/ultrabee/action-1.jpg",
    actionImmersive: "/ultrabee/action-2.jpg",
    specsVisual: "/ultrabee/ultrabee.png",
    detail: {
      primary: {
        image: "/ultrabee/suspension.jpg",
        title: "240mm USD Fork",
        subtitle: "Full Travel Suspension",
        spec: "240mm F & R",
      },
      secondary: {
        image: "/ultrabee/wheels.jpg",
        title: "19-Inch Wheels",
        subtitle: "Performance Rubber",
        spec: '19" F & R',
      },
    },
  },
  heroStats: [
    { label: "Top Speed", value: "95 km/h" },
    { label: "Range", value: "115 km" },
    { label: "Peak Power", value: "21 kW" },
  ],
  performanceCallout: { value: "511", unit: "N·m", label: "Wheel Torque · Turbo Mode" },
  performanceStats: [
    { label: "Top Speed", value: "95", unit: "km/h", pct: 100 },
    { label: "Range", value: "115", unit: "km", pct: 100 },
    { label: "Peak Power", value: "21", unit: "kW", pct: 100 },
    { label: "Charge Time", value: "2.5", unit: "hrs", pct: 90, isDecimal: true },
  ],
  specGroups: [
    {
      title: "Electrical",
      specs: [
        { label: "Motor", value: "18 kW PMSM" },
        { label: "Peak Power", value: "21 kW (Turbo Mode)" },
        { label: "Max Wheel Torque", value: "511 N·m" },
        { label: "Battery", value: "74V 60Ah Lithium-Ion (Removable)" },
        { label: "Charge Time", value: "~2.5 hrs (20% → 80%)" },
        { label: "Ride Modes", value: "Eco / Daily / Sport / Crawl / Turbo" },
        { label: "Traction Control", value: "SRTC Active" },
        { label: "Regen Braking", value: "BERS Active" },
      ],
    },
    {
      title: "Mechanical",
      specs: [
        { label: "Frame", value: "Forged Aluminum Alloy" },
        { label: "Suspension", value: "USD Fork + Monoshock, 240mm F & R" },
        { label: "Brakes", value: "Hydraulic Disc (F & R)" },
        { label: "Wheels", value: '19" Front / 19" Rear' },
        { label: "0 – 50 km/h", value: "Under 2.0 sec" },
        { label: "Weight", value: "88.5 kg" },
        { label: "Seat Height", value: "910 mm" },
        { label: "Wheelbase", value: "1,380 mm" },
        { label: "Ground Clearance", value: "315 mm" },
      ],
    },
  ],
  features: [
    { title: "21 kW · 511 N·m", body: "18 kW PMSM with 21 kW peak in Turbo Mode. 511 N·m of wheel torque and 0–50 km/h in under 2 seconds — the most powerful SurRon ever made.", icon: <BoltIcon /> },
    { title: "240mm Full Travel", body: "USD fork and rear monoshock with 240mm of suspension travel front and rear. Absorbs everything the terrain throws at it.", icon: <AdjustIcon /> },
    { title: "SRTC + BERS", body: "SurRon Traction Control monitors wheel slip in real time. BERS harvests braking energy back into the battery — every stop extends your range.", icon: <ShieldIcon /> },
    { title: "115 km Range", body: "74V 60Ah removable lithium-ion battery delivers up to 115 km per charge. Five ride modes — Eco, Daily, Sport, Crawl, Turbo — optimize every kilometre.", icon: <ChipIcon /> },
  ],
  financing: { months: 60, apr: "4.9%", monthly: 244, down: 1500 },
  faqs: [
    { q: "What separates the 26 Sur-Ron Ultra Bee from other electric bikes?", a: "18 kW continuous / 21 kW peak power, 511 N·m wheel torque, 0–50 km/h in under 2 seconds, SRTC traction control, BERS regenerative braking, and a removable 74V 60Ah battery — in a race-proven alloy chassis." },
    { q: "Is the 26 Sur-Ron Ultra Bee competition-legal?", a: "Yes — homologated for closed-course competition in most sanctioned electric off-road racing series. Contact us for your specific series requirements." },
    { q: "What are the five ride modes?", a: "Eco maximises range with gentle power delivery. Daily balances performance and efficiency. Sport unleashes the full 18 kW. Crawl provides precise low-speed control for technical terrain. Turbo unlocks 21 kW peak power for maximum performance." },
    { q: "What is BERS?", a: "Braking Energy Regeneration System. BERS captures kinetic energy during deceleration and feeds it back into the battery — extending real-world range and reducing brake wear over time." },
    { q: "Is the battery removable?", a: "Yes — the 74V 60Ah lithium-ion pack is fully removable and swappable. Charge it in the bike or remove it entirely to charge indoors, swap for a fresh pack, or transport safely." },
  ],
  defaultVariant: "volt-orange",
  variants: [
    {
      id: "volt-orange",
      label: "Volt Orange",
      colorHex: "#c2510c",
      heroImage: "/ultrabee/ultrabee.png",
      galleryImages: [
        "/ultrabee/ultrabee.png",
        "/ultrabee/side.png",
        "/ultrabee/front-view.png",
        "/ultrabee/frame.jpg",
        "/ultrabee/suspension.jpg",
        "/ultrabee/wheels.jpg",
      ],
      available: true,
      shopifyCartUrl: "https://voltisemotos.myshopify.com/cart/43789988823106:1",
    },
    {
      id: "desert-brown",
      label: "Desert Brown",
      colorHex: "#7c5c35",
      accentHex: "#c4a265",
      glowColor: "rgba(180, 140, 80, 0.18)",
      titleGradient: "from-white via-amber-200 to-amber-400",
      heroImage: "/ultrabee/brownultrabee.png",
      galleryImages: [
        "/ultrabee/brownultrabee.png",
        "/ultrabee/brownside.png",
        "/ultrabee/brownfront.png",
        "/ultrabee/brownframe.jpg",
        "/ultrabee/brownsuspension.jpg",
        "/ultrabee/brownwheels.jpg",
      ],
      available: true,
      shopifyCartUrl: "https://voltisemotos.myshopify.com/cart/43789988855874:1",
    },
  ],
};

// ─── SURRON LIGHT BEE — Stealth / Pre-Order ──────────────────────────────────
export const lbxBike: BikePageData = {
  name: "26 Sur-Ron Light Bee",
  slug: "lbx",
  shopifyHandle: "sur-ron-light-bee",
  shopifyCartUrl: "https://voltisemotos.myshopify.com/cart/43789977190466:1",
  tagline: "Urban stealth. Redefined.",
  description:
    "6kW peak power. 250 N·m of torque. 57 kg of aerospace aluminium. The 26 Sur-Ron Light Bee is built for the rider who moves differently — through traffic, over curbs, into whatever the city throws at you.",
  price: 5999,
  currencyLabel: "AUD",
  tag: "Pre-Order",
  badge: "Limited Allocation · Q3 2026",
  featured: true,
  isPreOrder: true,
  deliveryEta: "Q3 2026",
  scrollToSpecsId: "specs",
  tagColor: "border-white/[0.1] text-white/50 bg-white/[0.04]",
  titleGradient: "from-white via-gray-100 to-gray-400",
  barColor: "bg-slate-500",
  barGradient: "bg-gradient-to-r from-slate-600 to-slate-400",
  accentFrom: "from-white/5",
  glowColor: "rgba(168, 178, 192, 0.05)",
  accentHex: "#b8c4ce",
  heroImage: "/lbx/lbx.png",
  galleryImages: [
    "/lbx/lbx.png",
    "/lbx/side.png",
    "/lbx/front.png",
    "/lbx/frame.jpg",
    "/lbx/suspension.jpg",
    "/lbx/wheels.jpg",
  ],
  galleryLabels: ["Studio", "Side Profile", "Front View", "Frame Detail", "Suspension", "Brakes & Wheels"],
  cinematic: {
    actionBanner: "/lbx/action-1.jpg",
    actionImmersive: "/lbx/action-2.jpg",
    specsVisual: "/lbx/lbx.png",
    detail: {
      primary: {
        image: "/lbx/frame.jpg",
        title: "Aerospace Frame",
        subtitle: "Lightweight Alloy Build",
        spec: "57 kg",
      },
      secondary: {
        image: "/lbx/wheels.jpg",
        title: "Hydraulic Disc Brakes",
        subtitle: "Front & Rear Precision",
        spec: "F & R Disc",
      },
    },
  },
  heroStats: [
    { label: "Top Speed", value: "75 km/h" },
    { label: "Range", value: "75 km" },
    { label: "Dry Weight", value: "57 kg" },
  ],
  performanceCallout: { value: "250", unit: "N·m", label: "Wheel Torque · Sport Mode" },
  performanceStats: [
    { label: "Top Speed", value: "75", unit: "km/h", pct: 75 },
    { label: "Range", value: "75", unit: "km", pct: 75 },
    { label: "Motor Power", value: "6", unit: "kW", pct: 48 },
    { label: "Charge Time", value: "3.5", unit: "hrs", pct: 80, isDecimal: true },
  ],
  specGroups: [
    {
      title: "Electrical",
      specs: [
        { label: "Motor", value: "PMSM Mid Motor" },
        { label: "Peak Power", value: "6 kW" },
        { label: "Max Torque", value: "250 N·m" },
        { label: "Battery", value: "60V 40Ah Lithium (Removable)" },
        { label: "Charge Time", value: "2.5–3.5 hrs" },
        { label: "Ride Modes", value: "Eco / Sport" },
        { label: "Drive System", value: "Belt + Chain Drive" },
      ],
    },
    {
      title: "Mechanical",
      specs: [
        { label: "Front Suspension", value: "USD Hydraulic Forks" },
        { label: "Rear Suspension", value: "Linkage Mono Shock" },
        { label: "Front Brake", value: "Hydraulic Disc" },
        { label: "Rear Brake", value: "Hydraulic Disc" },
        { label: "Wheels", value: '17" Front / 14" Rear' },
        { label: "0 – 50 km/h", value: "3.2 sec" },
        { label: "Dry Weight", value: "57 kg" },
        { label: "Seat Height", value: "830 mm" },
        { label: "Ground Clearance", value: "270 mm" },
        { label: "Wheelbase", value: "1,230 mm" },
      ],
    },
  ],
  features: [
    {
      title: "6 kW · 250 N·m",
      body: "PMSM mid motor delivers 250 N·m of instantaneous torque via belt and chain drive. Sport mode hits 75 km/h in near-silence. This is what urban performance feels like.",
      icon: <BoltIcon />,
    },
    {
      title: "57 kg Ultralight",
      body: "Aerospace-grade aluminium alloy frame. At 57 kg the 26 Sur-Ron Light Bee feels like nothing else — pick up a line, change direction on instinct, carry it anywhere.",
      icon: <FlashIcon />,
    },
    {
      title: "USD Forks · Mono Shock",
      body: "USD hydraulic forks up front, linkage mono shock at the rear. Planted, predictable chassis precision reserved for bikes costing twice as much.",
      icon: <AdjustIcon />,
    },
    {
      title: "Removable 60V Battery",
      body: "60V 40Ah lithium pack charges in 2.5–3.5 hours and lifts clean out of the frame. Charge indoors, swap for a fresh pack, or carry a spare.",
      icon: <ChipIcon />,
    },
  ],
  financing: { months: 48, apr: "5.4%", monthly: 195, down: 499 },
  faqs: [
    {
      q: "How do I secure a pre-order?",
      a: "Complete the pre-order online to lock in your allocation and price. Allocations are secured in order of purchase. No deposit system — your full purchase secures your position.",
    },
    {
      q: "When will the 26 Sur-Ron Light Bee be delivered?",
      a: "Estimated Q3 2026 for initial pre-order allocations. We'll send regular build and shipping updates as we get closer to launch.",
    },
    {
      q: "Can I reserve a bike to inspect before purchasing?",
      a: "Yes — use the Reserve & Pay on Pickup option. No payment is required upfront. You inspect the bike in person at our Australian pickup location, then complete full payment before taking delivery.",
    },
    {
      q: "What does the 26 Sur-Ron Light Bee weigh?",
      a: "57 kg dry weight — significantly lighter than most electric bikes in this class. The aerospace aluminium alloy frame and belt-plus-chain drive system keep mass low without sacrificing durability.",
    },
    {
      q: "What warranty does the 26 Sur-Ron Light Bee carry?",
      a: "2-year powertrain warranty (motor, battery, controller) and 1-year frame and components warranty. Extended coverage available at checkout.",
    },
  ],
  defaultVariant: "black",
  variants: [
    {
      id: "black",
      label: "Black",
      colorHex: "#1c1c1e",
      accentHex: "#b8c4ce",
      glowColor: "rgba(168, 178, 192, 0.05)",
      titleGradient: "from-white via-gray-100 to-gray-400",
      heroImage: "/lbx/lbx.png",
      galleryImages: [
        "/lbx/lbx.png",
        "/lbx/side.png",
        "/lbx/front.png",
        "/lbx/frame.jpg",
        "/lbx/suspension.jpg",
        "/lbx/wheels.jpg",
      ],
      available: true,
    },
    {
      id: "purple",
      label: "Purple",
      colorHex: "#4c1d95",
      accentHex: "#8875d4",
      glowColor: "rgba(110, 86, 200, 0.16)",
      titleGradient: "from-white via-violet-200 to-violet-400",
      heroImage: "/lbx/purplelbx.png",
      galleryImages: [
        "/lbx/purplelbx.png",
        "/lbx/purpleside.png",
        "/lbx/purplefront.png",
        "/lbx/purpleframe.jpg",
        "/lbx/purplesuspension.jpg",
        "/lbx/purplewheels.jpg",
      ],
      available: true,
      shopifyCartUrl: "https://voltisemotos.myshopify.com/cart/43789977256002:1",
    },
    {
      id: "green",
      label: "Sage",
      colorHex: "#2d4a2a",
      accentHex: "#7a9e78",
      glowColor: "rgba(107, 143, 107, 0.12)",
      titleGradient: "from-white via-green-100 to-green-300",
      heroImage: "/lbx/greenlbx.png",
      galleryImages: [
        "/lbx/greenlbx.png",
        "/lbx/greenside.png",
        "/lbx/greenfront.png",
        "/lbx/frame.jpg",
        "/lbx/greensuspension.jpg",
        "/lbx/wheels.jpg",
      ],
      available: true,
      shopifyCartUrl: "https://voltisemotos.myshopify.com/cart/43789977223234:1",
    },
    {
      id: "white",
      label: "White",
      colorHex: "#f0f0f0",
      accentHex: "#c8d0d8",
      glowColor: "rgba(200, 210, 220, 0.12)",
      titleGradient: "from-white via-gray-100 to-gray-300",
      heroImage: "/lbx/white.png",
      galleryImages: [
        "/lbx/white.png",
        "/lbx/side-white.png",
        "/lbx/front-white.png",
        "/lbx/frame-white.jpg",
        "/lbx/suspension-white.jpg",
        "/lbx/wheels-white.jpg",
      ],
      available: true,
      shopifyCartUrl: "https://voltisemotos.myshopify.com/cart/43807625904194:1",
    },
  ],
};

export const bikePages: Record<string, BikePageData> = {
  falcon,
  "arctic-leopard": arcticLeopard,
  "ultra-bee": ultraBee,
  "strike-shadow": strikeShadow,
  lbx: lbxBike,
};

// Ordered display list — single source for all UI that shows a bike list.
export const allBikes: BikePageData[] = [lbxBike, ultraBee, strikeShadow, falcon, arcticLeopard];

// Derive the 4-row comparison table from a bike's performanceStats.
// Keeps SpecsSection in sync with product-page stats automatically.
export function getComparisonRows(bike: BikePageData): ComparisonRow[] {
  return bike.performanceStats.map((s) => ({
    label: s.label,
    value: `${s.value} ${s.unit}`.trim(),
    pct: s.pct,
  }));
}
