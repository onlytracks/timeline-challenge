import { LoadForm } from "@/components/load-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useDriversQuery, useLoadsQuery } from "@/queries";
import { DialogTitle } from "@radix-ui/react-dialog";
import { createFileRoute } from "@tanstack/react-router";
import { addHours } from "date-fns";
import { LoaderCircleIcon, PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import {
  DateHeader,
  SidebarHeader,
  Timeline,
  TimelineHeaders,
} from "react-calendar-timeline";
import "react-calendar-timeline/style.css";

export const Route = createFileRoute("/timeline")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: drivers } = useDriversQuery();
  const { data: loads } = useLoadsQuery();

  const { groups, items, minStart, maxEnd } = useMemo(() => {
    const groups =
      drivers?.map((user) => ({
        id: user.id,
        title: user.name,
      })) ?? [];

    const items =
      loads?.map((load) => ({
        id: load.id,
        group: load.driverId,
        title: load.name,
        start_time: load.start.valueOf(),
        end_time: load.end.valueOf(),
        itemProps: {
          className:
            "!bg-amber-700/80 font-semibold text-white rounded-sm box-border hover:!bg-slate-400 !border border-slate-200",
        },
      })) ?? [];

    return {
      groups,
      items,
      minStart: new Date(),
      maxEnd: addHours(new Date(), 36),
    };
  }, [loads]);

  const [addLoad, setAddLoad] = useState(false);

  return (
    <div className="flex h-screen w-full flex-col">
      <header
        className="flex flex-none items-center justify-between bg-slate-600 p-1
          text-lg text-white"
      >
        <h1 className="text-lg font-bold">Load Schedule</h1>
        <Button onClick={() => setAddLoad(true)}>
          <PlusIcon />
          New Load
        </Button>
      </header>
      <div className="relative isolate flex-1">
        {groups.length && items.length && minStart && maxEnd ? (
          <Timeline
            groups={groups}
            items={items}
            // keys={keys}
            itemTouchSendsClick={false}
            // stackItems
            // itemHeightRatio={0.75}
            // showCursorLine
            canMove={false}
            canResize={false}
            defaultTimeStart={minStart.valueOf()}
            defaultTimeEnd={maxEnd.valueOf()}
            className="relative flex-1"
          >
            <TimelineHeaders className="sticky top-0">
              <SidebarHeader>
                {({ getRootProps }) => {
                  return (
                    <div
                      {...getRootProps()}
                      className="flex items-center border-t border-r
                        border-neutral-300 bg-slate-600 p-1 font-semibold
                        text-white"
                    >
                      Drivers
                    </div>
                  );
                }}
              </SidebarHeader>
              <DateHeader
                unit="primaryHeader"
                className="bg-slate-600 font-semibold text-white uppercase"
              />
              <DateHeader unit="hour" />
            </TimelineHeaders>
          </Timeline>
        ) : (
          <div
            className="flex h-full w-full items-center justify-center gap-2
              text-xl"
          >
            <LoaderCircleIcon className="animate-spin" />
            Loading...
          </div>
        )}
      </div>

      <div className="relative h-1/4 overflow-scroll bg-neutral-950 text-white">
        <h2
          className="sticky top-0 border-t border-b border-slate-500
            bg-slate-600 py-0.5 text-center font-semibold text-white uppercase"
        >
          Raw Load Data
        </h2>
        {items.map((item) => (
          <div key={item.id} className="px-2">
            {item.title} : {new Date(item.start_time).toLocaleString()} -{" "}
            {new Date(item.end_time).toLocaleString()}
          </div>
        ))}
      </div>

      <Dialog open={addLoad} onOpenChange={setAddLoad}>
        <DialogContent>
          <DialogHeader className="border-b pb-2">
            <DialogTitle className="font-semibold">New Load</DialogTitle>
          </DialogHeader>
          <LoadForm
            onCancel={() => setAddLoad(false)}
            onSubmit={async () => setAddLoad(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
