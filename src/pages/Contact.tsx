import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success("Message sent successfully!", {
      description: "We'll get back to you as soon as possible.",
    });

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
            <Mail className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="mb-6 text-gold">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get in touch with us for any inquiries or questions
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="p-6 border-border bg-card">
                <h3 className="text-2xl font-bold text-gold mb-6">Get In Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gold mb-1">Location</h4>
                      <p className="text-muted-foreground">
                        Mandela Square<br />
                        Sandton City<br />
                        Johannesburg, South Africa
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gold mb-1">Phone</h4>
                      <a href="tel:+27086666621" className="text-muted-foreground hover:text-gold transition-smooth">
                        +27 086 666 621
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gold mb-1">Email</h4>
                      <a href="mailto:info@gentlemensclub.co.za" className="text-muted-foreground hover:text-gold transition-smooth">
                        info@gentlemensclub.co.za
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gold mb-1">Opening Hours</h4>
                      <div className="text-muted-foreground space-y-1">
                        <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                        <p>Saturday: 9:00 AM - 5:00 PM</p>
                        <p>Sunday: 10:00 AM - 3:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="p-8 border-border bg-card">
              <h3 className="text-2xl font-bold text-gold mb-6">Send Us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gold">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gold">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-gold">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help you?"
                    className="mt-2 min-h-[150px]"
                    required
                  />
                </div>

                <Button type="submit" variant="premium" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
