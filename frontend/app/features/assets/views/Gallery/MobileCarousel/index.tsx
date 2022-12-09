import s from './styles.module.scss';
import {useEffect, useState} from 'react';
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

  const [isFullWidth, setIsFullWidth] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const displayIsShow = isFullWidth ? 'block' : 'none';

  const styleForArrows = {
    display: displayIsShow,
  };

  const toggleFullWidth = () => {
    setIsFullWidth(!isFullWidth);
    document.body.style.overflow = !isFullWidth ? 'hidden' : '';
  };
  const toggleCurrentSlide = (indexOfSlide: number) =>
    setCurrentSlide(indexOfSlide);

  useEffect(() => {
    const slider = document.getElementById('slider');
    if (slider) {
      slider?.focus();
    }
  }, [isFullWidth]);

  if (!images) {
    return null;
  }
  return (
    <div className={s.galleryRoot}>
        <CarouselProvider naturalSlideWidth={5} naturalSlideHeight={4} totalSlides={images?.length}
                          infinite={true} currentSlide={currentSlide} orientation={'horizontal'}>
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

