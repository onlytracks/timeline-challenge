import { AddLoadDialog, EditLoadDialog } from "@/components/load-dialogs";
import { LoadSchedule } from "@/components/schedule";
import { Button } from "@/components/ui/button";
import { Searchbar } from "@/components/ui/searchbar";
import {
  createServerLoad,
  deleteServerLoad,
  seedServerLoads,
  updateServerLoad,
} from "@/data/db";
import { Load } from "@/data/models";
import { useDriversQuery, useLoadsQuery } from "@/queries";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { HomeIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import "react-calendar-timeline/style.css";
import z from "zod";

const SearchSchema = z.object({
  query: z.string().optional(),
});

export const Route = createFileRoute("/timeline")({
  component: RouteComponent,
  validateSearch: SearchSchema,
  loaderDeps: ({ search }) => ({ query: search.query }),
  ssr: false,
});

function RouteComponent() {
  const router = useRouter();
  const navigate = Route.useNavigate();
  const { query } = Route.useLoaderDeps();

  const { data: drivers } = useDriversQuery();
  const { data: loads, refetch: refetchLoads } = useLoadsQuery({ query });
  const createLoad = useServerFn(createServerLoad);
  const updateLoad = useServerFn(updateServerLoad);
  const deleteLoad = useServerFn(deleteServerLoad);
  const seedLoads = useServerFn(seedServerLoads);

  const [addLoad, setAddLoad] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState<Load | null>(null);

  return (
    <div className="flex h-screen w-full flex-col">
      <header
        className="flex flex-none items-center gap-2 bg-slate-600 p-2 text-white
          shadow-sm"
      >
        <Button
          variant="link"
          size="icon-lg"
          onClick={() => navigate({ to: "/" })}
          className="text-white hover:text-slate-200"
        >
          <HomeIcon className="size-5" />
        </Button>
        <h1 className="text-center text-xl font-bold">Load Schedule</h1>
        <div className="flex flex-1 items-center justify-end gap-2">
          <Searchbar
            placeholder="Search by driver or load name..."
            value={query}
            onSubmit={(query) => {
              console.log("Searchbar:onSubmit", { query });
              navigate({ to: "/timeline", search: { query } });
            }}
          />
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setAddLoad(true)}
          >
            <PlusIcon />
            Add Load
          </Button>
        </div>
      </header>

      <div className="relative isolate flex-1">
        <LoadSchedule
          drivers={drivers ?? []}
          loads={loads ?? []}
          onLoadClick={setSelectedLoad}
        />
      </div>

      <div className="flex flex-none items-center p-2">
        <Button
          variant="ghost"
          onClick={async () => {
            if (
              window.confirm(
                "Are you sure you want to seed loads? This will overwrite existing loads.",
              )
            ) {
              await seedLoads();
              await router.invalidate({ sync: true });
              // TODO: this doesn't force a re-render of the timeline - it shows old data
            }
          }}
        >
          Seed Loads
        </Button>
      </div>

      <AddLoadDialog
        open={addLoad}
        onOpenChange={(open) => !open && setAddLoad(false)}
        onSubmit={async (data) => {
          try {
            await createLoad({ data });
            await refetchLoads();
            setAddLoad(false);
          } catch (err) {
            alert((err as Error).message);
          }
        }}
      />

      <EditLoadDialog
        load={selectedLoad}
        onOpenChange={(open) => !open && setSelectedLoad(null)}
        onSubmit={async (data) => {
          try {
            await updateLoad({ data });
            await refetchLoads();
            setSelectedLoad(null);
          } catch (err) {
            alert((err as Error).message);
          }
        }}
        onDelete={async (data) => {
          try {
            await deleteLoad({ data });
            await refetchLoads();
            setSelectedLoad(null);
          } catch (err) {
            alert((err as Error).message);
          }
        }}
      />
    </div>
  );
}
