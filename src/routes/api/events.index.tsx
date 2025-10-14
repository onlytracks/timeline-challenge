import { getEvents } from "@/data/db";
import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

export const Route = createFileRoute("/api/events/")({
  server: {
    handlers: {
      GET: async () => {
        await new Promise((r) => setTimeout(r, 1000)); // Simulate network delay
        return json(getEvents());
      },
    },
  },
});
