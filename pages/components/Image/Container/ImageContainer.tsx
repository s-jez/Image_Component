import Button from "../../Button/Button";
import CustomImage from "../Custom/CustomImage";
import styles from "./ImageContainer.module.scss";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const ImageContainer = () => {
  return (
    <div className={styles.container}>
      <span className={styles["container__heading"]}>Zdjęcie profilowe</span>
      <p className={styles["container__text"]}>
        Dodaj lub zmień obecne zdjęcie profilowe
      </p>
      <Button color="white" type="small">
        <label htmlFor="files" className={styles.label}>
          Dodaj zdjęcie
        </label>
      </Button>
      <input type="file" id="files" className={styles.file} />
      <CustomImage />
      <div className={styles["container__slider"]}>
        <button>
          <AiOutlineMinus />
        </button>
        <input type="range" min="1" max="100" className={styles.slider} />
        <button>
          <AiOutlinePlus />
        </button>
      </div>
      <div className={styles["container__btns"]}>
        <Button color="white" type="large">
          Anuluj
        </Button>
        <Button color="orange" type="large">
          Zapisz zmiany
        </Button>
      </div>
    </div>
  );
};
export default ImageContainer;
