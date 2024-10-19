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

    const icon = L.icon({
      iconUrl: "/map-marker.png",
      iconSize: [20, 20],
      iconAnchor: [0, 0]
    });

    L.marker(position, { icon }).addTo(map);

    onCleanup(() => {
      map.remove();
    });
  }));

  return (
    <div ref={mapContainerRef} class={props.class} />
  );
};

export default Map;
