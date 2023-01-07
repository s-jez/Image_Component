import Button from "../../Button/Button";
import CustomImage from "../Custom/CustomImage";
import styles from "./ImageContainer.module.scss";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useEffect, useState } from "react";
import useDisplayImage from "../../../../hooks/useDisplayImage";

const ImageContainer = () => {
  let minImageScale = 2.5,
    maxImageScale = 3.5;
  const [image, setImage] = useState<File | null>(null);
  const [imageScale, setImageScale] = useState(minImageScale);

  const { result, uploader } = useDisplayImage();

  const handleAddScale = () => setImageScale(imageScale + 0.1);
  const handleRemoveScale = () => setImageScale(imageScale - 0.1);

  useEffect(() => {
    if (imageScale < minImageScale) {
      setImageScale(minImageScale);
    }
    if (imageScale > maxImageScale) {
      setImageScale(maxImageScale);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageScale]);

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
      <CustomImage src={result} alt="" imageScale={imageScale} />
      <div className={styles["container__slider"]}>
        <button onClick={handleRemoveScale}>
          <AiOutlineMinus />
        </button>
        <input
          type="range"
          min="2.5"
          max="3.5"
          value={imageScale}
          step="0.1"
          onChange={(e) => {
            setImageScale(+e.target.value);
          }}
          className={styles.slider}
        />
        <button onClick={handleAddScale}>
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
};
export default ImageContainer;
