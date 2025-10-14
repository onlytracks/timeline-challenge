import { Driver, Event } from "@/data/db";
import { driversQueryOptions, eventsQueryOptions } from "@/queries";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { addHours } from "date-fns";
import { LoaderCircleIcon } from "lucide-react";
import { useMemo } from "react";
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
  const { data: drivers } = useQuery<Array<Driver>>(driversQueryOptions());
  const { data: events } = useQuery<Array<Event>>(eventsQueryOptions());

  const { groups, items, minStart, maxEnd } = useMemo(() => {
    const groups =
      drivers?.map((user) => ({
        id: user.id,
        title: user.name,
      })) ?? [];

    const items =
      events?.map((event) => ({
        id: event.id,
        group: event.driverId,
        title: `Load ${event.id}`,
        start_time: event.start.valueOf(),
        end_time: event.end.valueOf(),
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
  }, [events]);

  return (
    <div className="flex h-screen w-full flex-col">
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
                    className="flex items-center border-r border-neutral-500
                      bg-slate-600 font-semibold text-white"
                  >
                    Users
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
          className="flex w-full flex-1 items-center justify-center gap-2
            text-xl"
        >
          <LoaderCircleIcon className="animate-spin" />
          Loading...
        </div>
      )}
      <div
        className="relative max-h-1/3 overflow-scroll bg-neutral-950 text-white"
      >
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
    </div>
  );
}
