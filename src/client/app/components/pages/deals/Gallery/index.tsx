import s from "./styles.module.scss";
import { FC } from "react";
import useDeals from "hooks/useDeals";
import { useRouter } from "next/router";

const Gallery: FC = () => {
  const { deals } = useDeals();
  const { id } = useRouter().query;
  const item = deals?.find((deal) => deal.id === id);
  const imageWidth = window.innerWidth / 4;

  if (!item) {
    return null;
  }

  return (
    <div className={s.gallery}>
      {item.images.slice(0, 4).map((image, index) => {
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
