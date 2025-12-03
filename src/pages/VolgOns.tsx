import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Instagram } from "lucide-react";

const VolgOns = () => {
  useEffect(() => {
    // Elke keer als deze pagina geladen wordt, injecteren we het FeedSpring script
    const script = document.createElement("script");
    script.src = "https://scripts.feedspring.com/instagram-attrs.js";
    script.async = true;
    script.defer = true;
    script.dataset.feedspringInstagram = "true";

    document.body.appendChild(script);

    return () => {
      // Optioneel: script weer weghalen als je van de pagina weg navigeert
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Title */}
          <h1 className="section-title text-center mb-4">
            Volg ons op instagram
          </h1>

          {/* Instagram Handle */}
          <div
            className="flex items-center justify-center gap-3 mb-12"
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

          {/* Instagram Grid - FeedSpring */}
          <div
            className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            {...{
              feedspring: "inst_et03WeeeTiqv1FrK32CxE",
              "feed-options": "render:dynamic|limit:6",
            }}
          >
            {/* Één dynamische template-post */}
            <div
              className="aspect-square overflow-hidden group"
              {...{ feedspring: "post" }}
            >
              <a
                {...{ "feed-field": "link" }}
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  {...{ "feed-field": "img" }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt="Instagram post"
                />
              </a>
            </div>
            <div
              className="aspect-square overflow-hidden group"
              {...{ feedspring: "post" }}
            >
              <a
                {...{ "feed-field": "link" }}
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  {...{ "feed-field": "img" }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt="Instagram post"
                />
              </a>
            </div>
            <div
              className="aspect-square overflow-hidden group"
              {...{ feedspring: "post" }}
            >
              <a
                {...{ "feed-field": "link" }}
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  {...{ "feed-field": "img" }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt="Instagram post"
                />
              </a>
            </div>
            <div
              className="aspect-square overflow-hidden group"
              {...{ feedspring: "post" }}
            >
              <a
                {...{ "feed-field": "link" }}
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  {...{ "feed-field": "img" }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt="Instagram post"
                />
              </a>
            </div>
            <div
              className="aspect-square overflow-hidden group"
              {...{ feedspring: "post" }}
            >
              <a
                {...{ "feed-field": "link" }}
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  {...{ "feed-field": "img" }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt="Instagram post"
                />
              </a>
            </div>
            <div
              className="aspect-square overflow-hidden group"
              {...{ feedspring: "post" }}
            >
              <a
                {...{ "feed-field": "link" }}
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  {...{ "feed-field": "img" }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt="Instagram post"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default VolgOns;
