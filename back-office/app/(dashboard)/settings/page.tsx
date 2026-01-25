import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Settings</h2>

      <Card>
        <CardHeader>
          <CardTitle>Profile Preferences</CardTitle>
          <CardDescription>
            Manage how your profile appears to other team members.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Public Visibility</Label>
            <div className="bg-primary/10 text-primary px-3 py-1 rounded text-sm font-medium">
              Enabled
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Label>Email Notifications</Label>
            <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded text-sm font-medium">
              Weekly Digest
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="destructive">Log out of all devices</Button>
        </CardContent>
      </Card>
    </div>
  );
}
