import { createSignal } from "solid-js";
import Field from "~/components/atoms/field";

export default function ContactPage () {
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [message, setMessage] = createSignal("");

  return (
    <main>
      <form class="flex flex-col gap-4 max-w-600px mx-auto">
        <Field
          label="votre nom"
          value={name()}
          onUpdate={setName}
          placeholder="John DOE"
        />

        <Field
          type="email"
          label="votre adresse e-mail"
          value={email()}
          onUpdate={setEmail}
          placeholder="john.doe@worldskills.fr"
        />

        <textarea>
          {message()}
        </textarea>

        <button
          type="submit"
          class="bg-[#1D52A0] text-white max-w-200px ml-auto px-4 py-2 rounded-full mt-4"
        >
          envoyer le message
        </button>
      </form>
    </main>
  );
}
