"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function ProfileSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Global Visibility</CardTitle>
          <CardDescription>
            Control where your profile is displayed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Public Personal Portfolio</Label>
              <p className="text-sm text-muted-foreground">
                Your profile is visible at /john-doe
              </p>
            </div>
            <Switch checked={true} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Agency Website Listing</Label>
              <p className="text-sm text-muted-foreground">
                Show card on the agency About page
              </p>
            </div>
            <Switch checked={true} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="destructive">Delete Profile</Button>
          <p className="mt-2 text-xs text-muted-foreground">
            This action cannot be undone.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
