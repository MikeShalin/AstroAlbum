import { useRef, useEffect, memo, FC, useState } from "react";

import styles from "./index.module.scss";
import { getStyle } from "./helper";
import loadingIcon from "../../shared/icons/loading.svg";

interface IMap {
  date: string;
}

export const Map: FC<IMap> = memo(({ date }) => {
  const map = useRef<maplibregl | null>(null);
  const style = useRef(getStyle(date));
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    map.current = new maplibregl.Map({
      container: "map",
      style: style.current,
      center: [0, 0],
      minZoom: 0,
      maxZoom: 7,
      zoom: 1,
    });
    if (map.current) {
      map.current.on("styledata", () => {
        setLoading(true);
      });

      map.current.on("idle", () => {
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    if (map.current) {
      style.current = getStyle(date);
      map.current.setStyle(style.current);
    }
  }, [date]);

  return (
    <div className={styles.container}>
      <div
        className={styles.map}
        style={{ display: loading ? "none" : "flex" }}
        id="map"
      />
      <img
        className={styles.loader}
        src={loadingIcon}
        style={{ display: loading ? "flex" : "none" }}
        alt="loading map"
      />
    </div>
  );
});
