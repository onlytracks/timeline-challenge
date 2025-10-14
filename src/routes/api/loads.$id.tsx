import { getLoad } from "@/data/db";
import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

export const Route = createFileRoute("/api/loads/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => json(getLoad(params.id)),
    },
  },
});
