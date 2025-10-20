import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Scissors, Clock } from "lucide-react";

const Services = () => {
  const services = [
    {
      name: "Classic Haircut",
      price: "R250",
      duration: "45 min",
      description: "Traditional scissor cut with clipper finish and styling",
    },
    {
      name: "Beard Trim & Shaping",
      price: "R150",
      duration: "30 min",
      description: "Professional beard grooming and shaping with hot towel treatment",
    },
    {
      name: "Hot Towel Shave",
      price: "R200",
      duration: "40 min",
      description: "Classic straight razor shave with pre-shave oil and aftershave balm",
    },
    {
      name: "Haircut & Beard Combo",
      price: "R350",
      duration: "1 hour",
      description: "Complete grooming package combining haircut and beard service",
    },
    {
      name: "Kids Haircut",
      price: "R180",
      duration: "30 min",
      description: "Professional haircut for children under 12 years",
    },
    {
      name: "Hair Coloring",
      price: "R400",
      duration: "1.5 hours",
      description: "Professional hair coloring service with premium products",
    },
    {
      name: "Scalp Treatment",
      price: "R300",
      duration: "45 min",
      description: "Revitalizing scalp massage and treatment",
    },
    {
      name: "Deluxe Grooming Package",
      price: "R600",
      duration: "2 hours",
      description: "Complete grooming experience: haircut, beard trim, hot towel shave, and scalp massage",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
            <Scissors className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="mb-6 text-gold">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Premium grooming services tailored to the modern gentleman
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card
                key={index}
                className="p-6 border-border bg-card hover:shadow-gold transition-smooth group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gold group-hover:text-gold-light transition-smooth">
                    {service.name}
                  </h3>
                  <span className="text-2xl font-bold text-gold">{service.price}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration}</span>
                </div>
                <p className="text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-gold">Ready to Book?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Schedule your appointment and experience our premium grooming services
          </p>
          <Link to="/booking">
            <Button variant="premium" size="lg" className="min-w-[250px]">
              Book Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
