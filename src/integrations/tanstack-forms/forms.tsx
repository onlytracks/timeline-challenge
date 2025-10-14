import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./context";
import { FieldComponents } from "./field-components";
import { FormComponents } from "./form-components";

const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: FieldComponents,
  formComponents: FormComponents,
});

export { useAppForm, withFieldGroup, withForm };
