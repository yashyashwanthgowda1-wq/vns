import { defineField, defineType } from "sanity";
import { availabilityLabels } from "@/lib/calendar";
import { sanityApiVersion } from "../env";

export const calendarDay = defineType({
  name: "calendarDay",
  title: "Calendar availability",
  type: "document",
  description: "Venue-wide daily availability. Publish changes to update the booking calendar.",
  fields: [
    defineField({
      name: "date",
      title: "Date (Bengaluru time)",
      type: "date",
      validation: (rule) =>
        rule.required().custom(async (date, context) => {
          if (!date) return true;
          const id = context.document?._id.replace(/^drafts\./, "");
          const duplicate = await context
            .getClient({ apiVersion: sanityApiVersion })
            .fetch<boolean>(
              'count(*[_type == "calendarDay" && date == $date && !(_id in [$id, $draftId])]) > 0',
              { date, id: id ?? "", draftId: `drafts.${id}` },
            );
          return duplicate ? "This date already has an entry. Edit the existing entry." : true;
        }),
    }),
    defineField({
      name: "status",
      type: "string",
      title: "Availability",
      options: {
        list: Object.entries(availabilityLabels).map(([value, title]) => ({ value, title })),
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "note",
      title: "Public note",
      description: "Visible to visitors. Do not enter customer names or private booking details.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(240),
    }),
  ],
  orderings: [{ title: "Date", name: "dateAsc", by: [{ field: "date", direction: "asc" }] }],
  preview: {
    select: { title: "date", subtitle: "status" },
  },
});
