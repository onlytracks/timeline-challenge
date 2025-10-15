import { Load, LoadSchema } from "@/data/models";
import { useAppForm } from "@/integrations/tanstack-forms/forms";
import { useDriversQuery } from "@/queries";
import { addHours, isAfter, isBefore } from "date-fns";
import { MoveRightIcon, PackageIcon, PackageOpenIcon } from "lucide-react";
import { ReactNode, useEffect, useMemo, useRef } from "react";
import z from "zod";
import { Field } from "./ui/field";
import { SelectItem } from "./ui/select";

const LoadFormSchema = LoadSchema.omit({ id: true });
export type LoadFormData = z.output<typeof LoadFormSchema>;

export function LoadForm({
  defaultValues: _defaultValues,
  onCancel,
  onDelete,
  onSubmit,
  onSubmitContent = "Save",
  readOnly = false,
}: {
  defaultValues?: Partial<Load>;
  onCancel: () => unknown;
  onDelete?: () => unknown;
  onSubmit?: (data: LoadFormData) => unknown;
  onSubmitContent?: ReactNode;
  readOnly?: boolean;
}) {
  const { data: drivers } = useDriversQuery();

  const defaultValues = useMemo(
    () => ({
      name: _defaultValues?.name ?? "",
      driverId: _defaultValues?.driverId ?? "",
      start: _defaultValues?.start ?? new Date(),
      end: _defaultValues?.end ?? null,
    }),
    [_defaultValues],
  );

  const form = useAppForm({
    defaultValues,
    validators: {
      onSubmit: LoadFormSchema,
    },
    onSubmit: async (data) => {
      if (readOnly) return;
      await onSubmit?.(LoadFormSchema.parse(data.value));
    },
  });

  const nameRef = useRef<HTMLInputElement>(null);
  useEffect(() => nameRef.current?.focus(), []);

  return (
    <form.AppForm>
      <form.Form className="flex flex-col gap-4">
        <form.AppField name="name">
          {(field) => (
            <field.InputField ref={nameRef} label="Name" readOnly={readOnly} />
          )}
        </form.AppField>
        <form.AppField name="driverId">
          {(field) => (
            <field.SelectField label="Driver" readOnly={readOnly}>
              {drivers?.map((driver) => (
                <SelectItem key={driver.id} value={driver.id}>
                  {driver.name}
                </SelectItem>
              ))}
            </field.SelectField>
          )}
        </form.AppField>
        <div className="flex flex-col gap-4 sm:flex-row">
          <form.AppField name="start">
            {(field) => (
              <field.InputDateTimeField
                label={
                  <>
                    <PackageIcon className="size-4" /> Pickup
                  </>
                }
                className="w-fit"
                readOnly={readOnly}
              />
            )}
          </form.AppField>
          <Field className="hidden sm:flex">
            <div className="pt-9">
              <MoveRightIcon className="size-6 stroke-3 opacity-60" />
            </div>
          </Field>
          <form.Subscribe selector={(state) => state.values.start}>
            {(start) => (
              <form.AppField
                name="end"
                validators={{
                  onChange: ({ value }) => {
                    if (value && isBefore(value, start)) {
                      return "Must be after start date";
                    }
                    if (value && isAfter(value, addHours(start, 24))) {
                      return "Cannot be longer than 24 hours";
                    }
                  },
                }}
              >
                {(field) => (
                  <field.InputDateTimeField
                    label={
                      <>
                        <PackageOpenIcon className="size-4" /> Dropoff
                      </>
                    }
                    className="w-fit"
                    readOnly={readOnly}
                  />
                )}
              </form.AppField>
            )}
          </form.Subscribe>
        </div>
        <div className="ml-auto grid w-fit grid-flow-col auto-cols-fr gap-2">
          <form.CancelButton onClick={onCancel}>
            {readOnly ? "Close" : "Cancel"}
          </form.CancelButton>
          {!readOnly && onDelete && (
            <form.DeleteButton onClick={onDelete}>Delete</form.DeleteButton>
          )}
          {!readOnly && (
            <form.SubmitButton>{onSubmitContent}</form.SubmitButton>
          )}
        </div>
      </form.Form>
    </form.AppForm>
  );
}
