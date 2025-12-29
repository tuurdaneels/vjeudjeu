import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Upload, LogOut, Loader2 } from "lucide-react";
import { uploadMultipleImages, getImages, deleteImage, type MenuCategory } from "@/lib/supabaseStorage";
import { supabase } from "@/lib/supabase";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lunchImages, setLunchImages] = useState<string[]>([]);
  const [dinerImages, setDinerImages] = useState<string[]>([]);
  const [suggestiesImages, setSuggestiesImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check Supabase session & listen to auth changes
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (mounted && session) {
        setIsAuthenticated(true);
        loadImages();
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      if (session) {
        setIsAuthenticated(true);
        loadImages();
      } else {
        setIsAuthenticated(false);
      }
    });

    init();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const loadImages = async () => {
    setLoading(true);
    try {
      const [lunch, diner, suggesties] = await Promise.all([
        getImages("lunch"),
        getImages("diner"),
        getImages("suggesties"),
      ]);
      setLunchImages(lunch);
      setDinerImages(diner);
      setSuggestiesImages(suggesties);
    } catch (error) {
      console.error("Error loading images:", error);
      alert("Fout bij het laden van foto's");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert("Vul een e-mailadres in");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(`Inloggen mislukt: ${error.message}`);
      return;
    }

    setIsAuthenticated(true);
    await loadImages();
    setPassword("");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  const handleImageUpload = async (
    category: MenuCategory,
    files: FileList | null
  ) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const fileArray = Array.from(files);
      const urls = await uploadMultipleImages(fileArray, category);
      
      // Update state
      if (category === "lunch") {
        setLunchImages((prev) => [...prev, ...urls]);
      } else if (category === "diner") {
        setDinerImages((prev) => [...prev, ...urls]);
      } else if (category === "suggesties") {
        setSuggestiesImages((prev) => [...prev, ...urls]);
      }
      
      alert(`${fileArray.length} foto('s) succesvol geüpload!`);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Fout bij het uploaden van foto's");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async (
    category: MenuCategory,
    index: number
  ) => {
    let images: string[] = [];
    let imageUrl: string = "";

    if (category === "lunch") {
      images = [...lunchImages];
      imageUrl = images[index];
    } else if (category === "diner") {
      images = [...dinerImages];
      imageUrl = images[index];
    } else if (category === "suggesties") {
      images = [...suggestiesImages];
      imageUrl = images[index];
    }

    if (!confirm("Weet je zeker dat je deze foto wilt verwijderen?")) {
      return;
    }

    try {
      await deleteImage(imageUrl);
      images.splice(index, 1);

      if (category === "lunch") {
        setLunchImages(images);
      } else if (category === "diner") {
        setDinerImages(images);
      } else if (category === "suggesties") {
        setSuggestiesImages(images);
      }

      alert("Foto verwijderd!");
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Fout bij het verwijderen van de foto");
    }
  };

  const handlePublish = (category: MenuCategory) => {
    alert(`${category.charAt(0).toUpperCase() + category.slice(1)} menu is gepubliceerd!`);
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
                  type="email"
                  placeholder="E-mailadres"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  autoComplete="username"
                />
                <Input
                  type="password"
                  placeholder="Wachtwoord"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                  autoComplete="current-password"
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

  if (loading) {
    return (
      <Layout>
        <section className="py-20 bg-background min-h-[calc(100vh-320px)] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Foto's laden...</p>
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
                    disabled={uploading}
                  />
                  {uploading && (
                    <p className="text-sm text-muted-foreground mt-2">
                      <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
                      Uploaden...
                    </p>
                  )}
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
                    disabled={uploading}
                  />
                  {uploading && (
                    <p className="text-sm text-muted-foreground mt-2">
                      <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
                      Uploaden...
                    </p>
                  )}
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
                    disabled={uploading}
                  />
                  {uploading && (
                    <p className="text-sm text-muted-foreground mt-2">
                      <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
                      Uploaden...
                    </p>
                  )}
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
