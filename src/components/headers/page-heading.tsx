import { type Component } from "solid-js";

const PageHeading: Component<{
  title: string
  description: string
}> = (props) => {
  return (
    <div>
      <h1>
        {props.title}
      </h1>
      <p>
        {props.description}
      </p>
    </div>
  );
};

export default PageHeading;
