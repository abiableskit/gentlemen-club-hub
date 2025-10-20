import { Camera } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

const Gallery = () => {
  const images = [
    { src: gallery1, alt: "Luxury barbershop interior with classic chair and gold mirror" },
    { src: gallery2, alt: "Premium grooming tools and accessories" },
    { src: gallery3, alt: "Professional barber giving precision haircut" },
    { src: gallery1, alt: "Elegant barber station" },
    { src: gallery2, alt: "Professional grooming tools" },
    { src: gallery3, alt: "Expert barbering service" },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
            <Camera className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="mb-6 text-gold">Gallery</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our premium barbershop and see the quality of our work
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg aspect-[4/3] border-2 border-border hover:border-gold transition-smooth cursor-pointer"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                  <Camera className="w-12 h-12 text-gold" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
