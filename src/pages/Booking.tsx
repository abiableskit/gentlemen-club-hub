import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { bookingSchema, sanitizeForEmail } from "@/lib/validation";

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const services = [
    "Classic Haircut - R250",
    "Beard Trim & Shaping - R150",
    "Hot Towel Shave - R200",
    "Haircut & Beard Combo - R350",
    "Kids Haircut - R180",
    "Hair Coloring - R400",
    "Scalp Treatment - R300",
    "Deluxe Grooming Package - R600",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate with Zod schema
      const validationResult = bookingSchema.safeParse({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        service: formData.service,
        preferred_date: formData.date,
        preferred_time: formData.time,
        notes: formData.notes.trim()
      });

      if (!validationResult.success) {
        const firstError = validationResult.error.errors[0];
        toast.error(firstError.message);
        setIsLoading(false);
        return;
      }

      const validatedData = validationResult.data;

      // Extract price from service string
      const priceMatch = validatedData.service.match(/R(\d+)/);
      const amount = priceMatch ? parseInt(priceMatch[1]) : 0;

      // Get current user session for authentication
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Please sign in to make a booking");
        setIsLoading(false);
        return;
      }

      // Save booking to database with validated data
      const { data: booking, error: dbError } = await supabase
        .from('bookings')
        .insert([
          {
            name: validatedData.name,
            phone: validatedData.phone,
            email: validatedData.email,
            service: validatedData.service,
            preferred_date: validatedData.preferred_date,
            preferred_time: validatedData.preferred_time,
            notes: validatedData.notes || null,
            payment_status: 'pending',
            payment_amount: amount,
          }
        ])
        .select()
        .single();

      if (dbError) {
        console.error("Database error:", dbError);
        toast.error("Failed to submit booking. Please try again.");
        setIsLoading(false);
        return;
      }

      console.log("Booking saved:", booking);

      // Create Stripe checkout session with authentication
      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke(
        'create-stripe-checkout',
        {
          body: {
            bookingId: booking.id,
            amount: amount,
            customerEmail: validatedData.email,
            customerName: validatedData.name,
            service: validatedData.service,
          },
          headers: {
            Authorization: `Bearer ${session.access_token}`
          }
        }
      );

      if (checkoutError || !checkoutData?.url) {
        console.error("Checkout error:", checkoutError);
        toast.error("Failed to create payment session. Please try again.");
        setIsLoading(false);
        return;
      }

      // Update booking with Stripe session ID
      await supabase
        .from('bookings')
        .update({ stripe_session_id: checkoutData.sessionId })
        .eq('id', booking.id);

      // Send confirmation email with authentication and sanitized data
      const { error: emailError } = await supabase.functions.invoke('send-booking-confirmation', {
        body: {
          name: sanitizeForEmail(validatedData.name),
          email: validatedData.email,
          service: validatedData.service,
          preferredDate: validatedData.preferred_date,
          preferredTime: validatedData.preferred_time,
          phone: sanitizeForEmail(validatedData.phone),
          notes: validatedData.notes ? sanitizeForEmail(validatedData.notes) : undefined,
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (emailError) {
        console.error("Email error:", emailError);
      }

      // Redirect to Stripe checkout
      toast.success("Redirecting to payment...");
      window.location.href = checkoutData.url;
      
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
            <Calendar className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="mb-6 text-gold">Book Your Appointment</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Schedule your visit to Sandton's premier barbershop
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto p-8 border-border bg-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gold">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="mt-2"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-gold">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+27 123 456 789"
                      className="mt-2"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gold">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="mt-2"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <Label htmlFor="service" className="text-gold">Select Service *</Label>
                <Select 
                  value={formData.service} 
                  onValueChange={(value) => setFormData({ ...formData, service: value })}
                  disabled={isLoading}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-gold flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Preferred Date *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="mt-2"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="time" className="text-gold flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Preferred Time *
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="mt-2"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <Label htmlFor="notes" className="text-gold">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any specific requests or preferences... (max 500 characters)"
                  className="mt-2 min-h-[100px]"
                  maxLength={500}
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.notes.length}/500 characters
                </p>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                variant="premium" 
                size="lg" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Request Booking"}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                * Secure payment required to confirm your booking
              </p>
            </form>
          </Card>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h3 className="text-2xl font-bold text-gold mb-4">Booking Information</h3>
          <div className="space-y-2 text-muted-foreground">
            <p>• We'll contact you within 24 hours to confirm your appointment</p>
            <p>• Please arrive 5 minutes before your scheduled time</p>
            <p>• Cancellations require 24 hours notice</p>
            <p>• Walk-ins welcome subject to availability</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;