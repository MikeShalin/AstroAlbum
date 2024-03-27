import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import styles from "./index.module.scss";
import { Preview } from "../../components/Preview";
import { dateFormatISO } from "../../helpers";

interface IGallery {
  setDate: Function;
  today: string;
}

const getDays = (today: string) =>
  Array.from({ length: 5 }, (_, i) => {
    const firstDay = new Date(today);
    const date = new Date(firstDay.setDate(firstDay.getDate() - i - 1));
    return dateFormatISO(date);
  });

export const Gallery = memo(({ setDate, today }: IGallery) => {
  const INITIAL_DATES = [today, ...getDays(today)];
  const [dates, setDates] = useState(INITIAL_DATES);
  const listRef = useRef<null | HTMLUListElement>(null);

  const handleScroll = useCallback(() => {
    if (!listRef.current) {
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    if (scrollHeight - scrollTop === clientHeight) {
      setDates((prevState) => {
        const lastDate = new Date(prevState[prevState.length - 1]);
        const previousDay = new Date(lastDate.setDate(lastDate.getDate() - 1));
        return [...prevState, dateFormatISO(previousDay)];
      });
    }
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (list) {
      list.addEventListener("scroll", handleScroll);
      return () => list.removeEventListener("scroll", handleScroll);
    }
  }, [setDates, handleScroll]);

  return (
    <aside className={styles.container}>
      <h3 className={styles.header}>Галерея снимков</h3>
      <ul className={styles.list} ref={listRef}>
        {dates.map((date) => (
          <li key={date} className={styles.item}>
            <Preview date={date} setDate={setDate} />
          </li>
        ))}
      </ul>
    </aside>
  );
});
