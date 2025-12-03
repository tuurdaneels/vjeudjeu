import { Link } from "react-router-dom";
import Logo from "../assets/logo-white.png";
import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo */}
          <div>
          <Link to="/">
                <img src={Logo} alt="Vjeu Djeu" className="h-12 w-auto" />
              </Link>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-sans text-sm font-medium mb-4">Links</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2">
                <Link to="/reserveer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Reserveren
                </Link>
                <Link to="/slagerij" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Take-away
                </Link>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                <Link to="/menu" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Menu
                </Link>
                <Link to="/volg-ons" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Volg ons
                </Link>
                <Link to="/petit-djeu" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Petit d'jeu
                </Link>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-sm font-medium mb-4">Contact</h4>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <a href="tel:+3233377581" className="hover:text-foreground transition-colors">
                +32 (0)3 337 75 81
              </a>
              <a href="mailto:info@vjeudjeu.be" className="hover:text-foreground transition-colors">
                info@vjeudjeu.be
              </a>
              <p>Floralaan 79 – Marktplein</p>
              <p>2640 Mortsel</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-12 pt-6 border-t border-border gap-4">
          <p className="text-xs text-muted-foreground">© 2025 Vjeu-Djeu</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link to="/algemene-voorwaarden" className="hover:text-foreground transition-colors">
              Algemene voorwaarden
            </Link>
            <span>/</span>
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacybeleid
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://brandvisionx.be" className="text-xs text-muted-foreground">Made with ♥ by BrandvisionX</a>
            <a
              href="https://instagram.com/vjeudjeu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-muted-foreground transition-colors"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
