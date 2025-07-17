import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-20 bg-soft-blue">
      <div className="max-w-6xl mx-auto px-6">
        <Card className="p-12 text-center shadow-card border-0 bg-white">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
            START YOUR POSTURE<br />
            <span className="text-soft-blue">TRANSFORMATION TODAY</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Join over 50,000 people who have already improved their posture, 
            reduced pain, and boosted their confidence with PostureFix.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {[
              "60-Day Money Back Guarantee",
              "Free Shipping Worldwide",
              "24/7 Expert Support",
              "Instant Setup & Results"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-brand-dark font-medium">{benefit}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-brand-dark hover:bg-brand-dark/90 text-lg px-8 py-4 transition-smooth group"
            >
              Get PostureFix Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white transition-smooth"
            >
              Learn More
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-6">
            Special Launch Price: Save 25% - Limited Time Only
          </p>
        </Card>
      </div>
    </section>
  );
};