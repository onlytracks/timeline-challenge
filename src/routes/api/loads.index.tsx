import { getLoads } from "@/data/db";
import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

export const Route = createFileRoute("/api/loads/")({
  server: {
    handlers: {
      GET: async () => json(getLoads()),
    },
  },
});
