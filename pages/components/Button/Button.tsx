import { FC, ReactNode, MouseEventHandler, CSSProperties } from "react";
import styles from "./Button.module.scss";

interface IButton {
  color: "white" | "orange";
  type: "small" | "large";
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<IButton> = ({ color, type, children, onClick }: IButton) => {
  return (
    <button
      className={type == "small" ? styles["btn"] : styles["btn__small"]}
      style={{
        backgroundColor: color == "white" ? "white" : "#ff671d",
        color: color == "white" ? "black" : "white",
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
