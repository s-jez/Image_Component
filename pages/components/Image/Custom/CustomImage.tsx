import Image from "next/image";
import styles from "./CustomImage.module.scss";
import { FC } from "react";

interface ICustomImage {
  src: string;
  alt: string;
}

const CustomImage: FC<ICustomImage> = ({ src, alt }: ICustomImage) => {
  return (
    <div>
      <div className={styles.circle}>
        <Image
          className={styles.img}
          src={src}
          alt={alt}
          width={256}
          height={256}
        />
      </div>
    </div>
  );
};
export default CustomImage;
