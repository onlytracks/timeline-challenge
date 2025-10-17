import { queryOptions } from "@tanstack/react-query";
import { getServerDrivers, getServerLoads } from "@/server/api";

export function driversQueryOptions() {
  return queryOptions({
    queryKey: ["drivers"],
    queryFn: () => getServerDrivers(),
    staleTime: 30 * 1000,
  });
}

export function useLoadsQueryOptions(data?: { query?: string }) {
  return queryOptions({
    queryKey: ["loads", data?.query ?? "all"],
    queryFn: () => getServerLoads({ data }),
  });
}
