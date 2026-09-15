# Sanity availability calendar

## Setup

1. Create or select a project at https://www.sanity.io/manage and create a `production` dataset. No project or credentials are bundled with this repository.
2. Copy `.env.example` to `.env.local`. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`. For a private dataset, set `SANITY_API_READ_TOKEN` to a Viewer token on the server. Do not expose tokens through `NEXT_PUBLIC_` variables.
3. In the project's API settings, allow your development origin (normally `http://localhost:3000`) and production origin under CORS, with credentials enabled for Studio sign-in. Use exact origins, not wildcards.
4. Invite calendar administrators to the Sanity project with Editor access. Sanity authenticates and authorizes all edits; the legacy enquiry admin key does not grant Sanity access.
5. Run `npm ci` and `npm run dev`. Visit `/admin` and choose **Manage calendar with Sanity**, or open `/admin/calendar` directly.

## Managing dates

Create a **Calendar availability** document, choose a date and status, optionally add a public note, and click **Publish**. Edit and republish to change availability. Unpublish or delete to return the date to unmarked status. Drafts do not appear publicly. The editor rejects duplicate dates. Dates represent whole days in Bengaluru and apply to the venue overall, not individual halls or time slots. Public notes must not contain private customer information.

The calendar appears in enquiry forms including `/booking`; `/check-availability` continues redirecting there and preserves its package parameter. Selecting a date fills the preferred date field. Unavailable dates cannot be selected on the calendar. The date input remains available for enquiries, including when Sanity is offline. This is an informational calendar, not a reservation or double-booking prevention system; staff still confirm each enquiry.

## Architecture

- `src/sanity/schemaTypes/calendarDay.ts`: document fields and editor validation.
- `src/sanity/config.ts`: Studio configuration, mounted at `/admin/calendar/[[...tool]]`.
- `src/app/api/calendar/route.ts`: read-only `GET /api/calendar?month=YYYY-MM`, bounded monthly GROQ query and runtime response validation.
- `src/lib/calendar.ts`: shared types, validation and venue date helper.
- `src/components/site/AvailabilityCalendar.tsx`: month navigation, status legend, selection, loading, empty and retry states.

Sanity stores `_id`, `_createdAt`, `_updatedAt`, `date`, `status` and optional `note`. No SQL migration or public write API is required. Only published date/status/note fields are returned; the optional Viewer token stays on the server. Reads bypass caching, so newly published changes appear on the next month load or page refresh.

## Verification

```sh
npx tsc --noEmit
npm run build
```

With a configured project:

1. Open `/admin/calendar` signed out and verify Sanity requires sign-in before editing. Sign in as an authorized Editor.
2. Publish available, limited and unavailable dates in the current month, including a public note. Verify colors/legend and note on `/booking` and that selecting an available date fills the enquiry field.
3. Leave an edit in draft and verify the published value stays visible. Publish it, refresh the booking page and verify the change. Unpublish/delete it and verify it becomes unmarked.
4. Try creating a duplicate date and verify editor validation blocks publication. Test keyboard navigation and a mobile viewport.
5. Navigate between months quickly and verify older responses do not replace the current month. Test an empty month, offline/retry behavior and invalid API month input (HTTP 400).
6. Remove Sanity configuration and restart: the admin shows setup guidance and the public calendar shows a recoverable error instead of invented availability.

## Deployment

Deploy to a Node.js host supporting Next.js route handlers. Set the environment variables before `npm run build` because the Studio uses public configuration at build time. Add the production CORS origin in Sanity and rebuild whenever project/dataset values change. No separate Studio deployment is needed. Enquiry submission still depends on the existing external enquiry API; its backend is not present in this checkout.

References: [Sanity Studio embedding](https://www.sanity.io/docs/studio/embedding-sanity-studio), [published query perspective](https://www.sanity.io/docs/http-reference/query).
