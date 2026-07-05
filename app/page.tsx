import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Menu from "@/components/sections/Menu";
import Featured from "@/components/sections/Featured";
import BestCoffee from "@/components/sections/BestCoffee";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Menu />
        <Featured />
        <BestCoffee />
      </main>
    </>
  );
}
