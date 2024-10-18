import { ParentComponent } from "solid-js";

export const PrimaryButton: ParentComponent<{
  type: "button" | "submit"
  disabled?: boolean
  onClick?: () => void,
  class?: string
}> = (props) => {
  return (
    <button
      type={props.type}
      disabled={props.disabled}
      onClick={() => props.onClick?.()}
      class={`${props.class ?? ""} bg-[#1D52A0] hover:bg-#1D52A0/90 focus:(bg-#1D52A0 outline-#1D52A0 outline-offset-2) text-white px-4 py-2 rounded-full disabled:opacity-60`}
    >
      {props.children}
    </button>
  );
};

export const DangerButton: ParentComponent<{
  type: "button" | "submit"
  disabled?: boolean
  onClick?: () => void
  class?: string
}> = (props) => {
  return (
    <button
      type={props.type}
      disabled={props.disabled}
      onClick={() => props.onClick?.()}
      class={`${props.class ?? ""} hover:(bg-red/20 text-#561010) font-500 px-4 py-2 rounded-full transition-colors`}
    >
      {props.children}
    </button>
  );
};
