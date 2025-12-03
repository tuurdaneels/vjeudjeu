import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-steak.mp4";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section - Starts after header, content vertically centered */}
      <section className="relative flex items-center justify-center overflow-hidden mt-[27px]" style={{ height: '549px', maxHeight: '549px' }}>
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          style={{ maxHeight: '549px' }}
          autoPlay
          loop
          muted
          playsInline
          src={heroImage}
        />
        {/* Gradient overlay from top (black/100) to black/50 */}
        <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-black to-transparent pointer-events-none" />
        {/* Base black/50 overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content - Vertically centered between navbar and bottom of video */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto h-full flex flex-col items-center justify-center mt-20">
          <h1 className="hero-title mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Ontdek de pure smaak van vlees bij Vjeu Djeu
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Een authentiek restaurant in Mortsel voor<br />
            liefhebbers van écht goed vlees.
          </p>
          <div className="flex flex-wrap justify-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Link to="/reserveer" className="btn-filled">
              Reserveer
            </Link>
            <Link to="/slagerij" className="btn-filled">
              Slagerij & Take-away
            </Link>
            <Link to="/suggesties" className="btn-filled">
              Suggesties
            </Link>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="section-title mb-8 text-black">Ons verhaal…</h2>
          <div className="space-y-6 text-black/70 leading-relaxed">
            <p>
              Vroeger werd er meer Frans gesproken in het Antwerpse,
              waarbij ons stadsplein 'oude God' werd vertaald naar 'Vieux – Dieu'.
              Maar kopiëren is niet zo ons ding, waardoor de fonetische versie is ontstaan
              'Vjeu-Djeu'
            </p>
            <p>
              Het comfort en de gezelligheid van thuis.
              Het interieur, de service en de kwaliteit van een gerenommeerd restaurant.
              Een kaart boordevol klassiekers met een unieke twist.
              Dat is waar wij bij Vjeu-Djeu voor gaan.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
