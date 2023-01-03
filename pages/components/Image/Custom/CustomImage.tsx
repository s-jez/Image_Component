import Image from "next/image";
import styles from "./CustomImage.module.scss";
import React, { FC, useEffect, useRef, useState } from "react";
import { TbDragDrop } from "react-icons/tb";

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
            }}
            ref={imageRef as React.Ref<HTMLImageElement>}
          ></Image>
        </div>
      </div>
    </div>
  );
};
export default CustomImage;
