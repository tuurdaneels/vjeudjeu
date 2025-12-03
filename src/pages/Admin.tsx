import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Upload, LogOut } from "lucide-react";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [lunchImages, setLunchImages] = useState<string[]>([]);
  const [dinerImages, setDinerImages] = useState<string[]>([]);
  const [suggestiesImages, setSuggestiesImages] = useState<string[]>([]);

  // Check if already logged in
  useEffect(() => {
    const authStatus = localStorage.getItem("admin_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      loadImages();
    }
  }, []);

  const loadImages = () => {
    const lunch = localStorage.getItem("menu_lunch_images");
    const diner = localStorage.getItem("menu_diner_images");
    const suggesties = localStorage.getItem("menu_suggesties_images");
    
    if (lunch) setLunchImages(JSON.parse(lunch));
    if (diner) setDinerImages(JSON.parse(diner));
    if (suggesties) setSuggestiesImages(JSON.parse(suggesties));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Get password from environment variable
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";
    
    if (password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("admin_authenticated", "true");
      loadImages();
    } else {
      alert("Onjuist wachtwoord");
    }
    setPassword("");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_authenticated");
  };

  const handleImageUpload = (category: "lunch" | "diner" | "suggesties", files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newImages: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        newImages.push(result);
        
        if (newImages.length === files.length) {
          const storageKey = `menu_${category}_images`;
          const existingImages = localStorage.getItem(storageKey);
          const allImages = existingImages 
            ? [...JSON.parse(existingImages), ...newImages]
            : newImages;
          
          localStorage.setItem(storageKey, JSON.stringify(allImages));
          
          // Update state
          if (category === "lunch") setLunchImages(allImages);
          if (category === "diner") setDinerImages(allImages);
          if (category === "suggesties") setSuggestiesImages(allImages);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (category: "lunch" | "diner" | "suggesties", index: number) => {
    const storageKey = `menu_${category}_images`;
    let images: string[] = [];
    
    if (category === "lunch") images = [...lunchImages];
    if (category === "diner") images = [...dinerImages];
    if (category === "suggesties") images = [...suggestiesImages];
    
    images.splice(index, 1);
    localStorage.setItem(storageKey, JSON.stringify(images));
    
    if (category === "lunch") setLunchImages(images);
    if (category === "diner") setDinerImages(images);
    if (category === "suggesties") setSuggestiesImages(images);
  };

  const handlePublish = (category: "lunch" | "diner" | "suggesties") => {
    // Images are already saved in localStorage, just show confirmation
    alert(`${category.charAt(0).toUpperCase() + category.slice(1)} menu is gepubliceerd!`);
    // Trigger page reload on menu pages by updating a timestamp
    localStorage.setItem(`menu_${category}_updated`, Date.now().toString());
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <section className="py-20 bg-background min-h-[calc(100vh-320px)] flex items-center justify-center">
          <div className="max-w-md w-full mx-auto px-4">
            <div className="bg-card border border-border rounded-lg p-8">
              <h1 className="section-title text-center mb-6">Admin Login</h1>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="password"
                  placeholder="Wachtwoord"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
                <Button type="submit" className="w-full">
                  Inloggen
                </Button>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20 bg-background min-h-[calc(100vh-320px)]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="section-title">Admin Dashboard</h1>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Uitloggen
            </Button>
          </div>

          <Tabs defaultValue="lunch" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="lunch">Lunch</TabsTrigger>
              <TabsTrigger value="diner">Diner</TabsTrigger>
              <TabsTrigger value="suggesties">Suggesties</TabsTrigger>
            </TabsList>

            <TabsContent value="lunch" className="space-y-6 mt-6">
              <div className="border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Lunch Menu Foto's</h2>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium">
                    Foto's uploaden
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload("lunch", e.target.files)}
                    className="cursor-pointer"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 mt-6">
                  {lunchImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Lunch ${index + 1}`}
                        className="w-full h-auto rounded-lg"
                      />
                      <button
                        onClick={() => handleRemoveImage("lunch", index)}
                        className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                {lunchImages.length > 0 && (
                  <Button
                    onClick={() => handlePublish("lunch")}
                    className="mt-6 w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Publiceer Lunch Menu
                  </Button>
                )}
              </div>
            </TabsContent>

            <TabsContent value="diner" className="space-y-6 mt-6">
              <div className="border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Diner Menu Foto's</h2>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium">
                    Foto's uploaden
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload("diner", e.target.files)}
                    className="cursor-pointer"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 mt-6">
                  {dinerImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Diner ${index + 1}`}
                        className="w-full h-auto rounded-lg"
                      />
                      <button
                        onClick={() => handleRemoveImage("diner", index)}
                        className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                {dinerImages.length > 0 && (
                  <Button
                    onClick={() => handlePublish("diner")}
                    className="mt-6 w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Publiceer Diner Menu
                  </Button>
                )}
              </div>
            </TabsContent>

            <TabsContent value="suggesties" className="space-y-6 mt-6">
              <div className="border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Suggesties Foto's</h2>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium">
                    Foto's uploaden
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload("suggesties", e.target.files)}
                    className="cursor-pointer"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 mt-6">
                  {suggestiesImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Suggestie ${index + 1}`}
                        className="w-full h-auto rounded-lg"
                      />
                      <button
                        onClick={() => handleRemoveImage("suggesties", index)}
                        className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                {suggestiesImages.length > 0 && (
                  <Button
                    onClick={() => handlePublish("suggesties")}
                    className="mt-6 w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Publiceer Suggesties
                  </Button>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;

