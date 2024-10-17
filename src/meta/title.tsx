import type { ParentComponent } from "solid-js";
import { Title as DocumentTitle } from "@solidjs/meta";

const Title: ParentComponent = (props) => (
  <DocumentTitle>
    worldskills — travel {props.children ? " : " + props.children : ""}
  </DocumentTitle>
);

export default Title;
