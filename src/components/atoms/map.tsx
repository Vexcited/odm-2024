import { createEffect, on, onCleanup, type Component } from "solid-js";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Map: Component<{
  class: string
  latitude: number
  longitude: number
}> = (props) => {
  let mapContainerRef: HTMLDivElement | undefined;

  createEffect(on([() => props.latitude, () => props.longitude], (position) => {
    if (!mapContainerRef) return;
    const map = L.map(mapContainerRef)
      .setView(position, 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
    }).addTo(map);

    L.marker(position).addTo(map);

    onCleanup(() => {
      map.remove();
    });
  }));

  return (
    <div ref={mapContainerRef} class={props.class} />
  );
};

export default Map;
