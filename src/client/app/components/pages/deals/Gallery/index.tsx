import s from "./styles.module.scss";
import { FC } from "react";
import useDeals from "hooks/useDeals";
import { useRouter } from "next/router";

const Gallery: FC = () => {
  const { id } = useRouter().query;
  const item = useDeals({ id: id as string }).deals[0];
  const imageWidth = typeof window !== "undefined" ? (window?.innerWidth / 4) : 300;

  if (!item) {
    return null;
  }

  return (
    <div className={s.gallery}>
      {item.images?.images.slice(0, 4).map((image, index) => {
        return (
          <div key={index} className={s.imageWrap}>
            <img
              src={image.src}
              width={imageWidth}
              height={300}
              className={s.image}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
