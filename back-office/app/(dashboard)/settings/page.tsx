"use client";

import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiRequest } from "@/lib/api";
import { 
  Settings as SettingsIcon, 
  User, 
  Key, 
  Mail, 
  Bot, 
  Shield, 
  Check, 
  Eye, 
  EyeOff,
  Save,
  RefreshCw
} from "lucide-react";

interface SettingsData {
  aiProvider: string | null;
  emailProvider: string | null;
  notificationEmail: string | null;
  aiApiKey: { configured: boolean };
  emailApiKey: { configured: boolean };
}

interface SettingsUpdate {
  aiProvider?: string;
  aiApiKey?: string;
  emailProvider?: string;
  emailApiKey?: string;
  notificationEmail?: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState<"ai" | "email" | null>(null);
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<SettingsUpdate>({});

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await apiRequest("/settings");
      setSettings(data);
      setFormData({
        aiProvider: data.aiProvider || undefined,
        emailProvider: data.emailProvider || undefined,
        notificationEmail: data.notificationEmail || undefined,
      });
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const updated = await apiRequest("/settings", {
        method: "PATCH",
        body: JSON.stringify(formData),
      });
      setSettings(updated);
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setSaving(false);
    }
  };

  const testConnection = async (type: "ai" | "email") => {
    setTesting(type);
    try {
      await apiRequest(`/settings/test/${type}`, { method: "POST" });
      alert(`${type.toUpperCase()} connection successful!`);
    } catch (error) {
      console.error(`Failed to test ${type}:`, error);
      alert(`${type.toUpperCase()} connection failed!`);
    } finally {
      setTesting(null);
    }
  };

  const updateFormData = (key: keyof SettingsUpdate, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value || undefined }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SettingsIcon className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your profile, API providers, and notification settings
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profile & Identity
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-2">
            <Key className="h-4 w-4" />
            API & Integrations
          </TabsTrigger>
        </TabsList>

        {/* Profile & Identity Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ProfileIdentity />
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Visibility Preferences</CardTitle>
                  <CardDescription>
                    Control your profile visibility.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Public Profile</Label>
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded text-sm font-medium">
                      Active
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label>Notifications</Label>
                    <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded text-sm font-medium">
                      Enabled
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                    Manage your account security.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Two-Factor Authentication</Label>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label>Session Management</Label>
                    <Button variant="outline" size="sm">
                      View Sessions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* API & Integrations Tab */}
        <TabsContent value="api" className="space-y-8">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid gap-8">
              {/* AI Settings */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                        <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <CardTitle>AI Provider</CardTitle>
                        <CardDescription>
                          Configure the AI service for content generation
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {settings?.aiApiKey?.configured && (
                        <Badge variant="secondary" className="gap-1">
                          <Check className="h-3 w-3" />
                          Configured
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => testConnection("ai")}
                        disabled={testing === "ai" || !settings?.aiApiKey?.configured}
                      >
                        {testing === "ai" ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          "Test"
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="aiProvider">AI Provider</Label>
                      <Select
                        value={formData.aiProvider || ""}
                        onChange={(e) => updateFormData("aiProvider", e.target.value)}
                      >
                        <option value="">Select AI provider</option>
                        <SelectItem value="OPENAI">OpenAI</SelectItem>
                        <SelectItem value="CLAUDE">Claude (Anthropic)</SelectItem>
                        <SelectItem value="GEMINI">Google Gemini</SelectItem>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="aiApiKey">API Key</Label>
                      <div className="relative">
                        <Input
                          id="aiApiKey"
                          type={showApiKeys.ai ? "text" : "password"}
                          placeholder="Enter API key"
                          value={formData.aiApiKey || ""}
                          onChange={(e) => updateFormData("aiApiKey", e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowApiKeys(prev => ({ ...prev, ai: !prev.ai }))}
                        >
                          {showApiKeys.ai ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email Settings */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                        <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <CardTitle>Email Provider</CardTitle>
                        <CardDescription>
                          Configure email service for notifications
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {settings?.emailApiKey?.configured && (
                        <Badge variant="secondary" className="gap-1">
                          <Check className="h-3 w-3" />
                          Configured
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => testConnection("email")}
                        disabled={testing === "email" || !settings?.emailApiKey?.configured}
                      >
                        {testing === "email" ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          "Test"
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emailProvider">Email Provider</Label>
                      <Select
                        value={formData.emailProvider || ""}
                        onChange={(e) => updateFormData("emailProvider", e.target.value)}
                      >
                        <option value="">Select email provider</option>
                        <SelectItem value="RESEND">Resend</SelectItem>
                        <SelectItem value="SENDGRID">SendGrid</SelectItem>
                        <SelectItem value="NONE">Disabled</SelectItem>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="emailApiKey">API Key</Label>
                      <div className="relative">
                        <Input
                          id="emailApiKey"
                          type={showApiKeys.email ? "text" : "password"}
                          placeholder="Enter API key"
                          value={formData.emailApiKey || ""}
                          onChange={(e) => updateFormData("emailApiKey", e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowApiKeys(prev => ({ ...prev, email: !prev.email }))}
                        >
                          {showApiKeys.email ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notificationEmail">Notification Email</Label>
                    <Input
                      id="notificationEmail"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.notificationEmail || ""}
                      onChange={(e) => updateFormData("notificationEmail", e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Email address where contact notifications will be sent
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Security Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                      <Shield className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <CardTitle>Security</CardTitle>
                      <CardDescription>
                        Your API keys are encrypted and stored securely
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• All API keys are encrypted using industry-standard encryption</p>
                    <p>• Keys are never exposed in the frontend responses</p>
                    <p>• Configuration status only shows whether keys are set</p>
                    <p>• You can update or remove keys at any time</p>
                  </div>
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button
                  onClick={saveSettings}
                  disabled={saving}
                  className="gap-2"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Settings
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
