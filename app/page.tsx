import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedGeckos from "@/components/home/FeaturedGeckos";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedGeckos />
    </>
  );
}