import { Component, createMemo } from "solid-js";

const DateSelector: Component<{
  class: string
  value: Date
  onUpdate: (value: Date) => void
}> = (props) => {
  const value = createMemo(() =>
    props.value &&
    !Number.isNaN(
      typeof props.value === "number" ? props.value : props.value.getTime()
    )
      ? new Date(props.value).toISOString().split("T", 1)[0]
      : ""
  );

  return (
    <input
      type="date"
      class={props.class}
      value={value()}
      onChange={(event) => {
        const value = event.currentTarget.value;
        props.onUpdate(new Date(value));
      }}
    />
  );
};

export default DateSelector;
