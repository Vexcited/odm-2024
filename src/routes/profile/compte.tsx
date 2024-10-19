import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import toast from "solid-toast";
import { DangerButton, PrimaryButton } from "~/components/atoms/button";
import Field from "~/components/atoms/field";
import Title from "~/meta/title";
import auth from "~/stores/auth";

export default function ProfileAccountPage () {
  const navigate = useNavigate();

  const [fullName, setFullName] = createSignal(auth.fullName ?? "");
  const [email, setEmail] = createSignal(auth.email ?? "");
  const [loading, setLoading] = createSignal(false);

  const saveInformations = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();

  };

  const deleteAccount = async (): Promise<void> => {
    try {
      setLoading(true);

      const response = await auth.http()
        .delete("/api/profile/account")
        .json<{ success: boolean }>();

      if (response.success) logout();
      else {
        toast.error("une erreur s'est produite lors de la suppression de votre compte");
      }
    }
    finally {
      setLoading(false);
    }
  };

  const logout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <>
      <Title>
        mon compte
      </Title>

      <main class="space-y-12">
        <section class="max-w-400px mx-auto md:mx-0">
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
              disabled
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
        </section>

        <section class="max-w-400px mx-auto md:mx-0">
          <h2 class="my-6 text-2xl font-500">
            zone dangeureuse
          </h2>

          <div class="flex flex-col gap-4">
            <DangerButton
              type="button"
              disabled={loading()}
              onClick={deleteAccount}
              class="bg-red/20 text-#561010 disabled:opacity-80"
            >
              supprimer mon compte
            </DangerButton>

            <DangerButton
              type="button"
              disabled={loading()}
              onClick={logout}
              class="mt-6 md:hidden disabled:opacity-80"
            >
              se déconnecter
            </DangerButton>
          </div>

        </section>
      </main>
    </>
  );
}
