import { addHours, isBefore, isFuture } from "date-fns";
import { useCallback, useMemo, useState } from "react";
import Timeline, {
  DateHeader,
  SidebarHeader,
  TimelineHeaders,
} from "react-calendar-timeline";
import type { TimelineItemBase } from "react-calendar-timeline";
import type { Driver, Load } from "@/server/models";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";

export function LoadSchedule({
  drivers,
  loads,
  onLoadClick,
  onUpdateLoad,
}: {
  drivers: Array<Driver>;
  loads: Array<Load>;
  onLoadClick: (load: Load) => unknown;
  onUpdateLoad: (load: Load) => unknown;
}) {
  const { defaultTimeStart, defaultTimeEnd } = useMemo(
    () => ({
      // TODO: This could use the loads to determine the best range
      defaultTimeStart: new Date(),
      defaultTimeEnd: addHours(new Date(), 48),
    }),
    [],
  );

  const groups = useMemo(
    () => drivers.map((user) => ({ id: user.id, title: user.name })),
    [loads],
  );

  const [pendingMove, setPendingMove] = useState<{
    load: Load;
    driver: Driver;
  } | null>(null);

  const items = useMemo(() => {
    const now = new Date();
    return loads.map((load) => {
      const group = groups.find((g) => g.id === load.driverId);
      const item = {
        id: load.id,
        group: group?.id ?? load.driverId,
        title: load.name,
        start_time: load.start.valueOf(),
        end_time: load.end.valueOf(),
        itemProps: {
          className: cn(
            `box-border rounded-sm !border border-slate-200 font-semibold text-white hover:!bg-slate-400`,
            "!bg-cyan-700/70",
            isBefore(load.start, now) && "!bg-emerald-700/80",
            isBefore(load.end, now) && "!bg-neutral-500/80",
            pendingMove?.load.id === load.id && "!bg-amber-700/80",
          ),
        },
        canMove: isFuture(load.start),
      } satisfies TimelineItemBase<number>;

      // If a load is being moved, use the updated values
      if (pendingMove?.load.id === load.id) {
        const newGroup = groups.find((g) => g.id === pendingMove.load.driverId);
        item.start_time = pendingMove.load.start.valueOf();
        item.end_time = pendingMove.load.end.valueOf();
        item.group = newGroup?.id ?? pendingMove.load.driverId;
      }

      return item;
    });
  }, [loads, groups, pendingMove]);

  const handleItemClick = useCallback(
    (id: string) => {
      const load = loads.find((l) => l.id === id);
      if (!load) return;
      onLoadClick(load);
    },
    [loads, onLoadClick],
  );

  const handleItemMove = useCallback(
    (id: string, dragTime: number, newGroupOrder: number) => {
      const load = loads.find((l) => l.id === id);
      const newDriver = drivers.find((d) => groups[newGroupOrder]?.id === d.id);
      if (!load || !newDriver) {
        throw new Error("Error moving load: unknown load or driver");
      }
      setPendingMove({
        load: {
          ...load,
          driverId: newDriver.id,
          start: new Date(dragTime),
          end: new Date(dragTime + (load.end.valueOf() - load.start.valueOf())),
        },
        driver: newDriver,
      });
    },
    [loads],
  );

  return (
    <div className="relative">
      <Timeline
        groups={groups}
        items={items}
        itemHeightRatio={0.8}
        canMove
        canResize={false}
        defaultTimeStart={defaultTimeStart.valueOf()}
        defaultTimeEnd={defaultTimeEnd.valueOf()}
        className="relative flex-1"
        itemTouchSendsClick
        onItemClick={handleItemClick}
        // onItemSelect={handleItemClick}
        onItemMove={handleItemMove}
        // dragSnap={15 * 60 * 1000} // 15 minutes (default)
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
      {pendingMove && (
        <div
          className="absolute inset-x-0 top-0 flex items-center justify-center
            gap-2 border-amber-800 bg-amber-300 p-2 text-sm"
        >
          Confirm moving load {pendingMove.load.name} to{" "}
          {pendingMove.driver.name} starting at{" "}
          {pendingMove.load.start.toLocaleString()}?
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setPendingMove(null)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => {
                onUpdateLoad(pendingMove.load);
                setPendingMove(null);
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
