"use client";

import { ProfileIdentity } from "@/components/profile/ProfileIdentity";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function IdentityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Mon Identité & Paramètres
        </h2>
        <p className="text-muted-foreground">
          Gérez vos informations personnelles et les réglages de votre compte.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProfileIdentity />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de visibilité</CardTitle>
              <CardDescription>
                Contrôlez la visibilité de votre profil.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Profil Public</Label>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded text-sm font-medium">
                  Activé
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label>Notifications</Label>
                <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded text-sm font-medium">
                  Activées
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" className="w-full">
                Déconnexion de tous les appareils
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
