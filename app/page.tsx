import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Menu from "@/components/sections/Menu";
import Featured from "@/components/sections/Featured";
import BestCoffee from "@/components/sections/BestCoffee";
import Shops from "@/components/sections/Shops";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Menu />
        <Featured />
        <BestCoffee />
        <Shops />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
