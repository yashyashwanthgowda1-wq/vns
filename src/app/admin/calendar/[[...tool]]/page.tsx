import Link from "next/link";
import CalendarStudio from "@/components/admin/calendar-studio";
import { sanityConfigured } from "@/sanity/env";

export default function CalendarAdminPage() {
  if (!sanityConfigured) {
    return (
      <main className="mx-auto max-w-xl space-y-4 px-6 py-20">
        <h1 className="text-3xl">Calendar setup required</h1>
        <p>
          Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in the deployment
          environment, then rebuild. See docs/calendar.md for setup instructions.
        </p>
        <Link className="underline" href="/admin">
          Back to admin
        </Link>
      </main>
    );
  }
  return (
    <main>
      <nav className="flex h-12 items-center gap-6 border-b bg-background px-4 text-sm">
        <Link href="/admin" className="underline">
          Back to admin
        </Link>
        <Link href="/booking" className="underline">
          View booking calendar
        </Link>
      </nav>
      <div className="relative h-[calc(100dvh-3rem)]">
        <CalendarStudio />
      </div>
    </main>
  );
}
