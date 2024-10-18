import type { Component } from "solid-js";
import LongLogo from "~/assets/long-logo";

const Footer: Component = () => {
  return (
    <footer class="border-t p-8 mt-16 bg-gray-50">
      <div>
        <LongLogo />

        <p class="mt-4">
          La plateforme pour réserver des séjours chez l'habitant.
        </p>

        <p class="text-black/65">
          Réalisé dans le cadre des Olympiades des Métiers 2024
        </p>
      </div>
    </footer>
  );
};

export default Footer;
