# Data Generation for Drivers and Loads

## Drivers

Create a Driver interface with:

- id: unique identifier
- name: the driver's name

Create a static array of 25 drivers with random common first names that don't repeat.

### Example:

```
const driverStorage: Driver[] = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  // ... more drivers
];
```

## Loads

Create a Load interface with:

- id: unique identifier
- availableHour: the hour of day the load can be picked up on or after
- durationHours: how many hours the load takes to complete

Create a static array of 100 loads that can be used to generate a schedule. The availableHour should be between 6am and 8pm, and durationHours should be between 2 and 24 hours, with a preference for medium and longer loads.

### Example:

```
const loadStorage: Load[] = [
  { id: "1", availableHour: 8, durationHours: 5 },
  { id: "2", availableHour: 14, durationHours: 12 },
  // ... more loads
];
```

## Events

Create an Event interface with:

- id: unique identifier
- driverId: the id of the driver assigned to this event
- loadId: the id of the load assigned to this event
- start: the start date and time of the event
- end: the end date and time of the event

Create a `buildSchedule` function that accepts a `startDate` date argument, an `endDate` argument, a list of loads, and a list of drivers. This function will assign the loads to the drivers in a round-robin fashion starting from the given startDate. Each load should be scheduled following these rules:

- Loads can only be picked up on or after their `availableHour`.
- Loads should be scheduled to start as soon as possible after their `availableHour`.
- Drivers can only have one load assigned at a time.
- Drivers should have at least a 1 hour break between loads.
- Loads should be distributed evenly among drivers to equally share the number of hours worked.
- The schedule should start from the given startDate with the last load being picked up before the endDate. Loads can extend beyond this period if necessary, but should only be picked up within this period.
- Drivers should have a 2 consecutive day break (no loads) within any 7 day period. Prefer (Fri-Sat) or (Sat-Sun) or (Sun-Mon).
- Loads should be distributed throughout the day, but avoid starting loads between 8pm and 6am.

Loop over the loads as many times as necessary to fill the schedule for all drivers. The goal is to create a realistic schedule for demo purposes.

### Example:

```
const events = buildSchedule(new Date(), addDays(new Date(), 14), loadStorage, driverStorage);
```

## Additional Notes

Don't concern yourself with timezones, just use local time.

Think about this before implementing it. Ask any clarifying questions. YAGNI. Do not invent new requirements. Include descriptive comments with the code to explain why you did something a certain way if it isn't obvious, especially date math.

create these functions and interfaces in src/data/db.ts
