import Button from "../../Button/Button";
import CustomImage from "../Custom/CustomImage";
import styles from "./ImageContainer.module.scss";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useRef, useState } from "react";
import useDisplayImage from "../../../hooks/useDisplayImage";

const ImageContainer = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageScale, setImageScale] = useState(1);

  const { result, uploader } = useDisplayImage();

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
      <input
        type="file"
        id="files"
        className={styles.file}
        onChange={(e) => {
          if (!e.target.files) return;
          setImage(e.target.files[0]);
          uploader(e);
        }}
      />
      {result && <CustomImage src={result} alt="" imageScale={imageScale} />}
      <div className={styles["container__slider"]}>
        <button>
          <AiOutlineMinus />
        </button>
        <input
          type="range"
          min="1"
          max="1.3"
          value={imageScale}
          step="0.1"
          onChange={(e) => {
            setImageScale(+e.target.value);
          }}
          className={styles.slider}
        />
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
