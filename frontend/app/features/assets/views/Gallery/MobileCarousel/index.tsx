import s from './styles.module.scss';
import {
  CarouselProvider,
  Slider,
  Slide,
  DotGroup,
  Image,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import clsx from "clsx";

export const MobileCarousel = ({images}: { images?: { src: string }[] }) => {
  if (!images) {
    return null;
  }
  return (
    <div className={s.galleryRoot}>
        <CarouselProvider naturalSlideWidth={5} naturalSlideHeight={4} totalSlides={images?.length}
                          infinite={true} orientation={'horizontal'}>
          <Slider>
            {images.map((image, index) => (
                <Slide index={index} key={index}>
                  <Image hasMasterSpinner={false} src={image.src} className={clsx(s.image, s.imageMain)}/>
                </Slide>
            ))}
          </Slider>
          <DotGroup className={s.dotGroup}/>
        </CarouselProvider>
    </div>
  );
}

