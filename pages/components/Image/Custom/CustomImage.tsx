import Image from "next/image";
import styles from "./CustomImage.module.scss";
import { FC } from "react";
import { url } from "inspector";

interface ICustomImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const CustomImage: FC<ICustomImage> = ({
  src,
  alt,
  width,
  height,
}: ICustomImage) => {
  return (
    <div className={styles.square} style={{ backgroundImage: `url(${src})` }}>
      <div className={styles.circle}>
        <Image
          className={styles.img}
          src={src}
          alt={alt}
          width={width}
          height={height}
        ></Image>
      </div>
    </div>
  );
};
export default CustomImage;
