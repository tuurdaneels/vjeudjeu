import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import heroImage from "@/assets/menu-bg.jpg";
import carousel1 from "@/assets/carousel/DSC05490.jpg";
import carousel2 from "@/assets/carousel/DSC05502.jpg";
import carousel3 from "@/assets/carousel/DSC07329.jpg";
import carousel4 from "@/assets/carousel/DSC07384.jpg";
import carousel5 from "@/assets/carousel/VDAB_2022_Chefdepartie-40-web.jpg";
import carousel6 from "@/assets/carousel/VDAB_2022_Hulpkelner-038.jpg";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const Menu = () => {
  const images = [
    { src: carousel1, alt: "Sfeerbeeld restaurant" },
    { src: carousel2, alt: "Sfeerbeeld restaurant" },
    { src: carousel3, alt: "Sfeerbeeld restaurant" },
    { src: carousel4, alt: "Sfeerbeeld restaurant" },
    { src: carousel5, alt: "Chef aan het werk" },
    { src: carousel6, alt: "Service in actie" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Bereken het aantal paren (slides met 2 foto's)
  const totalPairs = Math.ceil(images.length / 2);

  // Auto-play functionaliteit
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPairs);
    }, 5000); // Wissel elke 5 seconden

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalPairs]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPairs) % totalPairs);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPairs);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  // Haal de 2 foto's op voor de huidige slide
  const getCurrentImages = () => {
    const startIndex = currentIndex * 2;
    return [
      images[startIndex],
      images[startIndex + 1] || null, // null als er geen tweede foto is
    ];
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] mt-[34px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-20 mt-[120px]">
          <h1 className="hero-title mb-6 opacity-0 animate-fade-in text-3xl md:text-5xl" style={{ animationDelay: "0.2s" }}>
            Ervaar de Authentieke Smaak: Vleesgerechten
            Bereid in de Josper Houtskooloven
          </h1>
          <div className="space-y-4 text-foreground/80 max-w-2xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <p>
              Bij ons worden vleesgerechten bereid in de Josper houtskooloven, een ware
              smaaksensatie die al uw zintuigen prikkelt. Deze exclusieve oven, aangedreven door de
              intense warmte van houtskool, schroeit het vlees direct aan alle zijden dicht en behoudt
              zo alle authentieke smaken die u kent en liefhebt.
            </p>
            <p>
              Onze unieke Vjeu-Djeu combinatie, waarbij de verrukkelijke gerechten samenkomen met
              onze huisgemaakte sauzen en bijgerechten, zorgt voor een culinaire ervaring die u niet
              snel zult vergeten. Laat ons u meenemen op een smaakvolle reis vol ambacht, traditie en
              genot, alles samengebracht in elk perfect bereid gerecht.
            </p>
            <p className="font-medium">
              Kom en proef de authenticiteit, kom en geniet met ons mee.
            </p>
          </div>

          {/* Menu Tabs */}
          <div className="flex justify-center gap-4 mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Link to="/lunch" className="btn-filled">
              Lunch
            </Link>
            <Link to="/diner" className="btn-filled">
              Diner
            </Link>
            <Link to="/suggesties" className="btn-filled">
              Suggesties
            </Link>
          </div>

          {/* Allergy Notice */}
          <p className="mt-8 text-sm text-foreground/70 max-w-xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            Bent u <strong className="text-foreground">allergisch</strong> aan bepaalde ingrediënten, meld het ons. Onze gerechten kunnen mogelijk
            sporen bevatten van wettelijke allergenen. De samenstelling van de gerechten kan variëren.
            Dank voor uw begrip.
          </p>
        </div>
      </section>

      {/* Image Carousel - Sfeerbeelden */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            
            {/* Carousel Container */}
            <div className="relative group">
              {/* Navigation Buttons - Left */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-all opacity-0 group-hover:opacity-100 shadow-lg z-20"
                aria-label="Vorige afbeeldingen"
              >
                <ArrowLeft size={20} />
              </button>

              {/* Navigation Buttons - Right */}
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-all opacity-0 group-hover:opacity-100 shadow-lg z-20"
                aria-label="Volgende afbeeldingen"
              >
                <ArrowRight size={20} />
              </button>

              {/* Two Images Side by Side */}
              <div className="relative overflow-hidden rounded-lg aspect-[16/9] bg-background/10">
                <div className="grid grid-cols-2 gap-4 h-full">
                  {getCurrentImages().map((image, idx) => {
                    if (!image) return null;
                    return (
                      <div
                        key={`${currentIndex}-${idx}`}
                        className="relative overflow-hidden rounded-lg transition-opacity duration-700 ease-in-out"
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                        {/* Gradient overlay voor betere leesbaarheid */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      </div>
                    );
                  })}
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-6 right-6 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm z-10">
                  {currentIndex + 1} / {totalPairs}
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalPairs }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentIndex
                        ? 'w-10 h-2 bg-foreground'
                        : 'w-2 h-2 bg-foreground/30 hover:bg-foreground/50'
                    }`}
                    aria-label={`Ga naar slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Menu;
