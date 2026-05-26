export const headlineWords = ["RIDE", "WITHOUT", "LIMITS"];

export const navLinks = [
  { label: "Bikes",   href: "#bikes" },
  { label: "Specs",   href: "#specs" },
  { label: "Contact", href: "/contact" },
  { label: "About",   href: "/about" },
];

// Bike lists are now sourced from lib/bikeData.tsx (allBikes + getComparisonRows).
// This file keeps only non-bike page data.

export const testimonials = [
  {
    quote: "The Falcon Pro completely changed how I think about off-road riding. The torque is instant and the handling is unlike anything I've ridden.",
    name: "Jake Morrison",
    title: "Pro Enduro Rider",
    bike: "Falcon Pro",
    avatar: "JM",
    accentFrom: "from-purple-500/25",
    stars: 5,
  },
  {
    quote: "I switched from a gas bike to the Arctic Leopard and haven't looked back. Zero maintenance, zero noise, pure adrenaline on every trail.",
    name: "Sarah Chen",
    title: "Trail Riding Enthusiast",
    bike: "Arctic Leopard",
    avatar: "SC",
    accentFrom: "from-sky-500/20",
    stars: 5,
  },
  {
    quote: "Got the Sur-Ron Ultra Bee for my son and he's obsessed. The power delivery is smooth enough for a beginner but still thrilling. Perfect starter bike.",
    name: "Marcus Reid",
    title: "Parent & Weekend Rider",
    bike: "Sur-Ron Ultra Bee",
    avatar: "MR",
    accentFrom: "from-emerald-500/20",
    stars: 5,
  },
  {
    quote: "Voltis builds are exceptional. The frame quality, the motor response, the attention to detail — this is a serious machine at every level.",
    name: "Danielle Vo",
    title: "Competitive Motocross",
    bike: "Falcon Pro",
    avatar: "DV",
    accentFrom: "from-purple-500/25",
    stars: 5,
  },
];

export const footerLinks: Record<string, { label: string; href: string }[]> = {
  Bikes: [
    { label: "Sur-Ron Light Bee — Pre-Order", href: "/bikes/lbx" },
    { label: "Strike Shadow",   href: "/bikes/strike-shadow" },
    { label: "Sur-Ron Ultra Bee", href: "/bikes/ultra-bee" },
    { label: "Arctic Leopard",  href: "/bikes/arctic-leopard" },
    { label: "Falcon Pro",       href: "/bikes/falcon" },
  ],
  Company: [
    { label: "About Us",  href: "/about" },
    { label: "Contact",   href: "/contact" },
    { label: "Careers",   href: "/contact" },
    { label: "Dealers",   href: "/contact" },
  ],
  Support: [
    { label: "FAQ",                 href: "/faq" },
    { label: "Warranty",            href: "/warranty" },
    { label: "Shipping & Delivery", href: "/shipping" },
    { label: "Returns & Refunds",   href: "/returns" },
  ],
  Legal: [
    { label: "Privacy Policy",   href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.53V6.77a4.85 4.85 0 0 1-1.02-.08z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];
