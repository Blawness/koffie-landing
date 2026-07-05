export type ImageAsset = { src: string; alt: string };

export const brand = {
  name: "Koffie Home",
  tagline: "Coffee & Kitchen",
  logoSrc: "/logo.jpg",
};

export const navLinks = [
  { label: "Menu", href: "/menu" },
  { label: "Unggulan", href: "/#unggulan" },
  { label: "Kunjungi", href: "/#kunjungi" },
  { label: "FAQ", href: "/#faq" },
];

export const hero = {
  headline: "Waktunya Ngopi",
  hashtags: ["#KoffieHome", "#Jagakarsa", "#KopiAren", "#CoffeeAndKitchen"],
  paragraph:
    "Koffie Home di Jagakarsa, Jakarta Selatan — rumah kedua untuk ngopi dengan Kopi Aren House Blend racikan sendiri dan hidangan dapur ala rumahan. Suasana tenang, hangat, cocok untuk kerja maupun santai.",
  ctaLabel: "Lihat Menu",
  ctaHref: "#menu",
  photo: {
    src: "/images/hero.jpg",
    alt: "Segelas kopi susu dingin di atas meja kafe",
  },
  badgeText: ["KOFFIE HOME", "COFFEE & KITCHEN", "JAGAKARSA"],
};

export const marqueeItems = [
  "Kopi Aren House Blend",
  "Nasi Goreng Kambing",
  "Croffle",
  "Piccolo",
  "Carbonara",
  "Manual Brew",
  "Nasi Ayam Kecombrang",
  "Chicken Wings",
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

// Nama menu berdasarkan menu asli Koffie Home Jagakarsa.
// Harga adalah estimasi dalam kisaran Rp25.000–90.000 (harga per-item tidak dipublikasikan resmi).
export const menuCategories: MenuCategory[] = [
  {
    id: "signature",
    name: "Signature",
    items: [
      {
        name: "Kopi Aren House Blend",
        description: "Racikan khas Koffie Home: blend arabika & robusta dengan gula aren dan susu segar.",
        price: 28000,
        image: { src: "/images/signature-eskopi.jpg", alt: "Es kopi aren house blend" },
      },
      {
        name: "Malvern",
        description: "Signature milk coffee bertekstur lembut dengan sentuhan manis seimbang.",
        price: 32000,
        image: { src: "/images/kopisusu.jpg", alt: "Segelas signature milk coffee Malvern" },
      },
      {
        name: "Home",
        description: "Kopi signature andalan, karakter bold dan smooth khas Koffie Home.",
        price: 35000,
        image: { src: "/images/coldbrew.jpg", alt: "Signature coffee Home dalam gelas" },
      },
    ],
  },
  {
    id: "kopi",
    name: "Kopi",
    items: [
      {
        name: "Piccolo",
        description: "Ristretto padat dengan sedikit steamed milk, intens dan creamy.",
        price: 30000,
        image: { src: "/images/cappuccino.jpg", alt: "Secangkir piccolo latte" },
      },
      {
        name: "Manual Brew (V60)",
        description: "Seduh manual dari biji pilihan, bersih dengan aroma yang menonjol.",
        price: 35000,
        image: { src: "/images/americano.jpg", alt: "Kopi manual brew V60" },
      },
      {
        name: "Espresso",
        description: "Espresso murni dari house blend, pekat dan beraroma.",
        price: 22000,
        image: { src: "/images/espresso.jpg", alt: "Secangkir espresso" },
      },
    ],
  },
  {
    id: "non-kopi",
    name: "Non-Kopi",
    items: [
      {
        name: "Matcha Latte",
        description: "Matcha premium dengan susu segar, lembut dan menyegarkan.",
        price: 33000,
        image: { src: "/images/matcha.jpg", alt: "Segelas matcha latte" },
      },
      {
        name: "Cokelat",
        description: "Cokelat kental yang menghangatkan, tersedia panas atau dingin.",
        price: 30000,
        image: { src: "/images/cokelat.jpg", alt: "Secangkir cokelat" },
      },
      {
        name: "Es Teh",
        description: "Teh seduh segar yang dingin dan menyegarkan.",
        price: 22000,
        image: { src: "/images/esteh.jpg", alt: "Es teh dengan es batu" },
      },
    ],
  },
  {
    id: "makanan",
    name: "Makanan",
    items: [
      {
        name: "Nasi Goreng Kambing",
        description: "Nasi basmati dengan kambing gurih dan rempah yang harum — menu andalan.",
        price: 55000,
        image: { src: "/images/nasgor.jpg", alt: "Sepiring nasi goreng kambing basmati" },
      },
      {
        name: "Nasi Ayam Kecombrang",
        description: "Nasi dengan ayam dan aroma khas kecombrang yang segar.",
        price: 48000,
        image: { src: "/images/ayamgeprek.jpg", alt: "Nasi ayam kecombrang" },
      },
      {
        name: "Carbonara Pasta & Rice",
        description: "Pasta carbonara creamy, bisa dipadu dengan nasi sesuai selera.",
        price: 58000,
        image: { src: "/images/miegoreng.jpg", alt: "Sepiring carbonara pasta" },
      },
    ],
  },
  {
    id: "dessert",
    name: "Dessert",
    items: [
      {
        name: "Croffle",
        description: "Croissant-waffle renyah dengan topping manis — bikin nagih.",
        price: 33000,
        image: { src: "/images/croissant.jpg", alt: "Croffle dengan topping manis" },
      },
      {
        name: "Banana Bread",
        description: "Roti pisang lembut dengan taburan kenari.",
        price: 30000,
        image: { src: "/images/bananabread.jpg", alt: "Irisan banana bread" },
      },
      {
        name: "Cinnamon Roll",
        description: "Roti gulung kayu manis dengan glaze manis.",
        price: 32000,
        image: { src: "/images/cinnamonroll.jpg", alt: "Cinnamon roll dengan glaze" },
      },
    ],
  },
];

export type FeaturedProduct = MenuItem & { rating: number; reviews: number };

export const featured: FeaturedProduct[] = [
  {
    name: "Kopi Aren House Blend",
    description: "Menu paling dicari, manis pas dan creamy.",
    price: 28000,
    image: { src: "/images/signature-eskopi.jpg", alt: "Es kopi aren house blend" },
    rating: 4.9,
    reviews: 2540,
  },
  {
    name: "Nasi Goreng Kambing",
    description: "Nasi basmati gurih dengan kambing berempah — andalan dapur.",
    price: 55000,
    image: { src: "/images/nasgor.jpg", alt: "Sepiring nasi goreng kambing" },
    rating: 4.8,
    reviews: 1320,
  },
  {
    name: "Croffle",
    description: "Croissant-waffle renyah yang bikin balik lagi.",
    price: 33000,
    image: { src: "/images/croissant.jpg", alt: "Croffle dengan topping manis" },
    rating: 4.9,
    reviews: 980,
  },
];

export const bestCoffee = {
  eyebrow: "Gunakan",
  heading: "Kopi Aren House Blend",
  body: "Blend arabika & robusta racikan sendiri, dipadu gula aren untuk karakter manis-legit khas Koffie Home. Diseduh segar setiap gelas.",
  ctaLabel: "Selengkapnya",
  ctaHref: "#kunjungi",
  photo: {
    src: "/images/kitchen.jpg",
    alt: "Suasana dapur dan interior hangat Koffie Home",
  },
};

export type Shop = { name: string; caption: string; photo: ImageAsset };

// Koffie Home hanya punya satu lokasi di Jagakarsa — bagian ini menampilkan
// suasana beberapa sudut kafe.
export const shops: Shop[] = [
  {
    name: "Ruang Utama",
    caption: "Interior hangat bernuansa kayu, tenang untuk kerja & baca.",
    photo: { src: "/images/shop-1.jpg", alt: "Ruang utama Koffie Home Jagakarsa" },
  },
  {
    name: "Area Ngopi",
    caption: "Cahaya alami dari jendela besar, cocok buat santai.",
    photo: { src: "/images/shop-2.jpg", alt: "Area duduk Koffie Home" },
  },
  {
    name: "Sudut Favorit",
    caption: "Spot nyaman untuk nongkrong sore bareng teman.",
    photo: { src: "/images/shop-3.jpg", alt: "Sudut favorit Koffie Home" },
  },
  {
    name: "Meja Bar",
    caption: "Dekat barista, lihat langsung kopi diracik.",
    photo: { src: "/images/shop-4.jpg", alt: "Meja bar Koffie Home" },
  },
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Di mana lokasi Koffie Home?",
    answer:
      "Kami berada di Jl. Moch. Kahfi II No. 3, Ciganjur, Jagakarsa, Jakarta Selatan 12630.",
  },
  {
    question: "Jam berapa Koffie Home buka?",
    answer:
      "Senin–Kamis 09.00–22.00, Jumat 09.00–11.30 & 13.30–23.00 (jeda salat Jumat), serta Sabtu–Minggu 09.00–23.00 WIB.",
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
    question: "Apa menu andalannya?",
    answer:
      "Kopi Aren House Blend dan Nasi Goreng Kambing basmati jadi favorit, plus Croffle untuk dessert.",
  },
  {
    question: "Apakah tersedia menu makanan?",
    answer: "Ya, sebagai Coffee & Kitchen kami menyajikan beragam hidangan dapur, dari nasi hingga pasta.",
  },
];

export const contact = {
  address: "Jl. Moch. Kahfi II No. 3, Ciganjur, Jagakarsa, Jakarta Selatan 12630",
  hours: "Sen–Kam 09.00–22.00 · Jum 09.00–11.30 & 13.30–23.00 · Sab–Min 09.00–23.00 WIB",
  whatsapp: "https://wa.me/6282288882084",
  whatsappLabel: "Hubungi via WhatsApp",
  instagram: "https://www.instagram.com/koffiehome/",
  facebook: "https://www.facebook.com/koffiehomeID/",
  maps: "https://maps.google.com/?q=Koffie+Home+Jagakarsa",
};

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}
