import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "Do I need an appointment?",
      answer: "While walk-ins are welcome subject to availability, we highly recommend booking an appointment to ensure you get your preferred time slot and barber."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash, all major credit/debit cards, and contactless payments including Apple Pay and Google Pay."
    },
    {
      question: "What is your cancellation policy?",
      answer: "We require at least 24 hours notice for cancellations. Late cancellations or no-shows may be subject to a cancellation fee."
    },
    {
      question: "How long does each service take?",
      answer: "Service duration varies: Haircuts typically take 45 minutes, beard trims 30 minutes, and our Deluxe Grooming Package takes about 2 hours. Exact timing is listed with each service."
    },
    {
      question: "Do you offer services for children?",
      answer: "Yes! We offer specialized kids' haircuts for children under 12 years old at R180. Our barbers are experienced in working with children."
    },
    {
      question: "What products do you use?",
      answer: "We use only premium grooming products from leading brands to ensure the best results for our clients."
    },
    {
      question: "Can I request a specific barber?",
      answer: "Absolutely! When booking your appointment, you can request your preferred barber. We'll do our best to accommodate your request based on availability."
    },
    {
      question: "Do you offer gift vouchers?",
      answer: "Yes, gift vouchers are available for any amount or specific services. Contact us directly or visit our shop to purchase."
    },
    {
      question: "Is parking available?",
      answer: "Yes, we're located in Mandela Square, Sandton City, which offers ample secure parking for our customers."
    },
    {
      question: "What safety measures do you have in place?",
      answer: "We maintain the highest hygiene standards with sterilized tools, clean workstations, and professional practices to ensure your safety and comfort."
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
            <HelpCircle className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="mb-6 text-gold">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our services and barbershop
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-2 border-border bg-card rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left hover:text-gold transition-smooth py-6">
                    <span className="font-bold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-gold mb-4">Still Have Questions?</h3>
          <p className="text-muted-foreground mb-6">
            Feel free to reach out to us directly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+27086666621" className="text-gold hover:text-gold-light transition-smooth">
              Call: +27 086 666 621
            </a>
            <span className="hidden sm:inline text-muted-foreground">|</span>
            <a href="mailto:info@gentlemensclub.co.za" className="text-gold hover:text-gold-light transition-smooth">
              Email: info@gentlemensclub.co.za
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
