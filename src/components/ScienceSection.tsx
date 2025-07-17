import { Card } from "@/components/ui/card";
import { CheckCircle, Target, Users, Award } from "lucide-react";

export const ScienceSection = () => {
  const features = [
    {
      icon: Target,
      title: "Precision Tracking",
      description: "Advanced sensors monitor your posture 24/7 with medical-grade accuracy"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Guidance from certified posture specialists and physical therapists"
    },
    {
      icon: CheckCircle,
      title: "Proven Results",
      description: "Clinical studies show 89% improvement in posture within 30 days"
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized by leading health organizations and medical professionals"
    }
  ];

  return (
    <section className="py-20 bg-gradient-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
            THE SCIENCE<br />
            <span className="text-soft-blue">BEHIND THE SUPPORT</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our technology combines cutting-edge wearable sensors with proven therapeutic techniques 
            to deliver personalized posture correction that actually works.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center shadow-card hover:shadow-lg transition-smooth border-0">
              <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-8 h-8 text-brand-dark" />
              </div>
              <h3 className="text-xl font-semibold text-brand-dark mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};