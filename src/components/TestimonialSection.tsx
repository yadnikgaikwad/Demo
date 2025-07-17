import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

export const TestimonialSection = () => {
  return (
    <section className="py-20 bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            WE'VE GOT<br />
            <span className="text-soft-blue">YOUR BACK</span>
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands who have transformed their posture and quality of life
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah M.",
              role: "Office Manager",
              rating: 5,
              text: "After just 3 weeks, my back pain is completely gone. The gentle reminders helped me build lasting habits."
            },
            {
              name: "David K.",
              role: "Software Developer",
              rating: 5,
              text: "As someone who sits all day, this device has been a game-changer. My confidence has improved dramatically."
            },
            {
              name: "Dr. Jennifer L.",
              role: "Physical Therapist",
              rating: 5,
              text: "I recommend PostureFix to all my patients. The technology is impressive and results speak for themselves."
            }
          ].map((testimonial, index) => (
            <Card key={index} className="p-6 bg-white/10 border-white/20 backdrop-blur-sm">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-soft-blue mb-4" />
              
              <p className="text-white/90 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div>
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-soft-blue text-sm">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};