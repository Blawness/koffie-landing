import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Menu from "@/components/sections/Menu";
import Featured from "@/components/sections/Featured";
import BestCoffee from "@/components/sections/BestCoffee";
import Shops from "@/components/sections/Shops";

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
      </main>
    </>
  );
}
