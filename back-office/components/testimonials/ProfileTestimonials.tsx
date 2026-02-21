"use client";

import { useEffect, useState, useCallback } from "react";
import { AvatarUpload } from "@/components/shared/AvatarUpload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  MessageSquare,
  Star,
  Trash2,
  Pencil,
  Loader2,
  Users,
  UserCircle,
  ShieldCheck,
} from "lucide-react";
import { apiRequest } from "@/lib/api";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  imageUrl?: string | null;
  linkedinUrl?: string | null;
  userId?: number;
}

type Tab = "mine" | "all";

const emptyForm = {
  id: null as number | null,
  name: "",
  role: "",
  company: "",
  content: "",
  rating: 5,
  imageUrl: null as string | null,
  linkedinUrl: null as string | null,
};

export function ProfileTestimonials() {
  const [activeTab, setActiveTab] = useState<Tab>("mine");
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null); // null = not checked yet

  const [myTestimonials, setMyTestimonials] = useState<Testimonial[]>([]);
  const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>([]);

  const [isLoadingMine, setIsLoadingMine] = useState(true);
  const [isLoadingAll, setIsLoadingAll] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  // Tracks whether the current edit was started from the admin 'all' tab
  const [editingAsAdmin, setEditingAsAdmin] = useState(false);

  // ── Fetch: current user's own testimonials ──────────────────────────────────
  const fetchMine = useCallback(async () => {
    setIsLoadingMine(true);
    try {
      const data = await apiRequest("/testimonials/me");
      setMyTestimonials(data);
    } catch (err) {
      console.error("Failed to fetch my testimonials:", err);
    } finally {
      setIsLoadingMine(false);
    }
  }, []);

  // ── Fetch: all testimonials (admin) ─────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    setIsLoadingAll(true);
    try {
      const data = await apiRequest("/testimonials/all");
      setAllTestimonials(data);
      setIsAdmin(true);
    } catch (err: any) {
      // 403 means not an admin — hide the tab silently
      if (err?.message?.includes("Admin") || err?.message?.includes("403")) {
        setIsAdmin(false);
      } else {
        console.error("Failed to fetch all testimonials:", err);
      }
    } finally {
      setIsLoadingAll(false);
    }
  }, []);

  // On mount: load mine + probe admin access in parallel
  useEffect(() => {
    fetchMine();
    fetchAll();
  }, [fetchMine, fetchAll]);

  // ── CRUD handlers ───────────────────────────────────────────────────────────
  const resetForm = () => setFormData(emptyForm);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Normalise: send null instead of empty string for optional URL fields
    const payload = {
      ...formData,
      imageUrl: formData.imageUrl || null,
      linkedinUrl: formData.linkedinUrl || null,
      company: formData.company || null,
    };

    try {
      if (formData.id) {
        // Use admin route if editing from the admin tab (bypasses ownership check)
        const patchUrl = editingAsAdmin
          ? `/testimonials/admin/${formData.id}`
          : `/testimonials/${formData.id}`;
        await apiRequest(patchUrl, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      } else {
        await apiRequest("/testimonials", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      setIsDialogOpen(false);
      resetForm();
      setEditingAsAdmin(false);
      fetchMine();
      if (isAdmin) fetchAll();
    } catch (err) {
      console.error("Failed to save testimonial:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (t: Testimonial, asAdmin = false) => {
    setEditingAsAdmin(asAdmin);
    setFormData({
      id: t.id,
      name: t.name,
      role: t.role,
      company: t.company || "",
      content: t.content,
      rating: t.rating,
      imageUrl: t.imageUrl || null,
      linkedinUrl: t.linkedinUrl || null,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number, asAdmin = false) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce témoignage ?")) return;
    try {
      const deleteUrl = asAdmin
        ? `/testimonials/admin/${id}`
        : `/testimonials/${id}`;
      await apiRequest(deleteUrl, { method: "DELETE" });
      fetchMine();
      if (isAdmin) fetchAll();
    } catch (err) {
      console.error("Failed to delete testimonial:", err);
    }
  };

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const StarRow = ({ count }: { count: number }) => (
    <div className="flex text-yellow-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${i < count ? "fill-current" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  );

  const TestimonialCard = ({
    t,
    canEdit,
    asAdmin = false,
  }: {
    t: Testimonial;
    canEdit: boolean;
    asAdmin?: boolean;
  }) => {
    const [imgError, setImgError] = useState(false);

    return (
      <Card className="relative flex flex-col">
        <CardHeader className="flex flex-row items-start gap-3 pb-2">
          <div className="h-11 w-11 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 overflow-hidden shrink-0 border-2 border-indigo-100 text-sm">
            {t.imageUrl && !imgError ? (
              <img
                src={t.imageUrl}
                alt={t.name}
                className="h-full w-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <span>{t.name.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm truncate">{t.name}</CardTitle>
              {isAdmin && activeTab === "all" && t.userId && (
                <Badge variant="outline" className="text-[9px] shrink-0">
                  uid:{t.userId}
                </Badge>
              )}
            </div>
            <CardDescription className="truncate text-xs">
              {t.role}
              {t.company ? ` · ${t.company}` : ""}
            </CardDescription>
            <StarRow count={t.rating} />
          </div>
          {t.linkedinUrl && (
            <a
              href={t.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] text-indigo-600 hover:underline shrink-0 mt-1"
            >
              LinkedIn ↗
            </a>
          )}
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          <p className="text-sm text-muted-foreground italic line-clamp-4 flex-1">
            &ldquo;{t.content}&rdquo;
          </p>

          {canEdit && (
            <div className="mt-4 flex items-center justify-end gap-1 border-t pt-3">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-muted-foreground hover:text-foreground text-xs"
                onClick={() => handleEdit(t, asAdmin)}
              >
                <Pencil className="h-3.5 w-3.5 mr-1" /> Modifier
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-muted-foreground hover:text-destructive text-xs"
                onClick={() => handleDelete(t.id, asAdmin)}
              >
                <Trash2 className="h-3.5 w-3.5 mr-1" /> Supprimer
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const EmptyState = ({ onAdd }: { onAdd?: () => void }) => (
    <Card className="border-dashed col-span-full">
      <CardContent className="flex flex-col items-center justify-center py-14 text-center">
        <MessageSquare className="h-12 w-12 text-muted-foreground/20 mb-4" />
        <p className="text-muted-foreground font-medium">
          Aucun témoignage trouvé.
        </p>
        {onAdd && (
          <Button
            variant="link"
            onClick={onAdd}
            className="mt-2 text-indigo-600"
          >
            Ajoutez votre premier témoignage
          </Button>
        )}
      </CardContent>
    </Card>
  );

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-lg font-medium">Témoignages</h3>
          <p className="text-sm text-muted-foreground">
            Gérez les retours et recommandations de vos clients.
          </p>
        </div>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={resetForm} size="sm">
              <Plus className="mr-2 h-4 w-4" /> Ajouter un témoignage
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {formData.id
                  ? "Modifier le témoignage"
                  : "Ajouter un témoignage"}
              </DialogTitle>
              <DialogDescription>
                Remplissez les informations ci-dessous.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                {/* Avatar upload + name/role in one row */}
                <div className="flex gap-4 items-start">
                  <div className="shrink-0">
                    <Label className="text-xs mb-1.5 block">Photo</Label>
                    <AvatarUpload
                      value={formData.imageUrl ?? ""}
                      onChange={(url) =>
                        setFormData({ ...formData, imageUrl: url || null })
                      }
                      folder="testimonials"
                      variant="avatar"
                    />
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Jean Dupont"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="form-role">Poste</Label>
                      <Input
                        id="form-role"
                        value={formData.role}
                        onChange={(e) =>
                          setFormData({ ...formData, role: e.target.value })
                        }
                        placeholder="Directeur Technique"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="company">Entreprise</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      placeholder="Soluty Studio"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="rating">Note (1-5)</Label>
                    <Input
                      id="rating"
                      type="number"
                      min="1"
                      max="5"
                      value={formData.rating}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rating: parseInt(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="linkedin_url">Lien LinkedIn</Label>
                  <Input
                    id="linkedin_url"
                    value={formData.linkedinUrl ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        linkedinUrl: e.target.value || null,
                      })
                    }
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="content">Témoignage</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    placeholder="Votre expérience avec..."
                    className="min-h-[100px]"
                    required
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Annuler
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {formData.id ? "Mettre à jour" : "Enregistrer"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs — only show "Tous" tab when admin access is confirmed */}
      <div className="flex gap-1 border-b pb-0">
        <button
          onClick={() => setActiveTab("mine")}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
            activeTab === "mine"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <UserCircle className="h-4 w-4" />
          Mes témoignages
          {myTestimonials.length > 0 && (
            <Badge variant="secondary" className="text-[10px] h-4 px-1">
              {myTestimonials.length}
            </Badge>
          )}
        </button>

        {isAdmin && (
          <button
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === "all"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            Tous les témoignages
            {allTestimonials.length > 0 && (
              <Badge variant="secondary" className="text-[10px] h-4 px-1">
                {allTestimonials.length}
              </Badge>
            )}
          </button>
        )}
      </div>

      {/* Tab content */}
      {activeTab === "mine" && (
        <>
          {isLoadingMine ? (
            <div className="flex justify-center py-14 flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground italic">
                Chargement...
              </p>
            </div>
          ) : myTestimonials.length === 0 ? (
            <div className="grid">
              <EmptyState onAdd={() => setIsDialogOpen(true)} />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {myTestimonials.map((t) => (
                <TestimonialCard key={t.id} t={t} canEdit={true} />
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === "all" && isAdmin && (
        <>
          {isLoadingAll ? (
            <div className="flex justify-center py-14 flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground italic">
                Chargement de tous les témoignages...
              </p>
            </div>
          ) : allTestimonials.length === 0 ? (
            <div className="grid">
              <EmptyState />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2">
                <Users className="h-3.5 w-3.5" />
                <span>
                  <strong>{allTestimonials.length}</strong> témoignage
                  {allTestimonials.length > 1 ? "s" : ""} au total sur tous les
                  comptes.
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {allTestimonials.map((t) => (
                  <TestimonialCard
                    key={t.id}
                    t={t}
                    canEdit={true}
                    asAdmin={true}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
