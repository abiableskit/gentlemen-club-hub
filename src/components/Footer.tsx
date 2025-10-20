import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Scissors } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                <Scissors className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-bold text-gold">Gentlemen's Club</div>
                <div className="text-xs text-muted-foreground">Barber Shop</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium grooming services for the modern gentleman.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-sm text-muted-foreground hover:text-gold transition-smooth">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm text-muted-foreground hover:text-gold transition-smooth">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/staff" className="text-sm text-muted-foreground hover:text-gold transition-smooth">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-sm text-muted-foreground hover:text-gold transition-smooth">
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-4 text-gold">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span>Mandela Square, Sandton City, Johannesburg</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="tel:+27086666621" className="hover:text-gold transition-smooth">
                  +27 086 666 621
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="mailto:gentlemensclub@gmail.com" className="hover:text-gold transition-smooth">
                  gentlemensclub@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-bold mb-4 text-gold">Opening Hours</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex justify-between">
                <span>Mon - Fri:</span>
                <span className="text-foreground">9:00 - 19:00</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span className="text-foreground">9:00 - 17:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-foreground">10:00 - 15:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Gentlemen's Club Barber Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
