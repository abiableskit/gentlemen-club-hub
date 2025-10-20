import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Scissors, Star, Clock, Award } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const Home = () => {
  const features = [
    {
      icon: Scissors,
      title: "Expert Barbers",
      description: "Skilled professionals with years of experience in classic and modern styles.",
    },
    {
      icon: Star,
      title: "Premium Service",
      description: "Luxury grooming experience with attention to every detail.",
    },
    {
      icon: Clock,
      title: "Flexible Hours",
      description: "Open 7 days a week to accommodate your busy schedule.",
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized for excellence in barbering and customer service.",
    },
  ];

  const testimonials = [
    {
      name: "Michael Thompson",
      rating: 5,
      text: "Best barbershop in Sandton! The attention to detail and premium atmosphere make every visit exceptional.",
    },
    {
      name: "David Nkosi",
      rating: 5,
      text: "Been coming here for 2 years. Always leave looking sharp and feeling confident. Highly recommended!",
    },
    {
      name: "James Wilson",
      rating: 5,
      text: "Professional service, great atmosphere, and skilled barbers. Worth every rand!",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 text-center px-4 fade-in">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold animate-pulse">
            <Scissors className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="mb-6 text-gold">
            Gentlemen's Club
            <span className="block text-3xl md:text-4xl text-foreground mt-2">Barber Shop</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Where Tradition Meets Excellence
          </p>
          <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
            Experience the finest in men's grooming at Sandton's premier barbershop
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button variant="premium" size="lg" className="min-w-[200px]">
                Book Appointment
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" size="lg" className="min-w-[200px]">
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-gold">Why Choose Us</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We combine traditional barbering techniques with modern styling to deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-gold transition-smooth border-border bg-background"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-gold flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-gold">What Our Clients Say</h2>
            <p className="text-muted-foreground text-lg">
              Join hundreds of satisfied gentlemen who trust us with their grooming
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 border-border bg-card">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                <p className="font-bold text-gold">- {testimonial.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-gold">Ready for Your Best Look?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book your appointment today and experience the premium grooming service you deserve
          </p>
          <Link to="/booking">
            <Button variant="premium" size="lg" className="min-w-[250px]">
              Schedule Your Visit
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
