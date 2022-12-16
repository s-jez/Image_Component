import Image from "next/image";
import styles from "./CustomImage.module.scss";

const CustomImage = () => {
  return (
    <div>
      <div className={styles.circle}>
        <Image
          className={styles.img}
          src="/avatar.png"
          alt="avatar"
          width={256}
          height={256}
        />
      </div>
    </div>
  );
};
export default CustomImage;
