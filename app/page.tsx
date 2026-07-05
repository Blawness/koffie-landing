import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-[60vh] items-center justify-center">
        <h1 className="font-display text-6xl font-extrabold text-[var(--color-forest)]">
          Koffie Home
        </h1>
      </main>
    </>
  );
}
