import { DialogDescription } from "@radix-ui/react-dialog";
import { isBefore } from "date-fns";
import { PackageOpenIcon, TruckIcon } from "lucide-react";
import { useMemo } from "react";
import { LoadForm } from "./form";
import type { LoadFormData } from "./form";
import type { Load } from "@/server/models";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function AddLoadDialog({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: LoadFormData) => unknown;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="flex flex-row items-center gap-8 border-b pb-2">
          <DialogTitle className="font-semibold">Create Load</DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden">
          Schedule a new load for a driver by filling out the form below.
        </DialogDescription>
        <LoadForm
          onCancel={() => onOpenChange(false)}
          onSubmit={(data) => onSubmit(data)}
        />
      </DialogContent>
    </Dialog>
  );
}

export function EditLoadDialog({
  load,
  onOpenChange,
  onSubmit,
  onDelete,
}: {
  load: Load | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Load) => unknown;
  onDelete: (data: Load) => unknown;
}) {
  const isComplete = useMemo(
    () => load?.end && isBefore(load.end, new Date()),
    [load],
  );

  const isStarted = useMemo(
    () => load?.start && isBefore(load.start, new Date()),
    [load],
  );

  return (
    <Dialog open={load !== null} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="flex flex-row items-center gap-8 border-b pb-2">
          <DialogTitle className="font-semibold">Edit Load</DialogTitle>
          {isComplete ? (
            <div
              className="flex items-center gap-2 rounded-full bg-neutral-500/20
                px-4 py-1 text-xs"
            >
              <PackageOpenIcon className="size-4" />
              Completed
            </div>
          ) : (
            isStarted && (
              <div
                className="flex items-center gap-2 rounded-full
                  bg-emerald-700/80 px-4 py-1 text-xs text-white"
              >
                <TruckIcon className="size-4" />
                In Progress
              </div>
            )
          )}
        </DialogHeader>
        <DialogDescription className="hidden">
          Edit an existing load for a driver by updating the form below.
        </DialogDescription>
        {load && (
          <LoadForm
            defaultValues={load}
            onCancel={() => onOpenChange(false)}
            onDelete={() => onDelete(load)}
            onSubmit={(data) => onSubmit({ ...load, ...data })}
            readOnly={isStarted || isComplete}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
