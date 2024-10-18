import { type Component } from "solid-js";

const PageHeading: Component<{
  title: string
  description: string
}> = (props) => {
  return (
    <div class="max-w-600px mx-auto mt-4 pb-6 mb-8 border-b">
      <h1 class="text-2xl font-600">
        {props.title}
      </h1>
      <p class="text-lg">
        {props.description}
      </p>
    </div>
  );
};

export default PageHeading;
