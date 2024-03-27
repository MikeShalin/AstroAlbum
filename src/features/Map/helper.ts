import { TILE } from "../../constant";

export const getStyle = (date: string) => {
  const tile = `${TILE}${date}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`;

  return {
    version: 8,
    sources: {
      gibs: {
        type: "raster",
        tiles: ["https://gibs-a.earthdata.nasa.gov/" + tile],
        tileSize: 256,
      },
    },
    layers: [
      {
        id: "gibs",
        type: "raster",
        source: "gibs",
        minzoom: 0,
        maxzoom: 8,
      },
    ],
  };
};
