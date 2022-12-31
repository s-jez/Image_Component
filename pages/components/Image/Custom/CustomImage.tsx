import Image from "next/image";
import styles from "./CustomImage.module.scss";
import { FC } from "react";

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
  const defaultImageURL = "/avatar.png";
  const imageSource = src ? src : defaultImageURL;
  return (
    <div>
      <div
        className={styles.square}
        style={{
          backgroundImage: `url(${imageSource})`,
          backgroundSize: "cover",
        }}
      >
        <div className={styles.circle}>
          <Image
            className={styles.img}
            src={imageSource}
            alt={alt}
            width={200}
            height={200}
            style={{
              transform: `scale(${imageScale}, ${imageScale})`,
            }}
          ></Image>
        </div>
      </div>
    </div>
  );
};
export default CustomImage;
