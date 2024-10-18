import { createSignal } from "solid-js";
import { DangerButton, PrimaryButton } from "~/components/atoms/button";
import Field from "~/components/atoms/field";
import Title from "~/meta/title";
import auth from "~/stores/auth";

export default function ProfileAccountPage () {
  const [fullName, setFullName] = createSignal(auth.fullName ?? "");
  const [email, setEmail] = createSignal(auth.email ?? "");

  const saveInformations = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();

  };

  const deleteAccount = async (): Promise<void> => {

  };

  return (
    <>
      <Title>
        mon compte
      </Title>

      <div>
        <h2 class="mb-6 text-2xl font-500">
          mes informations
        </h2>

        <form
          class="flex flex-col gap-4"
          onSubmit={saveInformations}
        >
          <Field
            label="nom d'affichage"
            placeholder="John DOE"
            value={fullName()}
            onUpdate={setFullName}
          />
          <Field
            type="email"
            label="votre adresse e-mail"
            placeholder="john.doe@worldskills.fr"
            value={email()}
            onUpdate={setEmail}
            required
          />

          <PrimaryButton
            type="submit"
            class="w-fit"
          >
            enregistrer
          </PrimaryButton>
        </form>


        <h2 class="my-6 text-2xl font-500">
          zone dangeureuse
        </h2>

        <DangerButton
          type="button"
          onClick={deleteAccount}
          class="bg-red/20 text-#561010"
        >
          supprimer mon compte
        </DangerButton>
      </div>
    </>
  );
}
