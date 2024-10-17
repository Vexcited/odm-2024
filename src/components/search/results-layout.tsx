import { type Component } from "solid-js";

const SearchResultsLayout: Component<{
  amountOfPeople: number

  // filters
  continent?: string
  environment?: string
}> = (props) => {
  return (
    <section
      // on ajoute un identifiant pour que
      // la landing page puisse scroller vers le bas
      // lors de la confirmation.
      id="search-results"
      class="min-h-screen"
    >
      <div class="flex">
        {props.amountOfPeople} personne(s)

      </div>
      <div>



        <h2>
          voici ce que l'on a pour vous
        </h2>

      </div>
    </section>
  );
};

export default SearchResultsLayout;
