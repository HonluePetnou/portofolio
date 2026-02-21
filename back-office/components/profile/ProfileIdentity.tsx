"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, User } from "lucide-react";
import { apiRequest } from "@/lib/api";

export function ProfileIdentity() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState({
    id: null as number | null,
    name: "",
    heroTitle: "",
    heroSubtitle: "",
    bioSummary: "",
    aboutText: "",
    profileImageUrl: "",
    cvUrl: "",
  });

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const data = await apiRequest("/profile");
      setProfile(data);
    } catch (err: any) {
      if (err.message.includes("not found")) {
        // Already initialized
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (profile.id) {
        await apiRequest("/profile", {
          method: "PATCH",
          body: JSON.stringify(profile),
        });
      } else {
        await apiRequest("/profile", {
          method: "POST",
          body: JSON.stringify(profile),
        });
      }
      alert("Identité mise à jour avec succès !");
    } catch (err) {
      console.error("Failed to save profile:", err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Identité Publique
          </CardTitle>
          <CardDescription>
            Ces informations seront affichées sur votre portfolio public.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  placeholder="Frederic Armel"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="heroTitle">Titre principal (Hero)</Label>
                <Input
                  id="heroTitle"
                  value={profile.heroTitle}
                  onChange={(e) =>
                    setProfile({ ...profile, heroTitle: e.target.value })
                  }
                  placeholder="Développeur Creative & Strategy"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="heroSubtitle">Soustitre (Hero)</Label>
              <Input
                id="heroSubtitle"
                value={profile.heroSubtitle}
                onChange={(e) =>
                  setProfile({ ...profile, heroSubtitle: e.target.value })
                }
                placeholder="Spécialisé en solutions digitales innovantes"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bioSummary">Résumé de la Bio</Label>
              <Textarea
                id="bioSummary"
                value={profile.bioSummary}
                onChange={(e) =>
                  setProfile({ ...profile, bioSummary: e.target.value })
                }
                placeholder="Courte bio pour la section accueil..."
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="aboutText">À Propos (Détaillé)</Label>
              <Textarea
                id="aboutText"
                value={profile.aboutText}
                onChange={(e) =>
                  setProfile({ ...profile, aboutText: e.target.value })
                }
                placeholder="Texte détaillé pour la page à propos..."
                className="min-h-[150px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="profileImageUrl">Photo de profil (URL)</Label>
                <Input
                  id="profileImageUrl"
                  value={profile.profileImageUrl || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, profileImageUrl: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvUrl">Lien du CV (URL)</Label>
                <Input
                  id="cvUrl"
                  value={profile.cvUrl || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, cvUrl: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                Enregistrer les modifications
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
