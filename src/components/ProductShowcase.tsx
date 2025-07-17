import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Zap, Shield, Users } from "lucide-react";

export const ProductShowcase = () => {
  const products = [
    {
      id: 1,
      name: "PostureFix Pro",
      price: "$149",
      originalPrice: "$199",
      rating: 4.9,
      reviews: 2847,
      badge: "Best Seller",
      features: ["24/7 Monitoring", "Smart Alerts", "App Integration", "30-Day Program"],
      description: "Our flagship posture corrector with advanced sensor technology"
    },
    {
      id: 2,
      name: "PostureFix Lite",
      price: "$89",
      originalPrice: "$119",
      rating: 4.7,
      reviews: 1652,
      badge: "Popular",
      features: ["Real-time Feedback", "Comfort Fit", "App Tracking", "Basic Program"],
      description: "Perfect entry-level solution for everyday posture support"
    },
    {
      id: 3,
      name: "PostureFix Elite",
      price: "$249",
      originalPrice: "$299",
      rating: 5.0,
      reviews: 892,
      badge: "Premium",
      features: ["AI Analysis", "Personal Coach", "Advanced Reports", "Custom Program"],
      description: "Professional-grade solution with personal coaching included"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
            FEATURED COLLECTION
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect posture solution tailored to your lifestyle and needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="p-6 shadow-card hover:shadow-lg transition-smooth border-0 relative">
              {/* Product Badge */}
              <Badge className="absolute -top-3 left-6 bg-soft-blue text-brand-dark px-3 py-1">
                {product.badge}
              </Badge>
              
              {/* Product Image Placeholder */}
              <div className="w-full h-48 bg-muted rounded-lg mb-6 flex items-center justify-center">
                <div className="w-32 h-32 bg-brand-dark rounded-lg flex items-center justify-center">
                  <Shield className="w-16 h-16 text-soft-blue" />
                </div>
              </div>
              
              {/* Product Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {product.description}
                  </p>
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>
                
                {/* Features */}
                <div className="space-y-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Zap className="w-4 h-4 text-soft-blue" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Pricing */}
                <div className="flex items-center gap-3 pt-4">
                  <span className="text-2xl font-bold text-brand-dark">
                    {product.price}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    {product.originalPrice}
                  </span>
                </div>
                
                {/* CTA */}
                <Button className="w-full bg-brand-dark hover:bg-brand-dark/90 transition-smooth">
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};