import type { Driver, Load } from "@/server/models";
import { cn } from "@/utils/cn";
import { addHours, isBefore } from "date-fns";
import { useMemo } from "react";
import Timeline, {
  DateHeader,
  SidebarHeader,
  TimelineHeaders,
} from "react-calendar-timeline";

export function LoadSchedule({
  drivers,
  loads,
  onLoadClick,
}: {
  drivers: Array<Driver>;
  loads: Array<Load>;
  onLoadClick: (load: Load) => unknown;
}) {
  const { groups, items, defaultTimeStart, defaultTimeEnd } = useMemo(() => {
    const now = new Date();
    return {
      groups: drivers.map((user) => ({
        id: user.id,
        title: user.name,
      })),
      items: loads.map((load) => {
        return {
          id: load.id,
          group: load.driverId,
          title: load.name,
          start_time: load.start.valueOf(),
          end_time: load.end.valueOf(),
          itemProps: {
            className: cn(
              `box-border rounded-sm !border border-slate-200 font-semibold
              text-white hover:!bg-slate-400`,
              "!bg-amber-700/70",
              isBefore(load.start, now) && "!bg-emerald-700/80",
              isBefore(load.end, now) && "!bg-neutral-500/80",
            ),
          },
        };
      }),
      defaultTimeStart: new Date(),
      defaultTimeEnd: addHours(new Date(), 48),
    };
  }, [loads]);

  return (
    <Timeline
      groups={groups}
      items={items}
      itemHeightRatio={0.8}
      canMove={false}
      canResize={false}
      defaultTimeStart={defaultTimeStart.valueOf()}
      defaultTimeEnd={defaultTimeEnd.valueOf()}
      className="relative flex-1"
      itemTouchSendsClick
      onItemClick={(id) => {
        const selected = loads.find((load) => load.id === id);
        if (!selected) return;
        onLoadClick(selected);
      }}
      onItemSelect={(id) => {
        const selected = loads.find((load) => load.id === id);
        if (!selected) return;
        onLoadClick(selected);
      }}
    >
      <TimelineHeaders className="sticky top-0">
        <SidebarHeader>
          {({ getRootProps }) => {
            return (
              <div
                {...getRootProps()}
                className="flex items-end bg-white p-1 font-semibold
                  !text-black"
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
      {/* <TodayMarker>
        {({ styles }) => <div style={{ ...styles, backgroundColor: "#1e293b", width: "1px" }} />}
      </TodayMarker> */}
    </Timeline>
  );
}
