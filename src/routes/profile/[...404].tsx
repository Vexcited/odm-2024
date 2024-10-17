import { Navigate } from "@solidjs/router";

export default function ProfileNotFound() {
  return (
    <Navigate href="/profile/compte" />
  );
}
