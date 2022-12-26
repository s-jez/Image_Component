import Image from "next/image";
import styles from "./CustomImage.module.scss";
import { FC } from "react";
import { url } from "inspector";

interface ICustomImage {
  src: string;
  alt: string;
  imageScale: number;
}

const CustomImage: FC<ICustomImage> = ({
  src,
  alt,
  imageScale,
}: ICustomImage) => {
  return (
    <div>
      <div
        className={styles.square}
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
        }}
      >
        <div
          className={styles.circle}
          style={{
            transform: `scale(${imageScale}, ${imageScale})`,
          }}
        >
          <Image
            className={styles.img}
            src={src}
            alt={alt}
            width={300}
            height={300}
          ></Image>
        </div>
      </div>
    </div>
  );
};
export default CustomImage;
