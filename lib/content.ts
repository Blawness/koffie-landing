export const brand = {
  name: "Koffie Home",
  tagline: "Kopi pilihan, diseduh dengan cinta.",
};

export const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "Tentang", href: "#tentang" },
  { label: "Kontak", href: "#kontak" },
];

export const hero = {
  heading: "Secangkir Kehangatan di Setiap Kunjungan",
  subheading:
    "Koffie Home menyajikan kopi specialty dari biji pilihan Nusantara, diseduh segar setiap hari.",
  ctaLabel: "Lihat Menu",
  ctaHref: "#menu",
};

export type MenuItem = {
  name: string;
  description: string;
  price: number;
};

export type MenuCategory = {
  name: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    name: "Kopi",
    items: [
      {
        name: "Espresso",
        description: "Espresso murni dari biji arabika pilihan.",
        price: 20000,
      },
      {
        name: "Kopi Susu Gula Aren",
        description: "Perpaduan espresso, susu segar, dan gula aren.",
        price: 25000,
      },
      {
        name: "Cappuccino",
        description: "Espresso dengan foam susu lembut bertekstur.",
        price: 28000,
      },
    ],
  },
  {
    name: "Non-Kopi",
    items: [
      {
        name: "Matcha Latte",
        description: "Matcha premium dengan susu segar.",
        price: 27000,
      },
      {
        name: "Cokelat Panas",
        description: "Cokelat Belgia kental yang menghangatkan.",
        price: 24000,
      },
    ],
  },
  {
    name: "Pastry",
    items: [
      {
        name: "Croissant Butter",
        description: "Croissant renyah dengan lapisan mentega premium.",
        price: 18000,
      },
      {
        name: "Banana Bread",
        description: "Roti pisang lembut dengan taburan kenari.",
        price: 20000,
      },
    ],
  },
];

export const aboutValues = [
  {
    title: "Biji Pilihan",
    description:
      "Kami memilih biji kopi terbaik dari petani lokal Nusantara.",
  },
  {
    title: "Diseduh Segar",
    description: "Setiap cangkir diseduh saat dipesan, bukan disimpan lama.",
  },
  {
    title: "Suasana Hangat",
    description: "Tempat nyaman untuk bekerja, bersantai, atau berkumpul.",
  },
];

export const aboutStory = {
  heading: "Tentang Koffie Home",
  paragraphs: [
    "Koffie Home lahir dari kecintaan pada kopi Nusantara dan keinginan untuk menghadirkan ruang yang hangat bagi siapa saja.",
    "Sejak awal, kami berkomitmen menyajikan kopi berkualitas dengan harga yang bersahabat, ditemani suasana yang membuat betah.",
  ],
};

export const contact = {
  address: "Jl. Kenanga No. 12, Bandung, Jawa Barat",
  hours: "Setiap hari, 08.00 - 22.00 WIB",
  whatsapp: "https://wa.me/6281234567890",
  whatsappLabel: "Hubungi via WhatsApp",
};

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}
