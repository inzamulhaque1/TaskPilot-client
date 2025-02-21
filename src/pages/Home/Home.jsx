import BlogSection from "./BlogSection";
import FAQSection from "./FAQSection";
import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";
import KeyFeatures from "./KeyFeatures";
import TechnologiesUsed from "./TechnologiesUsed";

const Home = () => {
    return (
        <div className="exo2">
            <HeroSection></HeroSection>
            <KeyFeatures></KeyFeatures>
            <FeaturesSection></FeaturesSection>
            <TechnologiesUsed></TechnologiesUsed>
            <BlogSection></BlogSection>
            <FAQSection></FAQSection>
        </div>
    );
};

export default Home;