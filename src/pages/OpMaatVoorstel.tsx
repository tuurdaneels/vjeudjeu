import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import emailjs from "@emailjs/browser";

const OpMaatVoorstel = () => {
  const questions = [
    "Naam en voornaam:",
    "Wat is de gelegenheid van uw aanvraag?",
    "Welke dag wenst u te reserveren?",
    "Wenst u in de middag of avond te reserveren?",
    "Hoeveel personen? (tussen 20-45)",
    "Hoeveel wenst u te spenderen per persoon?",
    "Zijn er allergenen? (Ja/Nee)",
    "Wenst u een aankleding? (Ja/Nee)",
    "Laat uw gegevens achter: Email + Telefoonnummer",
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [andereGelegenheid, setAndereGelegenheid] = useState("");
  const [showAndereInput, setShowAndereInput] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const loadSavedValues = (step: number) => {
    const savedAnswer = sessionStorage.getItem(`step${step}`);
    const savedEmail = sessionStorage.getItem(`step${step}_email`);
    const savedPhone = sessionStorage.getItem(`step${step}_phone`);
    const savedAndere = sessionStorage.getItem(`step${step}_anders`);

    if (step === 8) {
      setAnswer(savedEmail || "");
      setAnswer2(savedPhone || "");
    } else {
      setAnswer(savedAnswer || "");
      setAnswer2("");
    }
    
    if (step === 1) {
      if (savedAndere) {
        setAndereGelegenheid(savedAndere);
      }
      setShowAndereInput(savedAnswer === "Anders");
    } else {
      setAndereGelegenheid("");
      setShowAndereInput(false);
    }
  };

  useEffect(() => {
    emailjs.init("kyGvd2VLvMHvyl9Ua");
    
    // Clear any old localStorage data and start fresh
    // sessionStorage wordt automatisch gewist bij sluiten van tab
    // maar we starten altijd vanaf stap 0 bij mount
    setCurrentStep(0);
    loadSavedValues(0);
  }, []);

  useEffect(() => {
    loadSavedValues(currentStep);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const saveToSessionStorage = (step: number, value: string, key?: string) => {
    const storageKey = key ? `step${step}_${key}` : `step${step}`;
    sessionStorage.setItem(storageKey, value);
    sessionStorage.setItem("currentStep", step.toString());
  };

  const handleNext = () => {
    if (currentStep === 8) {
      // Email and phone step
      if (answer.trim() !== "" && answer2.trim() !== "") {
        saveToSessionStorage(8, answer.trim(), "email");
        saveToSessionStorage(8, answer2.trim(), "phone");
        saveToSessionStorage(8, `${answer.trim()} - ${answer2.trim()}`);
        submitForm();
      } else {
        alert("Vul beide velden in.");
      }
    } else if (currentStep === 1) {
      // Gelegenheid step
      if (answer.trim() !== "") {
        if (answer === "Anders" && andereGelegenheid.trim() === "") {
          alert("Vul de andere gelegenheid in.");
          return;
        }
        saveToSessionStorage(1, answer.trim());
        if (answer === "Anders") {
          saveToSessionStorage(1, andereGelegenheid.trim(), "anders");
        }
        if (answer === "Koffietafel") {
          setCurrentStep(8);
        } else {
          setCurrentStep(2);
        }
      } else {
        alert("Selecteer een gelegenheid.");
      }
    } else if (currentStep === 4) {
      // Personen step
      const aantal = parseInt(answer);
      if (aantal >= 20 && aantal <= 45) {
        saveToSessionStorage(4, answer.trim());
        setCurrentStep(5);
        setAnswer("");
      } else {
        alert("Geef een correct aantal personen in.");
      }
    } else if (answer.trim() !== "") {
      saveToSessionStorage(currentStep, answer.trim());
      if (currentStep === questions.length - 1) {
        submitForm();
      } else {
        setCurrentStep(currentStep + 1);
        setAnswer("");
        setAnswer2("");
      }
    } else {
      alert("Vul een antwoord in.");
    }
  };

  const submitForm = () => {
    const formData = {
      to_name: "Matthias",
      naam: sessionStorage.getItem("step0") || "",
      gelegenheid: sessionStorage.getItem("step1") || "",
      andere_gelegenheid: sessionStorage.getItem("step1_anders") || "",
      datum: sessionStorage.getItem("step2") || "",
      tijd: sessionStorage.getItem("step3") || "",
      personen: sessionStorage.getItem("step4") || "",
      budget: sessionStorage.getItem("step5") || "",
      allergenen: sessionStorage.getItem("step6") || "",
      aankleding: sessionStorage.getItem("step7") || "",
      email: sessionStorage.getItem("step8_email") || "",
      telefoon: sessionStorage.getItem("step8_phone") || "",
    };

    emailjs
      .send("service_bj9n8kd", "template_e25e8cc", formData)
      .then(() => {
        setIsSubmitted(true);
        setTimeout(() => {
          sessionStorage.clear();
        }, 1500);
      })
      .catch((error) => {
        console.error("Fout bij verzenden email:", error);
        alert("Er is een fout opgetreden. Probeer opnieuw.");
      });
  };

  const renderInput = () => {
    if (currentStep === 1) {
      return (
        <div className="space-y-4">
          <select
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              setShowAndereInput(e.target.value === "Anders");
              if (e.target.value !== "Anders") {
                setAndereGelegenheid("");
              }
            }}
            className="w-full px-4 py-3.5 text-black bg-white border-2 border-black/20 rounded-lg text-base transition-colors focus:outline-none focus:border-black appearance-none bg-no-repeat bg-right-4 bg-center pr-10"
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
            }}
          >
            <option value="">Selecteer...</option>
            <option value="Koffietafel">Koffietafel</option>
            <option value="Anders">Anders</option>
          </select>
          {showAndereInput && (
            <input
              type="text"
              value={andereGelegenheid}
              onChange={(e) => setAndereGelegenheid(e.target.value)}
              placeholder="Specificeer andere gelegenheid"
              className="w-full px-4 py-3.5 text-black bg-white border-2 border-black/20 rounded-lg text-base transition-colors focus:outline-none focus:border-black"
            />
          )}
        </div>
      );
    } else if (currentStep === 2) {
      return (
        <input
          type="date"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          placeholder="Selecteer een datum"
          className="w-full px-4 py-3.5 text-foreground bg-background border-2 border-foreground/20 rounded-lg text-base transition-colors focus:outline-none focus:border-foreground"
        />
      );
    } else if (currentStep === 3) {
      return (
        <select
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full px-4 py-3.5 text-foreground bg-background border-2 border-foreground/20 rounded-lg text-base transition-colors focus:outline-none focus:border-foreground appearance-none bg-no-repeat bg-right-4 bg-center pr-10"
          style={{
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
          }}
        >
          <option value="Middag">Middag (12-16 uur)</option>
          <option value="Avond">Avond (17-22:30 uur)</option>
        </select>
      );
    } else if (currentStep === 4) {
      return (
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          min={20}
          max={45}
          placeholder="Voer aantal personen in"
          className="w-full px-4 py-3.5 text-foreground bg-background border-2 border-foreground/20 rounded-lg text-base transition-colors focus:outline-none focus:border-foreground"
        />
      );
    } else if (currentStep === 5) {
      return (
        <select
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full px-4 py-3.5 text-foreground bg-background border-2 border-foreground/20 rounded-lg text-base transition-colors focus:outline-none focus:border-foreground appearance-none bg-no-repeat bg-right-4 bg-center pr-10"
          style={{
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
          }}
        >
          <option value="€65-€75 (voorgerecht, hoofdgerecht, dessert)">
            €65-€75 (voorgerecht, hoofdgerecht, dessert)
          </option>
          <option value="€75-€85 (amuse, voorgerecht, hoofdgerecht, dessert)">
            €75-€85 (amuse, voorgerecht, hoofdgerecht, dessert)
          </option>
          <option value="€85-€100 (incl. koffie/thee)">
            €85-€100 (incl. koffie/thee)
          </option>
        </select>
      );
    } else if (currentStep === 6 || currentStep === 7) {
      return (
        <select
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full px-4 py-3.5 text-foreground bg-background border-2 border-foreground/20 rounded-lg text-base transition-colors focus:outline-none focus:border-foreground appearance-none bg-no-repeat bg-right-4 bg-center pr-10"
          style={{
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
          }}
        >
          <option value="Ja">Ja</option>
          <option value="Nee">Nee</option>
        </select>
      );
    } else if (currentStep === 8) {
      return (
        <div className="space-y-4">
          <input
            type="email"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Voer uw email in"
            className="w-full px-4 py-3.5 text-black bg-white border-2 border-black/20 rounded-lg text-base transition-colors focus:outline-none focus:border-black"
          />
          <input
            type="tel"
            value={answer2}
            onChange={(e) => setAnswer2(e.target.value)}
            placeholder="Voer uw telefoonnummer in"
            className="w-full px-4 py-3.5 text-black bg-white border-2 border-black/20 rounded-lg text-base transition-colors focus:outline-none focus:border-black"
          />
        </div>
      );
    } else {
      return (
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Voer uw antwoord in"
          className="w-full px-4 py-3.5 text-foreground bg-background border-2 border-foreground/20 rounded-lg text-base transition-colors focus:outline-none focus:border-foreground"
        />
      );
    }
  };


  if (isSubmitted) {
    return (
      <Layout>
        <section className="py-20 bg-white min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h2 className="section-title mb-8 text-black">
              Bedankt voor uw inzending!
              <br />
              We nemen zo spoedig mogelijk contact met u op.
            </h2>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20 bg-white min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-[500px] mx-auto text-center">
            <h2 className="section-title mb-8 text-2xl md:text-3xl text-black">
              {questions[currentStep]}
            </h2>
            <div className="mb-4">{renderInput()}</div>
            <button
              onClick={handleNext}
              className="btn-filled-inverse w-full mt-2.5"
            >
              {currentStep === questions.length - 1 ? "Verzenden" : "Volgende"}
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default OpMaatVoorstel;

