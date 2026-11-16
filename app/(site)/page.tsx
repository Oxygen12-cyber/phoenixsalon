import Marquee from "@/components/marquee";
import SectionOne from "@/components/sectionone";
import SectionTwo from "@/components/sectiontwo";
import SectionThree from "@/components/sectionthree";
import SectionFour from "@/components/sectionfour";
import SectionFive from "@/components/sectionfive";
import { getHomepageProducts } from "@/lib/products";

const HomePage = async () => {
  const products = await getHomepageProducts();

  return (
    <div className="w-full">
      <SectionOne />
      <Marquee />
      <SectionTwo products={products} />
      <SectionThree />
      <SectionFour />
      <SectionFive />
    </div>
  );
};

export default HomePage;
