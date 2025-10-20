import { Card } from "@/components/ui/card";
import { Users, Star } from "lucide-react";

const Staff = () => {
  const staff = [
    {
      name: "Marcus Johnson",
      role: "Master Barber",
      experience: "15 years",
      specialty: "Classic cuts and hot towel shaves",
      bio: "Marcus brings traditional barbering techniques combined with modern styling expertise.",
    },
    {
      name: "Thabo Mokoena",
      role: "Senior Barber",
      experience: "10 years",
      specialty: "Fades and contemporary styles",
      bio: "Thabo specializes in precision fades and modern urban hairstyles.",
    },
    {
      name: "David Chen",
      role: "Barber & Stylist",
      experience: "8 years",
      specialty: "Beard grooming and coloring",
      bio: "David is our go-to expert for beard sculpting and hair coloring services.",
    },
    {
      name: "James Williams",
      role: "Junior Barber",
      experience: "3 years",
      specialty: "Kids cuts and basic styling",
      bio: "James brings youthful energy and is great with younger clients.",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
            <Users className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="mb-6 text-gold">Meet Our Team</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Skilled professionals dedicated to making you look and feel your best
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {staff.map((member, index) => (
              <Card
                key={index}
                className="p-8 border-border bg-card hover:shadow-gold transition-smooth"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                    <Users className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gold mb-1">{member.name}</h3>
                    <p className="text-muted-foreground font-medium">{member.role}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-gold" />
                    <span className="text-sm text-muted-foreground">
                      Experience: <span className="text-foreground">{member.experience}</span>
                    </span>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gold mb-1">Specialty:</p>
                    <p className="text-sm text-muted-foreground">{member.specialty}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground italic">{member.bio}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Staff;
