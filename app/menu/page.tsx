import type { Metadata } from "next";
import Header from "@/components/Header";
import Menu from "@/components/sections/Menu";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";

export const metadata: Metadata = {
  title: "Menu — Koffie Home",
  description:
    "Menu lengkap Koffie Home: signature, kopi, non-kopi, makanan, dan pastry.",
};

export default function MenuPage() {
  return (
    <MotionProvider>
      <Header />
      <main>
        <Menu />
      </main>
      <Footer />
    </MotionProvider>
  );
}
