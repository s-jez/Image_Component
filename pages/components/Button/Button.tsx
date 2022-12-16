import { FC } from "react";
import styles from "./Button.module.scss";

interface IButton {
  text: string;
  color: "white" | "orange";
  type: "small" | "large";
}

const Button: FC<IButton> = ({ text, color, type }: IButton) => {
  return (
    <button
      className={type == "small" ? styles["btn"] : styles["btn__small"]}
      style={{
        backgroundColor: color == "white" ? "white" : "#ff671d",
        color: color == "white" ? "black" : "white",
      }}
    >
      {text}
    </button>
  );
};
export default Button;
