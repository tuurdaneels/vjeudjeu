import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Net als een goed gerecht is deze pagina even uitverkocht of misschien heeft ze nooit bestaan
        Maar geen zorgen, bij Vjeudjeu weten we hoe we verloren hongerige zielen moeten verwelkomen</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Keer terug naar onze website
        </a>
        <p className="mb-4 text-xl text-muted-foreground">Tot snel bij Vjeudjeu waar elke omweg een smakelijke bestemming wordt</p>
      </div>
    </div>
  );
};

export default NotFound;
