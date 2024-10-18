import { type Component, For, type Setter } from "solid-js";
// import IconMdiAccount from "~icons/mdi/account";
import IconMdiMinus from "~icons/mdi/minus";
import IconMdiPlus from "~icons/mdi/plus";

const PeopleSelector: Component<{
  amountOfPeople: number
  setAmountOfPeople: Setter<number>
}> = (props) => {
  return (
    <div class="flex flex-col gap-1">
      <div class="flex items-center gap-4">
        <button
          type="button"
          disabled={props.amountOfPeople <= 1}
          class="font-500 h-10 w-10 bg-gray/15 rounded-full flex items-center justify-center disabled:(opacity-50) hover:bg-gray/20 focus:(outline-offset-2 outline-gray-500 bg-gray/30) transition-colors"
          onClick={() => props.setAmountOfPeople((prev) => prev - 1)}
        >
          <IconMdiMinus />
        </button>

        <p class="text-lg w-2ch text-center">
          {props.amountOfPeople}
        </p>

        <button
          type="button"
          disabled={props.amountOfPeople >= 4}
          class="font-500 h-10 w-10 bg-gray/15 rounded-full flex items-center justify-center disabled:(opacity-50) hover:bg-gray/20 focus:(outline-offset-2 outline-gray-500 bg-gray/30) transition-colors"
          onClick={() => props.setAmountOfPeople((prev) => prev + 1)}
        >
          <IconMdiPlus />
        </button>


      </div>
    </div>
  );
};

export default PeopleSelector;
