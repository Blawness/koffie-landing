import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Menu from "@/components/sections/Menu";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Menu />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
