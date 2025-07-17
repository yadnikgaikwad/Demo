export const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-40 bg-white/10 backdrop-blur-sm border-b border-white/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-2">
        <div className="relative w-full overflow-hidden h-4 flex items-center">
          <div className="animate-marquee whitespace-nowrap flex items-center">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="font-perplexity text-white font-semibold text-sm mx-4">
                Deus Etrnl AI - Demo
              </span>
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={10 + i} className="font-perplexity text-white font-semibold text-sm mx-4">
                Deus Etrnl AI - Demo
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};