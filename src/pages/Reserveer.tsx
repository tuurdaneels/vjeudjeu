import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import reserveerBg from "@/assets/reserveer-bg.jpg";
import { Phone } from "lucide-react";

const Reserveer = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Full-screen section with background image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden mt-[34px]">
        {/* Background Image with blur */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${reserveerBg})` }}
        >
          <div className="absolute inset-0 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content Grid */}
        <div className="relative z-10 container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mt-[120px]">
          {/* Left Section - Content */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6">
              Reserveer
            </h1>

            {/* Body Text */}
            <div className="space-y-4 text-white/90 text-lg leading-relaxed">
              <p>
                Reserveer nu je tafel en beleef een culinaire ervaring die je niet snel zult vergeten.
                Of je nu een gezellige avond met vrienden plant of een intiem diner voor twee,
                we heten je graag welkom bij Vjeu Djeu.
              </p>
              <p>
                Reserveren kan telefonisch of via het invulformulier. Voor groepen vanaf 10 personen
                raden we aan om telefonisch contact op te nemen voor de beste service.
              </p>
            </div>

            {/* Phone Number Button */}
            <a
              href="tel:033377581"
              className="inline-flex items-center btn-filled gap-3 px-6 py-3  w-fit"
            >
              <Phone size={20} />
              <span className="text-lg">03 337 75 81</span>
            </a>

            {/* Allergy Information */}
            <p className="text-white/70 text-sm mt-8">
              Allergisch? Laat het ons weten. Onze gerechten kunnen sporen van allergenen bevatten
              en de samenstelling kan variëren. Dank voor uw begrip.
            </p>
          </div>

          {/* Right Section - Reservation Widget (Iframe) */}
          <div className="flex items-center justify-center">
              <iframe 
                src="https://bookings.zenchef.com/results?rid=373369&fullscreen=1" 
                frameBorder="0" 
                scrolling="yes" 
                width="100%" 
                height="630"
                style={{ 
                  display: 'block', 
                  margin: '0 auto', 
                  maxWidth: '450px', 
                  height: '630px' 
                }}
                title="Reservering formulier"
              />
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Reserveer;
