import Image from "next/image";
import styles from "./CustomImage.module.scss";
import React, { FC, useEffect, useRef, useState } from "react";
import { TbDragDrop } from "react-icons/tb";
import Button from "../../Button/Button";
import { saveAs } from "file-saver";

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
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isDrag, setIsDrag] = useState(false);

  const [move, setMove] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDrag(true);
    setStartPosition({
      x: e.clientX - move.x,
      y: e.clientY - move.y,
    });
  };

  const handleDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDrag) return;
    setMove({
      x: e.clientX - startPosition.x,
      y: e.clientY - startPosition.y,
    });
  };

  const handleDragEnd = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDrag) return;
    setIsDrag(false);

    const imageRect = imageRef.current?.getBoundingClientRect() as DOMRect;
    const containerRect =
      containerRef.current?.getBoundingClientRect() as DOMRect;

    const topOver = move.y > (imageRect.height - containerRect.height) / 2;
    const bottomOver = move.y < -(imageRect.height - containerRect.height) / 2;

    const rightOver = move.x < -(imageRect.width - containerRect.width) / 2;
    const leftOver = move.x > (imageRect.width - containerRect.width) / 2;

    if (bottomOver && rightOver) {
      setMove({
        x: -(imageRect.width - containerRect.width) / 2,
        y: -(imageRect.height - containerRect.height) / 2,
      });
    } else if (bottomOver && leftOver) {
      setMove({
        x: (imageRect.width - containerRect.width) / 2,
        y: -(imageRect.height - containerRect.height) / 2,
      });
    } else if (bottomOver) {
      setMove({ ...move, y: -(imageRect.height - containerRect.height) / 2 });
    } else if (topOver && rightOver) {
      setMove({
        x: -(imageRect.width - containerRect.width) / 2,
        y: (imageRect.height - containerRect.height) / 2,
      });
    } else if (topOver && leftOver) {
      setMove({
        x: (imageRect.width - containerRect.width) / 2,
        y: (imageRect.height - containerRect.height) / 2,
      });
    } else if (topOver) {
      setMove({ ...move, y: (imageRect.height - containerRect.height) / 2 });
    } else if (rightOver) {
      setMove({ ...move, x: -(imageRect.width - containerRect.width) / 2 });
    } else if (leftOver) {
      setMove({ ...move, x: (imageRect.width - containerRect.width) / 2 });
    }
  };

  useEffect(() => {
    const image = new (window as any).Image();
    image.src = src;
  }, [src]);

  const saveCrop = () => {
    const imageRect = imageRef.current?.getBoundingClientRect() as DOMRect;
    const containerRect =
      containerRef.current?.getBoundingClientRect() as DOMRect;
    const canvas = document.createElement("canvas");
    canvas.width = containerRef.current?.offsetWidth as number;
    canvas.height = containerRef.current?.offsetHeight as number;
    const ctx = canvas.getContext("2d");
    const image = new (window as any).Image();
    image.onload = () => {
      const ratio = image.width / imageRect.width;

      ctx?.drawImage(
        image,
        Math.abs(containerRect.x - imageRect.x) * ratio,
        Math.abs(containerRect.y - imageRect.y) * ratio,
        containerRect.width * ratio,
        containerRect.height * ratio,
        0,
        0,
        canvas.width,
        canvas.height
      );
      canvas.toBlob(
        (blob) => blob && saveAs(blob, `image_${new Date().getTime()}.png`)
      );
    };
    image.src = imageSource;
  };
  const defaultImageURL = "/avatar.png";
  const imageSource = src ? src : defaultImageURL;
  return (
    <div>
      <div
        className={styles.square}
        ref={containerRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDrag}
        onMouseUp={handleDragEnd}
        style={{
          backgroundImage: `url(${imageSource})`,
          backgroundSize: "cover",
          overflow: "hidden",
          cursor: "move",
          userSelect: "none",
        }}
      >
        <div className={styles.text}>
          <i>
            <TbDragDrop />
          </i>
          <p>Przeciągaj i dopasuj</p>
        </div>
        <div className={styles.circle}>
          <Image
            className={styles.img}
            src={imageSource}
            alt={alt}
            width={200}
            height={200}
            style={{
              transform: `translateX(${move.x}px) translateY(${move.y}px) scale(${imageScale})`,
              aspectRatio: 1,
            }}
            ref={imageRef as React.Ref<HTMLImageElement>}
            draggable={false}
          ></Image>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button color="white" type="large">
          Anuluj
        </Button>
        <Button color="orange" type="large" onClick={saveCrop}>
          Zapisz zmiany
        </Button>
      </div>
    </div>
  );
};
export default CustomImage;
