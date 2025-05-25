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
      <SectionTitle title="category" />
      <CategoryList />

      <SectionTitle title="popular" />
      <ProductCarousel category="popular" />

      <SectionTitle title="featured" />
      <ProductCarousel category="featured" />

      <SectionTitle title="trending" />
      <ProductCarousel category="trending" />

      <ReviewCarousel />

      <FeatureCards />
      <Newsletter />
      <Footer />
    </>
  );
}
