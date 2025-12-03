import Layout from "@/components/Layout";
import { useEffect, useState } from "react";

const Diner = () => {
  const [images, setImages] = useState<string[]>([]);

  const loadImages = () => {
    const savedImages = localStorage.getItem("menu_diner_images");
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    }
  };

  useEffect(() => {
    loadImages();
    
    // Listen for updates
    const handleStorageChange = () => {
      loadImages();
    };
    
    // Check for updates every second
    const interval = setInterval(() => {
      const lastUpdate = localStorage.getItem("menu_diner_updated");
      if (lastUpdate) {
        loadImages();
      }
    }, 1000);

    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Layout>
      <section className="py-20 bg-white min-h-[calc(100vh-320px)]">
        <div className="container mx-auto px-4">
          <h1 className="section-title text-center mb-12">Diner Menu</h1>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {images.length > 0 ? (
              images.map((image, index) => (
                <div key={index} className="w-full">
                  <img
                    src={image}
                    alt={`Diner menu ${index + 1}`}
                    className="w-full h-auto object-contain"
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>Geen diner menu foto's beschikbaar.</p>
                <p className="text-sm mt-2">Upload foto's via de admin pagina.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Diner;

