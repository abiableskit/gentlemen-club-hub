import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingEmailRequest {
  name: string;
  email: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  phone: string;
  notes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, service, preferredDate, preferredTime, phone, notes }: BookingEmailRequest = await req.json();

    console.log("Sending booking confirmation email to:", email);

    const emailResponse = await resend.emails.send({
      from: "Gentlemen's Club Barber Shop <onboarding@resend.dev>",
      to: [email],
      subject: "Booking Confirmation - Gentlemen's Club Barber Shop",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #000000, #1a1a1a); color: #D4AF37; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
            .booking-details { background: #f9f9f9; padding: 20px; border-left: 4px solid #D4AF37; margin: 20px 0; }
            .footer { background: #f5f5f5; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #666; }
            h1 { margin: 0; font-size: 28px; }
            h2 { color: #D4AF37; margin-top: 0; }
            .detail-row { margin: 10px 0; }
            .label { font-weight: bold; color: #000; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🪒 Gentlemen's Club Barber Shop</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px;">Where Tradition Meets Excellence</p>
            </div>
            
            <div class="content">
              <h2>Thank you for your booking, ${name}!</h2>
              <p>We have received your booking request and will confirm your appointment shortly.</p>
              
              <div class="booking-details">
                <h3 style="margin-top: 0; color: #000;">Booking Details:</h3>
                <div class="detail-row">
                  <span class="label">Service:</span> ${service}
                </div>
                <div class="detail-row">
                  <span class="label">Preferred Date:</span> ${preferredDate}
                </div>
                <div class="detail-row">
                  <span class="label">Preferred Time:</span> ${preferredTime}
                </div>
                <div class="detail-row">
                  <span class="label">Phone:</span> ${phone}
                </div>
                ${notes ? `<div class="detail-row"><span class="label">Notes:</span> ${notes}</div>` : ''}
              </div>
              
              <p><strong>What's next?</strong></p>
              <ul>
                <li>We will review your booking request</li>
                <li>You will receive a confirmation call or email within 24 hours</li>
                <li>Please arrive 5 minutes before your scheduled time</li>
              </ul>
              
              <p>If you need to make any changes to your booking, please contact us:</p>
              <p>
                📍 Mandela Square, Sandton City<br>
                📞 +27 086 666 621<br>
                ✉️ gentlemensclub@gmail.com
              </p>
            </div>
            
            <div class="footer">
              <p>© ${new Date().getFullYear()} Gentlemen's Club Barber Shop. All rights reserved.</p>
              <p>Mandela Square, Sandton City | +27 086 666 621</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-booking-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
