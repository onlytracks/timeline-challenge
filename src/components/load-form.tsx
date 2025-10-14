import { createServerLoad } from "@/data/db";
import { Load, LoadSchema } from "@/data/models";
import { useAppForm } from "@/integrations/tanstack-forms/forms";
import { useDriversQuery } from "@/queries";
import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { format, parseISO } from "date-fns";
import { MoveRightIcon, PackageIcon, PackageOpenIcon } from "lucide-react";
import { ReactNode, useEffect, useMemo, useRef } from "react";
import { Field } from "./ui/field";
import { SelectItem } from "./ui/select";

type FormData = {
  id?: string;
  name: string;
  driverId: string;
  start: Date | null;
  end: Date | null;
};

export function LoadForm({
  defaultValues: _defaultValues,
  onCancel,
  onSubmit,
  onSubmitContent = "Create",
}: {
  defaultValues?: Partial<FormData>;
  onCancel: () => void;
  onSubmit: (data: Load) => Promise<void>;
  onSubmitContent?: ReactNode;
}) {
  const queryClient = useQueryClient();
  const createLoad = useServerFn(createServerLoad);
  const { data: drivers } = useDriversQuery();

  const defaultValues: FormData = useMemo(
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
      onSubmit: LoadSchema,
    },
    onSubmit: async (data) => {
      const result = await createLoad({ data: LoadSchema.parse(data.value) });
      await queryClient.invalidateQueries({ queryKey: ["loads"] });
      await onSubmit(result);
    },
  });

  const nameRef = useRef<HTMLInputElement>(null);
  useEffect(() => nameRef.current?.focus(), []);

  return (
    <form.AppForm>
      <form.Form className="flex flex-col gap-4">
        <form.AppField name="name">
          {(field) => <field.InputField ref={nameRef} label="Name" />}
        </form.AppField>
        <form.AppField name="driverId">
          {(field) => (
            <field.SelectField label="Driver">
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
              <field.InputField
                type="datetime-local"
                label={
                  <>
                    <PackageIcon className="size-4" /> Pickup
                  </>
                }
                className="w-fit"
                value={
                  field.state.value
                    ? format(field.state.value, "yyyy-MM-dd'T'HH:mm")
                    : ""
                }
                onChange={(e) =>
                  field.handleChange(
                    e.target.value.length ? parseISO(e.target.value) : null,
                  )
                }
              />
            )}
          </form.AppField>
          <Field className="hidden sm:flex">
            <div className="pt-9">
              <MoveRightIcon className="size-6 stroke-3 opacity-60" />
            </div>
          </Field>
          <form.AppField name="end">
            {(field) => (
              <field.InputField
                type="datetime-local"
                label={
                  <>
                    <PackageOpenIcon className="size-4" /> Dropoff
                  </>
                }
                className="w-fit"
                value={
                  field.state.value
                    ? format(field.state.value, "yyyy-MM-dd'T'HH:mm")
                    : ""
                }
                onChange={(e) =>
                  field.handleChange(
                    e.target.value.length ? parseISO(e.target.value) : null,
                  )
                }
              />
            )}
          </form.AppField>
        </div>
        <div className="flex items-center justify-end gap-2">
          <form.CancelButton onClick={onCancel}>Cancel</form.CancelButton>
          <form.SubmitButton>{onSubmitContent}</form.SubmitButton>
        </div>
      </form.Form>
    </form.AppForm>
  );
}
