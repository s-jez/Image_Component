import { FC } from "react";
import styles from "./Button.module.scss";

interface IButton {
  color: "white" | "orange";
  type: "small" | "large";
  children: React.ReactNode;
}

const Button: FC<IButton> = ({ color, type, children }: IButton) => {
  return (
    <button
      className={type == "small" ? styles["btn"] : styles["btn__small"]}
      style={{
        backgroundColor: color == "white" ? "white" : "#ff671d",
        color: color == "white" ? "black" : "white",
      }}
    >
      {children}
    </button>
  );
};
export default Button;
