import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo-white.png";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/menu", label: "MENU" },
  { href: "/feestzaal", label: "FEESTZAAL" },
  { href: "/faq", label: "VEELGESTELDE VRAGEN" },
  { href: "/volg-ons", label: "VOLG ONS" },
];

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHomePage = location.pathname === "/";
  const isMenuPage = location.pathname === "/menu";
  const isFAQPage = location.pathname === "/faq";
  const isReserveerPage = location.pathname === "/reserveer";
  const isLunchPage = location.pathname === "/lunch";
  const isDinerPage = location.pathname === "/diner";
  const isSuggestiesPage = location.pathname === "/suggesties";
  const isFeestzaalPage = location.pathname === "/feestzaal" || location.pathname === "/petit-djeu";
  const isFormPage = location.pathname === "/op-maat-voorstel";
  
  const hasTransparentHeader = isHomePage || isMenuPage || isFAQPage || isReserveerPage;
  const hasWhiteHeader = isLunchPage || isDinerPage || isSuggestiesPage || isFeestzaalPage || isFormPage;

  return (
    <>
      {/* Main Header - transparent pages overlay content like the home hero */}
      <header className={cn(
        "transition-colors z-50",
        hasTransparentHeader
          ? "absolute top-0 left-0 right-0 bg-transparent"
          : hasWhiteHeader
          ? "bg-white relative"
          : "bg-background/95 relative"
      )}>
        <div className=" mx-auto pb-4 lg:pb-2">
          <div className="announcement-bar text-[12px] md:text-[14px] py-[5px]">
            Onze Winterstübe komt eraan … én het wildseizoen start weer!
          </div>
          <div className="relative flex items-center pt-3 lg:pt-2">
            {/* Left side - Empty for spacing */}
            <div className="flex-1 flex items-center">
            </div>

            {/* Logo - Absolutely centered */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link to="/">
                <img 
                  src={Logo} 
                  alt="Vjeu Djeu" 
                  className={cn(
                    "h-12 w-auto",
                    hasWhiteHeader && "brightness-0"
                  )} 
                />
              </Link>
            </div>

            {/* Right side - CTA Buttons and Mobile Menu */}
            <div className="flex-1 flex items-center justify-end">
              <div className="hidden lg:flex items-center gap-3 px-4">
                <Link 
                  to="/reserveer" 
                  className={hasWhiteHeader ? "btn-filled-inverse" : "btn-filled"}
                >
                  Reserveer
                </Link>
                <Link 
                  to="https://resto-online.be/vjeudjeu" 
                  className={hasWhiteHeader ? "btn-filled-inverse" : "btn-filled"}
                >
                  Feestmenu's & Take-away
                </Link>
              </div>
              {/* Mobile Menu Button - Right side */}
              <button
                className={cn(
                  "lg:hidden px-4",
                  hasWhiteHeader ? "text-black" : "text-foreground"
                )}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className={cn(
            "hidden lg:flex justify-center gap-8 mt-2 py-4",
            hasWhiteHeader 
              ? "border-y border-black/20" 
              : "border-y border-white border-opacity-20"
          )}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "nav-link",
                    hasWhiteHeader && "text-black hover:text-black/80",
                    hasWhiteHeader && isActive && "text-black [&::after]:bg-black",
                    !hasWhiteHeader && isActive && "active"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className={cn(
            "lg:hidden absolute top-full left-0 right-0 border-t py-4",
            hasWhiteHeader 
              ? "bg-white border-black/20" 
              : "bg-background/95 border-border"
          )}>
            <div className="container mx-auto px-4 flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "nav-link py-2",
                      hasWhiteHeader && "text-black hover:text-black/80",
                      hasWhiteHeader && isActive && "text-black [&::after]:bg-black",
                      !hasWhiteHeader && isActive && "active"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className={cn(
                "flex flex-col gap-3 mt-4 pt-3 border-t",
                hasWhiteHeader ? "border-black/20" : "border-border"
              )}>
                <Link 
                  to="/reserveer" 
                  className={cn(
                    "text-center",
                    hasWhiteHeader ? "btn-filled-inverse" : "btn-filled"
                  )}
                >
                  Reserveer
                </Link>
                <Link 
                  to="https://resto-online.be/vjeudjeu" 
                  className={cn(
                    "text-center",
                    hasWhiteHeader ? "btn-filled-inverse" : "btn-filled"
                  )}
                >
                  Feestmenu's & Take-away
                </Link>
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
