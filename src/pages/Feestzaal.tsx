import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import interior1 from "@/assets/restaurant-interior-1.jpg";
import interior2 from "@/assets/restaurant-interior-2.png";
import interior3 from "@/assets/restaurant-interior-3.png";

const Feestzaal = () => {
  return (
    <Layout>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Title */}
          <h1 className="section-title text-center mb-16 opacity-0 animate-fade-in text-black">
            Ontdek Petit D'jeu: Onze Intieme Feestzaal
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Image Collage */}
            <div className="relative opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              {/* Decorative line drawing */}
              <svg
                className="absolute -top-8 -left-8 w-40 h-40 text-foreground/20"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              >
                <path d="M10 50 Q30 20 50 50 Q70 80 90 50" />
                <path d="M10 50 Q30 30 50 50 Q70 70 90 50" />
              </svg>

              <div className="grid grid-cols-2 gap-3 relative z-10">
                <img
                  src={interior1}
                  alt="Restaurant interieur"
                  className="w-full h-64 object-cover col-span-2"
                />
                <img
                  src={interior2}
                  alt="Feestzaal setup"
                  className="w-full h-48 object-cover"
                />
                <img
                  src={interior3}
                  alt="Sfeervolle verlichting"
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <p className="text-black/70 leading-relaxed">
                Op zoek naar de perfecte locatie om
                bijeenkomsten te vieren en speciale
                momenten te delen? Ontdek Petit D'jeu,
                onze sfeervolle feestzaal achteraan het
                restaurant. Een ideale setting voor recepties,
                verjaardagen, vergaderingen,
                productlanceringen, babyshowers,
                trouwfeesten, koffietafels en meer!
              </p>
              <p className="text-black/70 leading-relaxed">
                Geniet van een onvergetelijke ervaring in
                onze gezellig ingerichte feestzaal, compleet
                met de mogelijkheid om te combineren met
                een heerlijke lunch of diner voor uw gasten.
              </p>
              <p className="text-black/70 leading-relaxed">
                Wilt u een speciaal evenement plannen in
                Petit D'jeu?
              </p>
              <Link to="/op-maat-voorstel" className="btn-filled-inverse inline-block">
                Op maat voorstel
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Feestzaal;
