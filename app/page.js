import HeroBanner from "@/components/HeroBanner";
import SectionTitle from "@/components/SectionTitle";
import ProductCarousel from "@/components/ProductCarousel";
import FeatureCards from "@/components/FeatureCards";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import ReviewCarousel from "@/components/ReviewCarousel";
import CategoryList from "@/components/CategoryList";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <SectionTitle title="Shop by Category" />
      <CategoryList />

      <SectionTitle title="Popular on This Store" />
      <ProductCarousel category="popular" />

      <SectionTitle title="This Week's Featured" />
      <ProductCarousel category="featured" />

      <SectionTitle title="Trending Arrivals" />
      <ProductCarousel category="trending" />

      <SectionTitle title="Customer Reviews" />
      <ReviewCarousel />

      <FeatureCards />
      <Newsletter />
      <Footer />
    </>
  );
}
