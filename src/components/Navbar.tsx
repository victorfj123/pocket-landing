
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAuthenticated = false; // This will be replaced with actual auth state

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navigationLinks = isAuthenticated ? [{
    name: "Dashboard",
    path: "/dashboard"
  }, {
    name: "Preview",
    path: "/preview"
  }] : [
  // Removed the Features link
  {
    name: "How It Works",
    path: "/#how-it-works"
  }, {
    name: "FAQ",
    path: "/#faq"
  }];

  // Handle smooth scrolling for hash links when on the home page
  const handleNavClick = (path: string, e: React.MouseEvent) => {
    closeMenu();

    // Check if it's a hash link and we're already on the home page
    if (path.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      const targetId = path.replace('/#', '');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  };
  return <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "py-2 bg-white/80 backdrop-blur-lg shadow-sm" : "py-4 bg-transparent"}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link to="/" className="flex flex-col items-start" onClick={closeMenu}>
          <span className="text-2xl font-semibold pocketcv-gradient-text">Pocket CV</span>
          
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {navigationLinks.map(link => <Link key={link.name} to={link.path} className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.path || location.hash === link.path.replace('/', '') ? "text-primary" : "text-muted-foreground"}`} onClick={e => handleNavClick(link.path, e)}>
                {link.name}
              </Link>)}
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            
            {isAuthenticated ? <Button variant="default" size="sm" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button> : <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button variant="default" size="sm" className="bg-pocketcv-orange hover:bg-pocketcv-orange/90 animate-pulse-slow" asChild>
                  <Link to="/get-started">Get Your PocketCV Card</Link>
                </Button>
              </>}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <LanguageSwitcher />
          <Button variant="ghost" size="icon" aria-label="Toggle Menu" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && <div className="fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur-sm animate-fadeIn md:hidden">
          <div className="container h-full flex flex-col gap-8 pt-16 pb-24">
            <div className="flex flex-col gap-4">
              {navigationLinks.map(link => <Link key={link.name} to={link.path} className="text-lg font-medium px-4 py-3 transition-colors hover:bg-secondary rounded-md" onClick={e => handleNavClick(link.path, e)}>
                  {link.name}
                </Link>)}
            </div>
            <div className="mt-auto space-y-4">
              {isAuthenticated ? <Button className="w-full" asChild>
                  <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
                </Button> : <>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/login" onClick={closeMenu}>Log in</Link>
                  </Button>
                  <Button className="w-full bg-pocketcv-orange hover:bg-pocketcv-orange/90" asChild>
                    <Link to="/get-started" onClick={closeMenu}>Get Your PocketCV Card</Link>
                  </Button>
                </>}
            </div>
          </div>
        </div>}
    </nav>;
};
export default Navbar;
