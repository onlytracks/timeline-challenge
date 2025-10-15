import { createServerFn } from "@tanstack/react-start";
import { Driver, Load, LoadSchema } from "./models";
import { addDays, endOfDay, isBefore, startOfDay } from "date-fns";

const seedLoads: { availableHour: number; durationHours: number }[] = [
  { availableHour: 8, durationHours: 12 },
  { availableHour: 6, durationHours: 18 },
  { availableHour: 10, durationHours: 8 },
  { availableHour: 14, durationHours: 15 },
  { availableHour: 7, durationHours: 22 },
  { availableHour: 12, durationHours: 10 },
  { availableHour: 9, durationHours: 16 },
  { availableHour: 15, durationHours: 6 },
  { availableHour: 11, durationHours: 20 },
  { availableHour: 6, durationHours: 14 },
  { availableHour: 13, durationHours: 9 },
  { availableHour: 8, durationHours: 24 },
  { availableHour: 16, durationHours: 11 },
  { availableHour: 10, durationHours: 17 },
  { availableHour: 7, durationHours: 13 },
  { availableHour: 14, durationHours: 19 },
  { availableHour: 9, durationHours: 7 },
  { availableHour: 12, durationHours: 21 },
  { availableHour: 6, durationHours: 5 },
  { availableHour: 18, durationHours: 15 },
  { availableHour: 11, durationHours: 12 },
  { availableHour: 8, durationHours: 8 },
  { availableHour: 15, durationHours: 16 },
  { availableHour: 7, durationHours: 10 },
  { availableHour: 13, durationHours: 14 },
  { availableHour: 10, durationHours: 18 },
  { availableHour: 6, durationHours: 22 },
  { availableHour: 16, durationHours: 9 },
  { availableHour: 9, durationHours: 13 },
  { availableHour: 14, durationHours: 20 },
  { availableHour: 8, durationHours: 11 },
  { availableHour: 12, durationHours: 17 },
  { availableHour: 7, durationHours: 6 },
  { availableHour: 11, durationHours: 15 },
  { availableHour: 15, durationHours: 19 },
  { availableHour: 6, durationHours: 24 },
  { availableHour: 10, durationHours: 12 },
  { availableHour: 13, durationHours: 8 },
  { availableHour: 9, durationHours: 14 },
  { availableHour: 17, durationHours: 10 },
  { availableHour: 8, durationHours: 16 },
  { availableHour: 12, durationHours: 21 },
  { availableHour: 6, durationHours: 7 },
  { availableHour: 14, durationHours: 13 },
  { availableHour: 11, durationHours: 18 },
  { availableHour: 7, durationHours: 9 },
  { availableHour: 16, durationHours: 15 },
  { availableHour: 10, durationHours: 22 },
  { availableHour: 13, durationHours: 11 },
  { availableHour: 9, durationHours: 20 },
  { availableHour: 6, durationHours: 12 },
  { availableHour: 15, durationHours: 8 },
  { availableHour: 8, durationHours: 17 },
  { availableHour: 12, durationHours: 14 },
  { availableHour: 7, durationHours: 19 },
  { availableHour: 11, durationHours: 6 },
  { availableHour: 14, durationHours: 16 },
  { availableHour: 10, durationHours: 24 },
  { availableHour: 6, durationHours: 10 },
  { availableHour: 18, durationHours: 13 },
  { availableHour: 9, durationHours: 15 },
  { availableHour: 13, durationHours: 21 },
  { availableHour: 8, durationHours: 9 },
  { availableHour: 16, durationHours: 12 },
  { availableHour: 11, durationHours: 18 },
  { availableHour: 7, durationHours: 14 },
  { availableHour: 15, durationHours: 22 },
  { availableHour: 10, durationHours: 7 },
  { availableHour: 12, durationHours: 11 },
  { availableHour: 6, durationHours: 16 },
  { availableHour: 14, durationHours: 20 },
  { availableHour: 9, durationHours: 8 },
  { availableHour: 17, durationHours: 13 },
  { availableHour: 8, durationHours: 19 },
  { availableHour: 13, durationHours: 15 },
  { availableHour: 11, durationHours: 24 },
  { availableHour: 7, durationHours: 10 },
  { availableHour: 16, durationHours: 17 },
  { availableHour: 10, durationHours: 6 },
  { availableHour: 6, durationHours: 12 },
  { availableHour: 15, durationHours: 14 },
  { availableHour: 9, durationHours: 21 },
  { availableHour: 12, durationHours: 9 },
  { availableHour: 8, durationHours: 18 },
  { availableHour: 14, durationHours: 11 },
  { availableHour: 11, durationHours: 16 },
  { availableHour: 7, durationHours: 22 },
  { availableHour: 18, durationHours: 8 },
  { availableHour: 10, durationHours: 13 },
  { availableHour: 13, durationHours: 20 },
  { availableHour: 6, durationHours: 15 },
  { availableHour: 16, durationHours: 10 },
  { availableHour: 9, durationHours: 17 },
  { availableHour: 12, durationHours: 24 },
  { availableHour: 8, durationHours: 7 },
  { availableHour: 15, durationHours: 12 },
  { availableHour: 11, durationHours: 19 },
  { availableHour: 7, durationHours: 14 },
  { availableHour: 14, durationHours: 16 },
  { availableHour: 10, durationHours: 21 },
];

const drivers: Driver[] = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
  { id: "4", name: "Diana" },
  { id: "5", name: "Ethan" },
  { id: "6", name: "Fiona" },
  { id: "7", name: "George" },
  { id: "8", name: "Hannah" },
  { id: "9", name: "Ian" },
  { id: "10", name: "Julia" },
  { id: "11", name: "Kevin" },
  { id: "12", name: "Laura" },
  { id: "13", name: "Michael" },
  { id: "14", name: "Nina" },
  { id: "15", name: "Oscar" },
  { id: "16", name: "Paula" },
  { id: "17", name: "Quinn" },
  { id: "18", name: "Rachel" },
  { id: "19", name: "Sam" },
  { id: "20", name: "Tina" },
  { id: "21", name: "Uma" },
  { id: "22", name: "Victor" },
  { id: "23", name: "Wendy" },
  { id: "24", name: "Xavier" },
  { id: "25", name: "Yasmin" },
];

interface DriverState {
  driver: Driver;
  nextAvailable: Date;
  totalHours: number;
  lastBreakEnd: Date | null;
}

function getNextValidStartTime(
  currentTime: Date,
  driverAvailable: Date,
  loadAvailableHour: number,
): Date {
  const candidateTime = new Date(
    Math.max(currentTime.getTime(), driverAvailable.getTime()),
  );

  const hour = candidateTime.getHours();
  if (hour >= 20 || hour < 6) {
    const nextDay = new Date(candidateTime);
    nextDay.setHours(6, 0, 0, 0);
    if (hour >= 20) {
      nextDay.setDate(nextDay.getDate() + 1);
    }
    candidateTime.setTime(nextDay.getTime());
  }

  if (candidateTime.getHours() < loadAvailableHour) {
    candidateTime.setHours(loadAvailableHour, 0, 0, 0);
  }

  return candidateTime;
}

function buildSchedule(startDate: Date, endDate: Date): Load[] {
  const loads: Load[] = [];
  const driverStates: DriverState[] = drivers.map((driver) => ({
    driver,
    nextAvailable: new Date(startDate),
    totalHours: 0,
    lastBreakEnd: null,
  }));

  let loadIndex = 0;
  let loadIdCounter = 1;
  let currentTime = new Date(startDate);
  const maxIterations = seedLoads.length * drivers.length * 100;
  let iterations = 0;

  while (currentTime < endDate && iterations < maxIterations) {
    iterations++;
    const load = seedLoads[loadIndex];

    const availableDrivers = driverStates.filter(
      (ds) => ds.nextAvailable <= currentTime || ds.nextAvailable < endDate,
    );

    if (availableDrivers.length === 0) {
      const nextAvailable = Math.min(
        ...driverStates.map((ds) => ds.nextAvailable.getTime()),
      );
      currentTime = new Date(nextAvailable);
      continue;
    }

    const driverWithMinHours = availableDrivers.reduce((min, ds) =>
      ds.totalHours < min.totalHours ? ds : min,
    );

    const startTime = getNextValidStartTime(
      currentTime,
      driverWithMinHours.nextAvailable,
      load.availableHour,
    );

    if (startTime >= endDate) {
      loadIndex = (loadIndex + 1) % seedLoads.length;
      if (loadIndex === 0) {
        currentTime = new Date(currentTime.getTime() + 3600000);
      }
      continue;
    }

    const endTime = new Date(
      startTime.getTime() + load.durationHours * 3600000,
    );

    const id = loadIdCounter++;

    loads.push({
      id: String(id),
      name: `Load ${id}`,
      driverId: driverWithMinHours.driver.id,
      start: startTime,
      end: endTime,
    });

    driverWithMinHours.nextAvailable = new Date(endTime.getTime() + 3600000);
    driverWithMinHours.totalHours += load.durationHours;

    loadIndex = (loadIndex + 1) % seedLoads.length;

    const minNextAvailable = Math.min(
      ...driverStates.map((ds) => ds.nextAvailable.getTime()),
    );
    currentTime = new Date(Math.max(currentTime.getTime(), minNextAvailable));
  }

  return loads.sort((a, b) => a.start.getTime() - b.start.getTime());
}

const loadStorage: Load[] = buildSchedule(
  startOfDay(addDays(new Date(), -1)),
  endOfDay(addDays(new Date(), 14)),
);

export const getServerDrivers = createServerFn().handler(async () => {
  return drivers;
});

export const getServerDriver = createServerFn()
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    return drivers.find((driver) => driver.id === data.id) || null;
  });

export const getServerLoads = createServerFn().handler(async () => {
  await new Promise((r) => setTimeout(r, 1000));
  return loadStorage;
});

export const getServerLoad = createServerFn()
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    return loadStorage.find((load) => load.id === data.id) || null;
  });

export const createServerLoad = createServerFn()
  .inputValidator(LoadSchema.omit({ id: true }))
  .handler(({ data }) => {
    const load = {
      ...data,
      id: String(loadStorage.length + 1),
    };

    const conflicts = loadStorage.filter(
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

    loadStorage.push(load);
    return load;
  });

export const updateServerLoad = createServerFn()
  .inputValidator(LoadSchema)
  .handler(({ data }) => {
    const index = loadStorage.findIndex((load) => load.id === data.id);

    const conflicts = loadStorage.filter(
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
      loadStorage[index] = data;
    }
    return data;
  });

export const deleteServerLoad = createServerFn()
  .inputValidator((data: { id: string }) => data)
  .handler(({ data }) => {
    const index = loadStorage.findIndex((load) => load.id === data.id);
    if (index !== -1) {
      loadStorage.splice(index, 1);
      return true;
    }
    // If the load doesn't exist, we consider it already "deleted"
    return true;
  });
