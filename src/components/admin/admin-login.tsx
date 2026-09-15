"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AdminLogin({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!key.trim()) {
      setError("Enter the admin access key");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const { validateAdminKey, storeAdminKey } = await import("@/lib/admin-api");
      await validateAdminKey(key.trim());
      storeAdminKey(key.trim());
      onAuthenticated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not verify the admin key");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-none">
        <CardHeader className="items-center text-center">
          <span className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
            <ShieldCheck className="h-6 w-6 text-gold" />
          </span>
          <CardTitle className="font-display text-2xl">Venus Park Admin</CardTitle>
          <CardDescription>
            Enter the admin access key to manage enquiries and bookings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline" className="mb-5 w-full">
            <a href="/admin/calendar">Manage calendar with Sanity</a>
          </Button>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="admin-key">Admin access key</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="admin-key"
                  type="password"
                  autoComplete="current-password"
                  className="pl-9"
                  value={key}
                  onChange={(e) => {
                    setKey(e.target.value);
                    setError("");
                  }}
                  placeholder="Paste your admin key"
                />
              </div>
              {error ? (
                <p className="mt-1.5 text-xs text-destructive" role="alert">
                  {error}
                </p>
              ) : null}
            </div>
            <Button type="submit" variant="gold" className="w-full" disabled={submitting}>
              {submitting ? <Loader2 className="animate-spin" /> : <Lock />}
              Sign in
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
