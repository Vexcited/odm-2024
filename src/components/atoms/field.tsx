import { TextField } from "@kobalte/core/text-field";
import type { Component } from "solid-js";

const Field: Component<{
  /** @default "text" */
  type?: "text" | "password" | "email"
  /** Permet d'afficher uniquement le pavé numérique au clavier sur mobile. */
  digits?: boolean

  label: string
  placeholder?: string
  required?: boolean

  value: string
  onUpdate: (value: string) => void
}> = (props) => {
  return (
    <TextField
      class="flex flex-col gap-2"
      value={props.value}
      onChange={(value) => props.onUpdate(value)}
    >
      <TextField.Label class="font-500">
        {props.label}
      </TextField.Label>

      <TextField.Input
        type={props.type}
        required={props.required}
        placeholder={props.placeholder}
        inputmode={props.digits ? "numeric" : void 0}
        class="bg-gray/15 rounded-full px-5 py-1.5 w-full outline-#1D52A0"
      />
    </TextField>
  );
};

export default Field;
