import { Driver, Event } from "@/data/db";
import { queryOptions } from "@tanstack/react-query";
import { parseISO } from "date-fns";

export function driversQueryOptions() {
  return queryOptions<Driver[]>({
    queryKey: ["drivers"],
    queryFn: () => fetch("/api/drivers").then((res) => res.json()),
    staleTime: 5 * 1000,
  });
}

export function eventsQueryOptions() {
  return queryOptions<Event[]>({
    queryKey: ["events"],
    queryFn: () =>
      fetch("/api/events")
        .then((res) => res.json())
        .then(
          (data) =>
            data.map((event: any) => ({
              ...event,
              start: parseISO(event.start),
              end: parseISO(event.end),
            })) as Event[],
        ),
    staleTime: 5 * 1000,
  });
}
