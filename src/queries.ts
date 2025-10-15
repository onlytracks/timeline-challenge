import { getServerDrivers, getServerLoads } from "@/data/db";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

export function useDriversQuery() {
  const fetch = useServerFn(getServerDrivers);
  return useQuery({
    queryKey: ["drivers"],
    queryFn: () => fetch(),
    // staleTime: 5 * 1000,
  });
}

export function useLoadsQuery(data: { query?: string }) {
  const fetch = useServerFn(getServerLoads);
  return useQuery({
    queryKey: ["loads", data?.query],
    queryFn: () => fetch({ data }),
    // staleTime: 5 * 1000,
  });
}
