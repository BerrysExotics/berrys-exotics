import Hero from "../components/home/Hero";
import GeckoList from "@/components/GeckoList";
import FeaturedGeckos from "../components/home/FeaturedGeckos";
import WhyChooseUs from "../components/home/WhyChooseUs";
import About from "../components/home/About";
import ComingSoon from "../components/home/ComingSoon";
import Footer from "../components/home/Footer";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Live Geckos From Database */}
      <GeckoList />

      <FeaturedGeckos />

      <WhyChooseUs />

      <About />

      <ComingSoon />

      <Footer />
    </>
  );
}