import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useId, type ComponentProps, type ReactNode } from "react";
import { useFieldContext } from "./context";
import { format, parseISO } from "date-fns";

function useFieldId(id?: string) {
  const internalId = useId();
  return id ?? internalId;
}

function InputField({
  type = "text",
  label,
  description,
  className,
  ...props
}: ComponentProps<typeof Input> & {
  label?: ReactNode;
  description?: ReactNode;
}) {
  const id = useFieldId(props.id);
  const field = useFieldContext<string | null>();
  const hasError = field.state.meta.errors.length > 0;
  return (
    <Field
      data-field="text"
      data-label={label ? "true" : undefined}
      className={className}
    >
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        type={type}
        value={field.state.value ?? ""}
        onBlur={field.handleBlur}
        onChange={(e) =>
          field.handleChange(e.target.value.length > 0 ? e.target.value : null)
        }
        aria-invalid={hasError ? "true" : undefined}
        {...props}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError errors={field.state.meta.errors} />
    </Field>
  );
}

function InputDateTimeField({
  label,
  description,
  className,
  ...props
}: Omit<ComponentProps<typeof Input>, "type" | "value" | "onChange"> & {
  label?: ReactNode;
  description?: ReactNode;
}) {
  const id = useFieldId(props.id);
  const field = useFieldContext<Date | null>();
  const hasError = field.state.meta.errors.length > 0;
  return (
    <Field
      data-field="text"
      data-label={label ? "true" : undefined}
      className={className}
    >
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        type="datetime-local"
        value={
          field.state.value
            ? format(field.state.value, "yyyy-MM-dd'T'HH:mm")
            : ""
        }
        onBlur={field.handleBlur}
        onChange={(e) =>
          field.handleChange(
            e.target.value.length ? parseISO(e.target.value) : null,
          )
        }
        aria-invalid={hasError ? "true" : undefined}
        {...props}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError errors={field.state.meta.errors} />
    </Field>
  );
}

function SelectField({
  label,
  description,
  className,
  placeholder,
  children,
  ...props
}: ComponentProps<typeof SelectTrigger> & {
  label?: ReactNode;
  description?: ReactNode;
  placeholder?: string;
  className?: string;
}) {
  const id = useFieldId(props.id);
  const field = useFieldContext<string | null>();
  const hasError = field.state.meta.errors.length > 0;

  return (
    <Field
      data-field="select"
      data-label={label ? "true" : undefined}
      className={className}
    >
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Select
        value={field.state.value ?? ""}
        onValueChange={(val) => field.handleChange(val)}
      >
        <SelectTrigger
          id={id}
          aria-invalid={hasError ? "true" : undefined}
          {...props}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError errors={field.state.meta.errors} />
    </Field>
  );
}

const FieldComponents = {
  InputField,
  InputDateTimeField,
  SelectField,
};

export { FieldComponents };
