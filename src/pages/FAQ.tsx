import Layout from "@/components/Layout";
import faqBg from "@/assets/faq-bg.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqItems = [
    {
      question: "Is er een buiten terras?",
      answer:
        "Ja, we verwelkomen u graag op onze twee buitenterrassen, zowel aan de voorzijde als achterzijde van ons restaurant. In de winter zijn deze terrassen volledig verwarmd en afgesloten voor uw comfort.",
    },
    {
      question: "Is VJEU-DJEU vlot bereikbaar ?",
      answer:
        "Ja, Vjeu-Djeu is bereikbaar met bus, tram en trein. Haltes bevinden zich op circa 100 meter van de zaak. Komt u met de auto? Er is een ondergrondse parking aanwezig op 100 meter afstand, alsook vrij parkeren in de nabije omgeving is mogelijk (betalend tot 18u)",
    },
    {
      question: "Mag mijn hond meekomen?",
      answer:
        "Viervoeters zijn door ons graag gezien, echter vanwege onze open keuken mogen wij geen honden binnen toelaten.",
    },
    {
      question: "Wat zijn de betaalmogelijkheden?",
      answer:
        "U kan bij ons betalen met cash, Bankcontact, Visa en Mastercard. Prijzen zijn incl. btw Bij Vjeu-Djeu volgen wij het beleid van één rekening per tafel en verzoeken wij vriendelijk onze gasten om geen verzoeken voor splitsing van de rekening in te dienen. Wij danken u voor uw begrip.",
    },
    {
      question: "Kan ik een cadeaubon kopen?",
      answer:
        "Wil je iemand verrassen met een heerlijk etentje bij Vjeu-Djeu? Dat kan! Bij ons kun je cadeaubonnen aanschaffen die een jaar geldig zijn vanaf de aankoopdatum.",
    },
    {
      question: "Algemeen privacy beleid",
      answer:
        "Je persoonlijke gegevens worden veilig en vertrouwelijk behandeld. Deze worden uitsluitend gebruikt om je bestelling voor take-away, levering of reservering te verwerken, zoals beschreven in ons Privacy beleid.",
    },
  ];

  return (
    <Layout>
      <section className="relative min-h-[calc(100vh-320px)]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${faqBg})` }}
        >
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mt-[120px]">
            {/* Opening Hours */}
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h1 className="section-title mb-8">Vraag het ons</h1>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="font-medium mb-4">Openingsuren:</h3>
                  <div className="space-y-1 text-muted-foreground text-sm">
                    <p><span className="text-foreground">Woensdag</span></p>
                    <p>10.00 u – 22.30 u</p>
                    <p><span className="text-foreground">Donderdag – Zondag</span></p>
                    <p>11.45 u – 22.30 u</p>
                    <p><span className="text-foreground">Zaterdag</span></p>
                    <p>17.00 u – 22.30 u</p>
                    <p><span className="text-foreground">Gesloten</span></p>
                    <p>Maandag – Dinsdag</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">De keuken is geopend:</h3>
                  <div className="space-y-1 text-muted-foreground text-sm">
                    <p><span className="text-foreground">Woensdag t.e.m. vrijdag</span></p>
                    <p>Lunch: 12.00 – 14.30 u</p>
                    <p>Diner: 17.30 – 21.00 u</p>
                    <p><span className="text-foreground">Zaterdag*</span></p>
                    <p>Diner: 17.00 – 21.00 u</p>
                    <p><span className="text-foreground">Zondag</span></p>
                    <p>Doorlopend geopend:</p>
                    <p>12.00 – 21.00 u</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-xs text-muted-foreground space-y-2">
                <p>Vanaf 17.30u is de zaak enkel gereserveerd als restaurant</p>
                <p>*(Zaterdagmiddag enkel open voor privéfeesten, feestdagen en evenementen in Mortsel. Neem contact op voor een voorstel.)</p>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="border-l-2 border-foreground pl-6">
                <Accordion type="single" collapsible className="space-y-2">
                  {faqItems.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border-b border-border/30"
                    >
                      <AccordionTrigger className="text-left text-foreground hover:no-underline py-4">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
