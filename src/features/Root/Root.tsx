import { FC, ReactNode } from "react";
import styles from "./index.module.scss";

interface IRoot {
  children: ReactNode[];
}

export const Root: FC<IRoot> = ({ children }) => (
  <main className={styles.container}>{children}</main>
);
