import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCallback, type ComponentProps } from "react";
import { useFormContext } from "./context";

function Form({ onSubmit, ...props }: ComponentProps<"form">) {
  const form = useFormContext();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onSubmit?.(e);
      void form.handleSubmit();
    },
    [onSubmit, form],
  );

  return <form onSubmit={handleSubmit} {...props} />;
}

function CancelButton({
  type = "button",
  variant = "ghost",
  ...props
}: ComponentProps<typeof Button>) {
  return <Button type={type} variant={variant} {...props} />;
}

function DeleteButton({
  type = "button",
  variant = "destructive",
  ...props
}: ComponentProps<typeof Button>) {
  return <Button type={type} variant={variant} {...props} />;
}

function SubmitButton({
  type = "submit",
  variant = "default",
  disabled,
  ...props
}: ComponentProps<typeof Button>) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          type={type}
          variant={variant}
          disabled={isSubmitting || disabled}
          // loading={isSubmitting}
          {...props}
        />
      )}
    </form.Subscribe>
  );
}

function ResetButton({
  type = "button",
  variant = "ghost",
  onClick,
  ...props
}: ComponentProps<typeof Button>) {
  const form = useFormContext();
  return (
    <Button
      type={type}
      variant={variant}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.reset();
        onClick?.(e);
      }}
      {...props}
    />
  );
}

const FormComponents = {
  CancelButton,
  DeleteButton,
  Form,
  ResetButton,
  Separator,
  SubmitButton,
};

export { FormComponents };
