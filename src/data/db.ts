import { createServerFn } from "@tanstack/react-start";
import { addDays, endOfDay, isBefore, startOfDay } from "date-fns";
import { readFile, writeFile } from "fs/promises";
import { Driver, Load, LoadSchema } from "./models";
import { seedSchedule } from "./seed";

export const DRIVERS_FILEPATH = "src/data/drivers.json";
export const LOADS_FILEPATH = "src/data/loads.json";

export const getServerDrivers = createServerFn().handler(async () => {
  const raw = await readFile(DRIVERS_FILEPATH, "utf-8");
  return JSON.parse(raw) as Driver[];
});

export const getServerDriver = createServerFn()
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const drivers = await getServerDrivers();
    return drivers.find((driver) => driver.id === data.id) || null;
  });

export const getServerLoads = createServerFn()
  .inputValidator((data?: { query?: string }) => data)
  .handler(async ({ data }) => {
    const raw = await readFile(LOADS_FILEPATH, "utf-8");
    const allLoads = JSON.parse(raw).map((load: any) => ({
      ...load,
      start: new Date(load.start),
      end: new Date(load.end),
    })) as Load[];

    if (!data?.query?.length) {
      return allLoads;
    }

    const drivers = await getServerDrivers();
    const matchingDriverIds = drivers
      .filter((driver) =>
        driver.name.toLowerCase().includes(data.query!.toLowerCase()),
      )
      .map((d) => d.id);

    return allLoads.filter(
      (load) =>
        matchingDriverIds.includes(load.driverId) ||
        load.name.toLowerCase().includes(data.query!.toLowerCase()),
    );
  });

export const getServerLoad = createServerFn()
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const loads = await getServerLoads();
    return loads.find((load) => load.id === data.id) || null;
  });

export const createServerLoad = createServerFn()
  .inputValidator(LoadSchema.omit({ id: true }))
  .handler(async ({ data }) => {
    const loads = await getServerLoads();

    const load = {
      ...data,
      id: String(loads.length + 1),
    };

    const conflicts = loads.filter(
      (existing) =>
        existing.driverId === load.driverId &&
        isBefore(existing.start, load.end) &&
        isBefore(load.start, existing.end),
    );

    if (conflicts.length > 0) {
      throw new Error(
        "Load timing conflicts with existing loads for the driver.",
      );
    }

    loads.push(load);
    await writeFile(LOADS_FILEPATH, JSON.stringify(loads, null, 2), "utf-8");

    await new Promise((r) => setTimeout(r, 500)); // Simulate network delay
    return load;
  });

export const updateServerLoad = createServerFn()
  .inputValidator(LoadSchema)
  .handler(async ({ data }) => {
    const loads = await getServerLoads();

    const index = loads.findIndex((load) => load.id === data.id);

    const conflicts = loads.filter(
      (existing) =>
        existing.id !== data.id &&
        existing.driverId === data.driverId &&
        isBefore(existing.start, data.end) &&
        isBefore(data.start, existing.end),
    );

    if (conflicts.length > 0) {
      throw new Error(
        "Load timing conflicts with existing loads for the driver.",
      );
    }

    if (index !== -1) {
      loads[index] = data;
    }
    await writeFile(LOADS_FILEPATH, JSON.stringify(loads, null, 2), "utf-8");

    await new Promise((r) => setTimeout(r, 500)); // Simulate network delay
    return data;
  });

export const deleteServerLoad = createServerFn()
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const loads = await getServerLoads();

    const index = loads.findIndex((load) => load.id === data.id);

    if (index === -1) {
      // If the load doesn't exist, we consider it already "deleted"
      return true;
    }

    loads.splice(index, 1);
    await writeFile(LOADS_FILEPATH, JSON.stringify(loads, null, 2), "utf-8");

    await new Promise((r) => setTimeout(r, 500)); // Simulate network delay
    return true;
  });

export const seedServerLoads = createServerFn().handler(async () => {
  await seedSchedule(
    startOfDay(addDays(new Date(), -3)),
    endOfDay(addDays(new Date(), 17)),
  );
  return true;
});
