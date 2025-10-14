import { getEvent } from "@/data/db";
import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

export const Route = createFileRoute("/api/events/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => json(getEvent(params.id)),
    },
  },
});
