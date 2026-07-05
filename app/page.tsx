import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import MenuTeaser from "@/components/sections/MenuTeaser";
import Featured from "@/components/sections/Featured";
import BestCoffee from "@/components/sections/BestCoffee";
import Shops from "@/components/sections/Shops";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";

export default function Home() {
  return (
    <MotionProvider>
      <Header />
      <main>
        <Hero />
        <MenuTeaser />
        <Featured />
        <BestCoffee />
        <Shops />
        <Faq />
      </main>
      <Footer />
    </MotionProvider>
  );
}
