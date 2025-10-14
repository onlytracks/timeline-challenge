import { getDriver } from "@/data/db";
import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

export const Route = createFileRoute("/api/drivers/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => json(getDriver(params.id)),
    },
  },
});
