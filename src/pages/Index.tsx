import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ScienceSection } from "@/components/ScienceSection";
import { ProductShowcase } from "@/components/ProductShowcase";
import { TestimonialSection } from "@/components/TestimonialSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { ChatbotWidget } from "@/components/ChatbotWidget";

const Index = () => {
  return (
    // Do not add overflow-hidden or relative here, to allow fixed elements like the chatbot to stay at viewport level
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ScienceSection />
      <ProductShowcase />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
      <ChatbotWidget />
    </div>
  );
};

export default Index;
