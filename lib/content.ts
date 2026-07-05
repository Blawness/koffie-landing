export type ImageAsset = { src: string; alt: string };

export const brand = {
  name: "Koffie Home",
  tagline: "Coffee & Kitchen",
  logoSrc: "/logo.jpg",
};

export const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "Unggulan", href: "#unggulan" },
  { label: "Kunjungi", href: "#kunjungi" },
  { label: "FAQ", href: "#faq" },
];

export const hero = {
  headline: "Waktunya Ngopi",
  hashtags: ["#KopiNusantara", "#NgopiSantai", "#FreshRoast", "#CoffeeAndKitchen"],
  paragraph:
    "Koffie Home menyeduh kopi specialty dari biji pilihan Nusantara dan menyajikan hidangan dapur yang menghangatkan. Setiap cangkir dibuat segar, penuh cerita.",
  ctaLabel: "Mulai Pesan",
  ctaHref: "#menu",
  photo: {
    src: "/images/hero.jpg",
    alt: "Segelas kopi susu dingin di atas meja kafe",
  },
  badgeText: ["KOFFIE HOME", "COFFEE & KITCHEN", "EST. 2020"],
};

export const marqueeItems = [
  "Kopi Susu Gula Aren",
  "Es Kopi Signature",
  "Matcha Latte",
  "Nasi Goreng Kampung",
  "Croissant Butter",
  "Cold Brew",
];

export type MenuItem = {
  name: string;
  description: string;
  price: number;
  image: ImageAsset;
};

export type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "signature",
    name: "Signature",
    items: [
      {
        name: "Es Kopi Signature",
        description: "Racikan khas Koffie Home dengan gula aren dan susu segar.",
        price: 26000,
        image: { src: "/images/signature-eskopi.jpg", alt: "Es kopi signature dengan gula aren" },
      },
      {
        name: "Kopi Susu Gula Aren",
        description: "Perpaduan espresso, susu segar, dan gula aren pilihan.",
        price: 25000,
        image: { src: "/images/kopisusu.jpg", alt: "Segelas kopi susu gula aren" },
      },
      {
        name: "Cold Brew Botolan",
        description: "Kopi seduh dingin 12 jam, ringan dan menyegarkan.",
        price: 30000,
        image: { src: "/images/coldbrew.jpg", alt: "Cold brew dalam botol" },
      },
    ],
  },
  {
    id: "kopi",
    name: "Kopi",
    items: [
      {
        name: "Espresso",
        description: "Espresso murni dari biji arabika pilihan.",
        price: 20000,
        image: { src: "/images/espresso.jpg", alt: "Secangkir espresso" },
      },
      {
        name: "Cappuccino",
        description: "Espresso dengan foam susu lembut bertekstur.",
        price: 28000,
        image: { src: "/images/cappuccino.jpg", alt: "Secangkir cappuccino dengan latte art" },
      },
      {
        name: "Americano",
        description: "Espresso yang dilarutkan dengan air panas, hitam dan bersih.",
        price: 22000,
        image: { src: "/images/americano.jpg", alt: "Secangkir americano hitam" },
      },
    ],
  },
  {
    id: "non-kopi",
    name: "Non-Kopi",
    items: [
      {
        name: "Matcha Latte",
        description: "Matcha premium dengan susu segar.",
        price: 27000,
        image: { src: "/images/matcha.jpg", alt: "Segelas matcha latte" },
      },
      {
        name: "Cokelat Panas",
        description: "Cokelat Belgia kental yang menghangatkan.",
        price: 24000,
        image: { src: "/images/cokelat.jpg", alt: "Secangkir cokelat panas" },
      },
      {
        name: "Es Teh Leci",
        description: "Teh segar dengan leci manis, dingin dan menyegarkan.",
        price: 21000,
        image: { src: "/images/esteh.jpg", alt: "Es teh leci dengan es batu" },
      },
    ],
  },
  {
    id: "makanan",
    name: "Makanan",
    items: [
      {
        name: "Nasi Goreng Kampung",
        description: "Nasi goreng khas dengan telur, ayam suwir, dan kerupuk.",
        price: 32000,
        image: { src: "/images/nasgor.jpg", alt: "Sepiring nasi goreng kampung" },
      },
      {
        name: "Mie Goreng Spesial",
        description: "Mie goreng dengan sayuran segar dan topping telur mata sapi.",
        price: 30000,
        image: { src: "/images/miegoreng.jpg", alt: "Sepiring mie goreng spesial" },
      },
      {
        name: "Ayam Geprek Sambal Matah",
        description: "Ayam goreng renyah dengan sambal matah pedas segar.",
        price: 35000,
        image: { src: "/images/ayamgeprek.jpg", alt: "Ayam geprek dengan sambal matah" },
      },
    ],
  },
  {
    id: "pastry",
    name: "Pastry",
    items: [
      {
        name: "Croissant Butter",
        description: "Croissant renyah dengan lapisan mentega premium.",
        price: 18000,
        image: { src: "/images/croissant.jpg", alt: "Croissant butter di atas piring" },
      },
      {
        name: "Banana Bread",
        description: "Roti pisang lembut dengan taburan kenari.",
        price: 20000,
        image: { src: "/images/bananabread.jpg", alt: "Irisan banana bread" },
      },
      {
        name: "Cinnamon Roll",
        description: "Roti gulung kayu manis dengan glaze manis.",
        price: 22000,
        image: { src: "/images/cinnamonroll.jpg", alt: "Cinnamon roll dengan glaze" },
      },
    ],
  },
];

export type FeaturedProduct = MenuItem & { rating: number; reviews: number };

export const featured: FeaturedProduct[] = [
  {
    name: "Kopi Susu Gula Aren",
    description: "Menu paling dicari, manis pas dan creamy.",
    price: 25000,
    image: { src: "/images/kopisusu.jpg", alt: "Segelas kopi susu gula aren" },
    rating: 4.9,
    reviews: 2540,
  },
  {
    name: "Matcha Latte",
    description: "Matcha premium yang lembut dan menyegarkan.",
    price: 27000,
    image: { src: "/images/matcha.jpg", alt: "Segelas matcha latte" },
    rating: 4.8,
    reviews: 1320,
  },
  {
    name: "Nasi Goreng Kampung",
    description: "Favorit dapur dengan cita rasa rumahan.",
    price: 32000,
    image: { src: "/images/nasgor.jpg", alt: "Sepiring nasi goreng kampung" },
    rating: 4.7,
    reviews: 980,
  },
];

export const bestCoffee = {
  eyebrow: "Gunakan",
  heading: "Kopi Terbaik",
  body: "Biji arabika premium, di-roasting segar setiap minggu, dan diracik dengan rempah pilihan untuk cita rasa yang tak terlupakan.",
  ctaLabel: "Selengkapnya",
  ctaHref: "#kunjungi",
  photo: {
    src: "/images/kitchen.jpg",
    alt: "Suasana dapur dan interior hangat Koffie Home",
  },
};

export type Shop = { name: string; caption: string; photo: ImageAsset };

export const shops: Shop[] = [
  {
    name: "Koffie Home Kenanga",
    caption: "Outlet utama dengan ruang kerja nyaman.",
    photo: { src: "/images/shop-1.jpg", alt: "Tampak depan outlet Koffie Home Kenanga" },
  },
  {
    name: "Koffie Home Dago",
    caption: "Suasana asri dengan area outdoor.",
    photo: { src: "/images/shop-2.jpg", alt: "Interior outlet Koffie Home Dago" },
  },
  {
    name: "Koffie Home Riau",
    caption: "Spot favorit untuk nongkrong sore.",
    photo: { src: "/images/shop-3.jpg", alt: "Storefront outlet Koffie Home Riau" },
  },
  {
    name: "Koffie Home Braga",
    caption: "Nuansa klasik di pusat kota.",
    photo: { src: "/images/shop-4.jpg", alt: "Interior klasik outlet Koffie Home Braga" },
  },
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Jam berapa Koffie Home buka?",
    answer: "Kami buka setiap hari pukul 08.00 hingga 22.00 WIB di seluruh outlet.",
  },
  {
    question: "Apakah menerima pesan-antar?",
    answer: "Ya, pesan-antar tersedia melalui WhatsApp dan aplikasi ojek online favorit Anda.",
  },
  {
    question: "Bisakah memesan tempat untuk acara?",
    answer: "Tentu. Hubungi kami via WhatsApp untuk reservasi area atau acara privat.",
  },
  {
    question: "Dari mana biji kopi berasal?",
    answer: "Seluruh biji kopi kami bersumber dari petani lokal Nusantara dan di-roasting segar.",
  },
  {
    question: "Apakah tersedia menu makanan?",
    answer: "Ya, sebagai Coffee & Kitchen kami menyajikan beragam hidangan dari nasi goreng hingga pastry.",
  },
];

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
