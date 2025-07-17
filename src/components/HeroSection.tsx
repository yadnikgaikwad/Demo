import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import { BackgroundBeams } from "./BackgroundBeams";

export const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-start overflow-hidden bg-black">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0 blur-sm lg:blur-none lg:left-1/3 lg:w-4/5"
        src="/video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Dark Blur Overlay */}
      <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm lg:backdrop-blur-none" />
      {/* Hero Content */}
      <div className="relative z-20 text-left text-white max-w-4xl px-6 flex flex-col gap-4">
        <h1 className="font-montserrat-bold text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Improve Your Posture.<br />
          <span className="text-soft-blue">Empower Your Life.</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
          Wearable tech and expert support to align your body and elevate your well-being.
        </p>
        <Button 
          size="lg" 
          className="bg-soft-blue text-brand-dark hover:bg-soft-blue/90 text-lg px-8 py-4 transition-smooth w-fit"
        >
          Get Started
        </Button>
      </div>
    </section>
  );
};