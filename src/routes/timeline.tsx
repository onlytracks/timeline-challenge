import { LoadSchedule } from "@/components/schedule";
import { AddLoadDialog, EditLoadDialog } from "@/components/load-dialogs";
import { Button } from "@/components/ui/button";
import {
  createServerLoad,
  deleteServerLoad,
  updateServerLoad,
} from "@/data/db";
import { Load } from "@/data/models";
import { useDriversQuery, useLoadsQuery } from "@/queries";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import "react-calendar-timeline/style.css";

export const Route = createFileRoute("/timeline")({
  component: RouteComponent,
  ssr: false,
});

function RouteComponent() {
  const { data: drivers } = useDriversQuery();
  const { data: loads, refetch: refetchLoads } = useLoadsQuery();
  const createLoad = useServerFn(createServerLoad);
  const updateLoad = useServerFn(updateServerLoad);
  const deleteLoad = useServerFn(deleteServerLoad);

  const [addLoad, setAddLoad] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState<Load | null>(null);

  return (
    <div className="flex h-screen w-full flex-col">
      <header
        className="flex flex-none items-center justify-between p-1 text-lg"
      >
        <h1 className="text-lg font-bold">Load Schedule</h1>
        <Button size="sm" onClick={() => setAddLoad(true)}>
          <PlusIcon />
          New Load
        </Button>
      </header>

      <div className="relative isolate flex-1">
        <LoadSchedule
          drivers={drivers ?? []}
          loads={loads ?? []}
          onLoadClick={setSelectedLoad}
        />
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
