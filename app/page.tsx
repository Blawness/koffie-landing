import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Menu from "@/components/sections/Menu";
import Featured from "@/components/sections/Featured";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Menu />
        <Featured />
      </main>
    </>
  );
}
