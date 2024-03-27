import { useEffect, useState } from "react";
import axios from "axios";
import { TILE } from "../constant";

export const usePreview = (date: string) => {
  const [success, setSuccess] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetch = async () => {
      const PIC = `https://gibs-a.earthdata.nasa.gov/${TILE}/${date}/GoogleMapsCompatible_Level9/0/0/0.jpg`;
      setLoading(true);
      try {
        const result = await axios.get(PIC, { responseType: "blob" });
        const imageObjectURL = URL.createObjectURL(result.data);
        setSuccess(imageObjectURL);
        setError(null);
        setLoading(false);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        }
        setSuccess(null);
        setLoading(false);
      }
    };
    fetch();
  }, [date]);

  return {
    success,
    loading,
    error,
  };
};
