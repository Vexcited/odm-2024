import { createEffect, createSignal, Show } from "solid-js";
import Field from "~/components/atoms/field";
import Title from "~/meta/title";
import auth from "~/stores/auth";
import { useNavigate } from "@solidjs/router";

export default function AuthPage () {
  const navigate = useNavigate();

  createEffect(() => {
    if (auth.isAuthenticated)
      navigate("/profile/compte");
  });

  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [otp, setOTP] = createSignal("");

  const [showOTP, setShowOTP] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    if (!email() || !password())
      return;

    setLoading(true);
    setError(null);

    try {
      await auth.identify(email(), password(), otp());
      navigate("/");
    }
    catch (error) {
      if (error instanceof Error) {
        // TODO: faire un field spécial pour éviter cette vérification douteuse
        if (error.message.includes("OTP a été envoyé")) {
          setShowOTP(true);
        }

        setError(error.message);
      }
      else {
        setError("une erreur inconnue est survenue");
      }
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Title>
        identification
      </Title>

      <form class="flex flex-col gap-4 max-w-300px mx-auto"
        onSubmit={handleSubmit}
      >
        <Show when={error()}>
          {(error) => (
            <div>
              <p>
                {error()}
              </p>
            </div>
          )}
        </Show>

        <Show when={!showOTP()}>
          <Field
            type="email"
            label="votre adresse e-mail"
            value={email()}
            onUpdate={setEmail}
            placeholder="john.doe@worldskills.fr"
          />

          <Field
            type="password"
            label="mot de passe"
            value={password()}
            onUpdate={setPassword}
          />
        </Show>

        <Show when={showOTP()}>
          <Field
            digits
            type="text"
            label="OTP"
            value={otp()}
            onUpdate={setOTP}
          />
        </Show>

        <button
          type="submit"
          disabled={loading()}
          class="bg-[#1D52A0] text-white px-4 py-2 rounded-full mt-4 disabled:opacity-60"
        >
          s'identifier
        </button>
      </form>
    </main>
  );
}
