import z from "zod";

export const DriverSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, "Required")
    .default(() => crypto.randomUUID()),
  name: z.string().trim().min(1, "Required"),
});
export type Driver = z.output<typeof DriverSchema>;

export const LoadSchema = z.object({
  id: z.string().trim().min(1, "Required"),
  name: z.string().trim().min(1, "Required").max(35, "Max 35 characters"),
  driverId: z.string().trim().min(1, "Required"),
  start: z.date("Required").min(new Date(), "Start date must be in the future"),
  end: z.date("Required"),
});
export type Load = z.output<typeof LoadSchema>;
