import Button from "../../Button/Button";
import CustomImage from "../Custom/CustomImage";
import styles from "./ImageContainer.module.scss";

const ImageContainer = () => {
  return (
    <div className={styles.container}>
      <span className={styles["container__heading"]}>Zdjęcie profilowe</span>
      <p className={styles["container__text"]}>
        Dodaj lub zmień obecne zdjęcie profilowe
      </p>
      <Button text="Dodaj zdjęcie" color="white" type="small" />
      <CustomImage />
      <div className={styles["container__btns"]}>
        <Button text="Anuluj" color="white" type="large" />
        <Button text="Zapisz zmiany" color="orange" type="large" />
      </div>
    </div>
  );
};
export default ImageContainer;
