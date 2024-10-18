import type { APIResponseCheck } from "~/types/check";
import type { APIResponseAuth } from "~/types/auth";
import type { ErrorResponse } from "~/types/response";

import { createRoot, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import ky, { HTTPError } from "ky";

export default createRoot(() => {
  const [state, setState] = createStore({
    loading: true,
    token: localStorage.getItem("token"),

    email: null as string | null,
    fullName: null as string | null
  });

  const http = () => ky.extend({
    headers: {
      "Authorization": `Bearer ${state.token}`
    }
  });

  onMount(async () => {
    try {
      if (!state.token) return;
      setState("loading", true);

      const response = await http()
        .get("/api/check")
        .json<APIResponseCheck>();

      if (response.success) {
        setState({
          email: response.data.email,
          fullName: response.data.fullName ?? null
        });
      }
      else throw new Error(response.error);
    }
    catch {
      logout();
    }
    finally {
      setState("loading", false);
    }
  });

  const logout = (): void => {
    localStorage.removeItem("token");
    setState({ token: null, fullName: null, email: null });
  };

  const handleKyErrors = async (error: any): Promise<void> => {
    if (error instanceof HTTPError) {
      const json = await error.response.json<ErrorResponse>();
      throw new Error(json.error);
    }

    throw error;
  };

  const identify = async (email: string, password: string, otp?: string): Promise<void> => {
    try {
      const response = await ky
        .post("/api/auth", {
          json: { email, password, otp }
        })
        .json<APIResponseAuth>();

      if (response.success) {
        const token = response.data.token;

        localStorage.setItem("token", token);
        setState({ email, token });
      }
      else throw new Error(response.error);
    }
    catch (error) {
      return handleKyErrors(error);
    }
  };

  return {
    get loading (): boolean {
      return state.loading;
    },

    get fullName (): string | null {
      return state.fullName
        // sinon on retourne la partie avant le @ du mail
        ?? state.email?.split("@")?.[0]
        // sinon on abandonne
        ?? null;
    },

    get isAuthenticated (): boolean {
      return state.token !== null;
    },

    identify,
    logout
  };
});
