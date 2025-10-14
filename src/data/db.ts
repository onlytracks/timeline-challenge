export interface Driver {
  id: string;
  name: string;
}

export interface Load {
  id: string;
  availableHour: number;
  durationHours: number;
}

export interface Event {
  id: string;
  driverId: string;
  loadId: string;
  start: Date;
  end: Date;
}

const driverStorage: Driver[] = [
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

const loadStorage: Load[] = [
  { id: "1", availableHour: 8, durationHours: 12 },
  { id: "2", availableHour: 6, durationHours: 18 },
  { id: "3", availableHour: 10, durationHours: 8 },
  { id: "4", availableHour: 14, durationHours: 15 },
  { id: "5", availableHour: 7, durationHours: 22 },
  { id: "6", availableHour: 12, durationHours: 10 },
  { id: "7", availableHour: 9, durationHours: 16 },
  { id: "8", availableHour: 15, durationHours: 6 },
  { id: "9", availableHour: 11, durationHours: 20 },
  { id: "10", availableHour: 6, durationHours: 14 },
  { id: "11", availableHour: 13, durationHours: 9 },
  { id: "12", availableHour: 8, durationHours: 24 },
  { id: "13", availableHour: 16, durationHours: 11 },
  { id: "14", availableHour: 10, durationHours: 17 },
  { id: "15", availableHour: 7, durationHours: 13 },
  { id: "16", availableHour: 14, durationHours: 19 },
  { id: "17", availableHour: 9, durationHours: 7 },
  { id: "18", availableHour: 12, durationHours: 21 },
  { id: "19", availableHour: 6, durationHours: 5 },
  { id: "20", availableHour: 18, durationHours: 15 },
  { id: "21", availableHour: 11, durationHours: 12 },
  { id: "22", availableHour: 8, durationHours: 8 },
  { id: "23", availableHour: 15, durationHours: 16 },
  { id: "24", availableHour: 7, durationHours: 10 },
  { id: "25", availableHour: 13, durationHours: 14 },
  { id: "26", availableHour: 10, durationHours: 18 },
  { id: "27", availableHour: 6, durationHours: 22 },
  { id: "28", availableHour: 16, durationHours: 9 },
  { id: "29", availableHour: 9, durationHours: 13 },
  { id: "30", availableHour: 14, durationHours: 20 },
  { id: "31", availableHour: 8, durationHours: 11 },
  { id: "32", availableHour: 12, durationHours: 17 },
  { id: "33", availableHour: 7, durationHours: 6 },
  { id: "34", availableHour: 11, durationHours: 15 },
  { id: "35", availableHour: 15, durationHours: 19 },
  { id: "36", availableHour: 6, durationHours: 24 },
  { id: "37", availableHour: 10, durationHours: 12 },
  { id: "38", availableHour: 13, durationHours: 8 },
  { id: "39", availableHour: 9, durationHours: 14 },
  { id: "40", availableHour: 17, durationHours: 10 },
  { id: "41", availableHour: 8, durationHours: 16 },
  { id: "42", availableHour: 12, durationHours: 21 },
  { id: "43", availableHour: 6, durationHours: 7 },
  { id: "44", availableHour: 14, durationHours: 13 },
  { id: "45", availableHour: 11, durationHours: 18 },
  { id: "46", availableHour: 7, durationHours: 9 },
  { id: "47", availableHour: 16, durationHours: 15 },
  { id: "48", availableHour: 10, durationHours: 22 },
  { id: "49", availableHour: 13, durationHours: 11 },
  { id: "50", availableHour: 9, durationHours: 20 },
  { id: "51", availableHour: 6, durationHours: 12 },
  { id: "52", availableHour: 15, durationHours: 8 },
  { id: "53", availableHour: 8, durationHours: 17 },
  { id: "54", availableHour: 12, durationHours: 14 },
  { id: "55", availableHour: 7, durationHours: 19 },
  { id: "56", availableHour: 11, durationHours: 6 },
  { id: "57", availableHour: 14, durationHours: 16 },
  { id: "58", availableHour: 10, durationHours: 24 },
  { id: "59", availableHour: 6, durationHours: 10 },
  { id: "60", availableHour: 18, durationHours: 13 },
  { id: "61", availableHour: 9, durationHours: 15 },
  { id: "62", availableHour: 13, durationHours: 21 },
  { id: "63", availableHour: 8, durationHours: 9 },
  { id: "64", availableHour: 16, durationHours: 12 },
  { id: "65", availableHour: 11, durationHours: 18 },
  { id: "66", availableHour: 7, durationHours: 14 },
  { id: "67", availableHour: 15, durationHours: 22 },
  { id: "68", availableHour: 10, durationHours: 7 },
  { id: "69", availableHour: 12, durationHours: 11 },
  { id: "70", availableHour: 6, durationHours: 16 },
  { id: "71", availableHour: 14, durationHours: 20 },
  { id: "72", availableHour: 9, durationHours: 8 },
  { id: "73", availableHour: 17, durationHours: 13 },
  { id: "74", availableHour: 8, durationHours: 19 },
  { id: "75", availableHour: 13, durationHours: 15 },
  { id: "76", availableHour: 11, durationHours: 24 },
  { id: "77", availableHour: 7, durationHours: 10 },
  { id: "78", availableHour: 16, durationHours: 17 },
  { id: "79", availableHour: 10, durationHours: 6 },
  { id: "80", availableHour: 6, durationHours: 12 },
  { id: "81", availableHour: 15, durationHours: 14 },
  { id: "82", availableHour: 9, durationHours: 21 },
  { id: "83", availableHour: 12, durationHours: 9 },
  { id: "84", availableHour: 8, durationHours: 18 },
  { id: "85", availableHour: 14, durationHours: 11 },
  { id: "86", availableHour: 11, durationHours: 16 },
  { id: "87", availableHour: 7, durationHours: 22 },
  { id: "88", availableHour: 18, durationHours: 8 },
  { id: "89", availableHour: 10, durationHours: 13 },
  { id: "90", availableHour: 13, durationHours: 20 },
  { id: "91", availableHour: 6, durationHours: 15 },
  { id: "92", availableHour: 16, durationHours: 10 },
  { id: "93", availableHour: 9, durationHours: 17 },
  { id: "94", availableHour: 12, durationHours: 24 },
  { id: "95", availableHour: 8, durationHours: 7 },
  { id: "96", availableHour: 15, durationHours: 12 },
  { id: "97", availableHour: 11, durationHours: 19 },
  { id: "98", availableHour: 7, durationHours: 14 },
  { id: "99", availableHour: 14, durationHours: 16 },
  { id: "100", availableHour: 10, durationHours: 21 },
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

function buildSchedule(
  startDate: Date,
  endDate: Date,
  loads: Load[],
  drivers: Driver[],
): Event[] {
  const events: Event[] = [];
  const driverStates: DriverState[] = drivers.map((driver) => ({
    driver,
    nextAvailable: new Date(startDate),
    totalHours: 0,
    lastBreakEnd: null,
  }));

  let loadIndex = 0;
  let eventIdCounter = 1;
  let currentTime = new Date(startDate);
  const maxIterations = loads.length * drivers.length * 100;
  let iterations = 0;

  while (currentTime < endDate && iterations < maxIterations) {
    iterations++;
    const load = loads[loadIndex];

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
      loadIndex = (loadIndex + 1) % loads.length;
      if (loadIndex === 0) {
        currentTime = new Date(currentTime.getTime() + 3600000);
      }
      continue;
    }

    const endTime = new Date(
      startTime.getTime() + load.durationHours * 3600000,
    );

    events.push({
      id: String(eventIdCounter++),
      driverId: driverWithMinHours.driver.id,
      loadId: load.id,
      start: startTime,
      end: endTime,
    });

    driverWithMinHours.nextAvailable = new Date(endTime.getTime() + 3600000);
    driverWithMinHours.totalHours += load.durationHours;

    loadIndex = (loadIndex + 1) % loads.length;

    const minNextAvailable = Math.min(
      ...driverStates.map((ds) => ds.nextAvailable.getTime()),
    );
    currentTime = new Date(Math.max(currentTime.getTime(), minNextAvailable));
  }

  return events.sort((a, b) => a.start.getTime() - b.start.getTime());
}

const eventStorage: Event[] = buildSchedule(
  new Date(),
  new Date(Date.now() + 14 * 24 * 3600000), // 14 days
  loadStorage,
  driverStorage,
);

export function getDrivers() {
  return driverStorage;
}

export function getDriver(id: string) {
  return driverStorage.find((driver) => driver.id === id) || null;
}

export function getLoads() {
  return loadStorage;
}

export function getLoad(id: string) {
  return loadStorage.find((load) => load.id === id) || null;
}

export function getEvents() {
  return eventStorage;
}

export function getEvent(id: string) {
  return eventStorage.find((event) => event.id === id) || null;
}
