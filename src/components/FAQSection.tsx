import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  const faqs = [
    {
      question: "How long does it take to see results?",
      answer: "Most users notice improvements in their posture within the first week of consistent use. Significant changes typically occur within 2-4 weeks as your body adapts to better alignment habits."
    },
    {
      question: "Is the device comfortable to wear all day?",
      answer: "Yes! Our PostureFix devices are designed with premium, breathable materials that feel comfortable during extended wear. The lightweight design ensures you'll forget you're wearing it."
    },
    {
      question: "Can I use it during workouts or sports?",
      answer: "The PostureFix Pro and Elite models are designed for active lifestyles and can be worn during most physical activities. However, we recommend removing it during swimming or high-impact contact sports."
    },
    {
      question: "What if I'm not satisfied with my purchase?",
      answer: "We offer a 60-day money-back guarantee. If you're not completely satisfied with your results, simply return the device for a full refund - no questions asked."
    },
    {
      question: "Do I need a smartphone to use PostureFix?",
      answer: "While the device works independently, we highly recommend using our mobile app for the best experience. The app provides detailed insights, progress tracking, and personalized coaching tips."
    }
  ];

  return (
    <section className="py-20 bg-gradient-section">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
            FREQUENTLY ASKED<br />
            <span className="text-soft-blue">QUESTIONS</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about PostureFix
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white rounded-lg shadow-soft border-0 px-6"
            >
              <AccordionTrigger className="text-left text-lg font-semibold text-brand-dark hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};