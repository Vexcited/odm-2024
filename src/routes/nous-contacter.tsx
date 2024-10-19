import { TextField } from "@kobalte/core/text-field";
import ky from "ky";
import { batch, createSignal } from "solid-js";
import toast from "solid-toast";
import { PrimaryButton } from "~/components/atoms/button";
import Field from "~/components/atoms/field";
import PageHeading from "~/components/headers/page-heading";
import Title from "~/meta/title";
import auth from "~/stores/auth";

export default function ContactPage () {
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal(auth.email ?? "");
  const [message, setMessage] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  const handleMessage = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!name() || !email() || !message()) return;

      await ky.post("/api/message", {
        json: {
          name: name(),
          email: email(),
          message: message()
        }
      });

      toast.success("votre message a bien été envoyé");

      batch(() => {
        setMessage("");
      });
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Title>
        nous contacter
      </Title>

      <PageHeading
        title="nous contacter"
        description="remplissez ce formulaire afin de nous contacter, vous recevrez une copie par mail."
      />

      <form
        class="flex flex-col gap-4 max-w-600px mx-auto"
        onSubmit={handleMessage}
      >
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

        <TextField
          class="flex flex-col gap-2"
          value={message()}
          onChange={setMessage}
        >
          <TextField.Label class="font-500">
            contenu du message
          </TextField.Label>
          <TextField.TextArea
            class="bg-gray/15 rounded-2xl px-5 py-1.5 w-full outline-#1D52A0 min-h-50"
          />
        </TextField>

        <PrimaryButton
          type="submit"
          disabled={loading()}
        >
          envoyer le message
        </PrimaryButton>
      </form>
    </main>
  );
}
