import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { HomeIcon, PlusIcon } from "lucide-react";
import { useCallback, useState } from "react";
import z from "zod";
import type { Load } from "@/server/models";
import { AddLoadDialog, EditLoadDialog } from "@/components/loads/dialogs";
import { LoadSchedule } from "@/components/loads/schedule";
import { Button } from "@/components/ui/button";
import { Searchbar } from "@/components/ui/searchbar";
import {
  createServerLoad,
  deleteServerLoad,
  seedServerLoads,
  updateServerLoad,
} from "@/server/api";
import { useDriversQuery, useLoadsQuery } from "@/queries";
import "react-calendar-timeline/style.css";

const SearchSchema = z.object({
  query: z.string().optional(),
});

export const Route = createFileRoute("/")({
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

  const [addLoad, setAddLoad] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState<Load | null>(null);

  const seedLoadsFn = useServerFn(seedServerLoads);

  const createLoadFn = useServerFn(createServerLoad);
  const createLoad = useCallback(
    async (data: Omit<Load, "id">) => {
      try {
        await createLoadFn({ data });
        await refetchLoads();
        setAddLoad(false);
      } catch (err) {
        alert((err as Error).message);
      }
    },
    [createLoadFn, refetchLoads],
  );

  const updateLoadFn = useServerFn(updateServerLoad);
  const updateLoad = useCallback(
    async (data: Load) => {
      try {
        await updateLoadFn({ data });
        await refetchLoads();
        setSelectedLoad(null);
      } catch (err) {
        alert((err as Error).message);
      }
    },
    [updateLoadFn, refetchLoads],
  );

  const deleteLoadFn = useServerFn(deleteServerLoad);
  const deleteLoad = useCallback(
    async (data: { id: string }) => {
      try {
        await deleteLoadFn({ data });
        await refetchLoads();
        setSelectedLoad(null);
      } catch (err) {
        alert((err as Error).message);
      }
    },
    [deleteLoadFn, refetchLoads],
  );

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
            onSubmit={(value) =>
              navigate({ to: "/", search: { query: value } })
            }
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
          onUpdateLoad={updateLoad}
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
              await seedLoadsFn();
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
        onSubmit={createLoad}
      />

      <EditLoadDialog
        load={selectedLoad}
        onOpenChange={(open) => !open && setSelectedLoad(null)}
        onSubmit={updateLoad}
        onDelete={deleteLoad}
      />
    </div>
  );
}
