import Layout from "@/components/Layout";
import { Instagram } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const VolgOns = () => {
  const [feedKey, setFeedKey] = useState(0);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Alleen initialiseren bij eerste mount
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Functie om FeedSpring te triggeren
    const triggerFeedSpring = () => {
      // Verwijder en voeg de feed container opnieuw toe om FeedSpring te triggeren
      setFeedKey(prev => prev + 1);
      
      // Wacht tot de DOM is bijgewerkt en probeer FeedSpring te triggeren
      setTimeout(() => {
        // Probeer verschillende methoden om FeedSpring te triggeren
        const feedContainer = document.querySelector('[feedspring="inst_et03WeeeTiqv1FrK32CxE"]');
        
        if (feedContainer) {
          // Methode 1: Trigger een custom event
          window.dispatchEvent(new CustomEvent('feedspring:reload'));
          
          // Methode 2: Als FeedSpring API beschikbaar is, roep init aan
          if ((window as any).feedspring && typeof (window as any).feedspring.init === 'function') {
            try {
              (window as any).feedspring.init();
            } catch (e) {
              console.log('FeedSpring init error:', e);
            }
          }
          
          // Methode 3: Forceer een DOM mutatie om FeedSpring te triggeren
          const observer = new MutationObserver(() => {
            // FeedSpring zou nu moeten reageren op de DOM verandering
          });
          observer.observe(feedContainer, { attributes: true, childList: true, subtree: true });
          
          // Trigger een kleine DOM verandering
          feedContainer.setAttribute('data-refresh', Date.now().toString());
          
          setTimeout(() => {
            observer.disconnect();
          }, 1000);
        }
      }, 300);
    };

    // Wacht tot het FeedSpring script geladen is
    const checkScript = setInterval(() => {
      const script = document.querySelector('script[src*="feedspring.com"]');
      if (script || (window as any).feedspring) {
        clearInterval(checkScript);
        triggerFeedSpring();
      }
    }, 100);

    // Timeout na 5 seconden
    setTimeout(() => {
      clearInterval(checkScript);
      triggerFeedSpring();
    }, 5000);

    return () => {
      clearInterval(checkScript);
    };
  }, []);

  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Title */}
          <h1 className="section-title text-center mb-4 opacity-0 animate-fade-in">
            Volg ons op instagram
          </h1>

          {/* Instagram Handle */}
          <div
            className="flex items-center justify-center gap-3 mb-12 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <Instagram size={24} />
            <a
              href="https://instagram.com/vjeudjeu"
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-xl hover:text-muted-foreground transition-colors"
            >
              @vjuedjeu
            </a>
          </div>

          <div 
            key={feedKey}
            {...{feedspring:"inst_et03WeeeTiqv1FrK32CxE"}}
            className="max-w-6xl mx-auto"
          >
            <div 
              {...{feedspring:"post"}}
              className="aspect-square overflow-hidden group"
            >
              <a
                {...{feedspring:"link"}}
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  feed-field="img"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt="Instagram post"
                />
              </a>
            </div>
            <div 
              {...{feedspring:"post"}}
              className="aspect-square overflow-hidden group"
            >
              <a
                {...{feedspring:"link"}}
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  feed-field="img"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt="Instagram post"
                />
              </a>
            </div>
            <div 
              {...{feedspring:"post"}}
              className="aspect-square overflow-hidden group"
            >
              <a
                {...{feedspring:"link"}}
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  feed-field="img"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt="Instagram post"
                />
              </a>
            </div>
            <div 
              {...{feedspring:"post"}}
              className="aspect-square overflow-hidden group"
            >
              <a
                {...{feedspring:"link"}}
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  feed-field="img"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt="Instagram post"
                />
              </a>
            </div>
            <div 
              {...{feedspring:"post"}}
              className="aspect-square overflow-hidden group"
            >
              <a
                {...{feedspring:"link"}}
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  feed-field="img"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt="Instagram post"
                />
              </a>
            </div>
            <div 
              {...{feedspring:"post"}}
              className="aspect-square overflow-hidden group"
            >
              <a
                {...{feedspring:"link"}}
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  feed-field="img"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt="Instagram post"
                />
              </a>
            </div>
          </div>

          {/* Custom CSS voor FeedSpring grid layout */}
          <style>{`
            [feedspring="inst_et03WeeeTiqv1FrK32CxE"] {
              display: grid;
              grid-template-columns: repeat(1, minmax(0, 1fr));
              gap: 1rem;
            }
            @media (min-width: 768px) {
              [feedspring="inst_et03WeeeTiqv1FrK32CxE"] {
                grid-template-columns: repeat(2, minmax(0, 1fr));
              }
            }
            @media (min-width: 1024px) {
              [feedspring="inst_et03WeeeTiqv1FrK32CxE"] {
                grid-template-columns: repeat(3, minmax(0, 1fr));
              }
            }
          `}</style>
        </div>
      </section>
    </Layout>
  );
};

export default VolgOns;
