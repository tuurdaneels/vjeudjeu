import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { getImages } from "@/lib/supabaseStorage";
import { Loader2 } from "lucide-react";

const Lunch = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imageUrls = await getImages("lunch");
        setImages(imageUrls);
      } catch (error) {
        console.error("Error loading images:", error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  return (
    <Layout>
      <section className="py-20 bg-white min-h-[calc(100vh-320px)]">
        <div className="container mx-auto px-4">
          <h1 className="section-title text-center mb-12 text-black">Lunch Menu</h1>
          
          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Menu laden...</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              {images.length > 0 ? (
                images.map((image, index) => (
                  <div key={index} className="w-full">
                    <img
                      src={image}
                      alt={`Lunch menu ${index + 1}`}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Geen lunch menu foto's beschikbaar.</p>
                  <p className="text-sm mt-2">Upload foto's via de admin pagina.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Lunch;
