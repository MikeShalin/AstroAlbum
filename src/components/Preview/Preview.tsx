import { BaseSyntheticEvent, FC, memo } from "react";

import { usePreview } from "../../hook/usePreview";
import { useDateFormat } from "../../hook/useDateFormat";
import loadingIcon from "../../shared/icons/loading.svg";
import errorIcon from "./error.svg";

import styles from "./index.module.scss";

interface IPreview {
  date: string;
  setDate: Function;
}

export const Preview: FC<IPreview> = memo(({ date, setDate }) => {
  const formatDate = useDateFormat(date);

  const { success, loading, error } = usePreview(date);
  const handleClick = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDate(date);
  };
  if (error) {
    return (
      <div>
        <img className={styles.img} src={errorIcon} alt="Error" />
        <div>{formatDate}</div>
      </div>
    );
  }
  return (
    <button className={styles.box} type="button" onClick={handleClick}>
      <img
        className={styles.img}
        src={(loading ? loadingIcon : success) ?? ""}
        alt="Astra"
      />
      <div>{formatDate}</div>
    </button>
  );
});
