import s from './styles.module.scss';
import {useEffect, useState} from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image as CarouselImage,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import clsx from "clsx";
import Image from "next/image";

type Props = {
  isFullWidth: boolean;
  setIsFullWidth: (value: boolean) => void;
  currentSlide: number;
  setCurrentSlide: (value: number) => void;
  images?: { src: string }[];
}

export const DesktopCarousel = (props: Props) => {
  const {images, setIsFullWidth, isFullWidth, setCurrentSlide, currentSlide} = props
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
  const img = 'https://ns.clubmed.com/dream/RESORTS_3T___4T/Asie_et_Ocean_indien/Bali/169573-1lng9n8nnf-swhr.jpg'
  return (
    <>
      {isFullWidth ? (
        <CarouselProvider
          className={s.carouselProvider}
          naturalSlideWidth={100}
          naturalSlideHeight={60}
          totalSlides={images?.length}
          currentSlide={currentSlide}
          disableAnimation={true}
        >
          <div className={s.imageFullWidthContol}>
            <CloseIcon
              className={s.closeIcon}
              onClick={toggleFullWidth}
              style={{display: displayIsShow}}
            />
            <ButtonBack style={styleForArrows} className={s.buttonBack}>
              <ArrowBackIosIcon className={s.arrowBack}/>
            </ButtonBack>
          </div>
          <Slider
            id="slider"
            className={s.slider}
            onKeyUp={(e) => {
              if (e.key === 'Escape') toggleFullWidth();
            }}
            style={{
              display: displayIsShow,
              width: '100%',
              margin: 'auto',
              borderRadius: '15px',
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            }}
          >
            {images.map((image, index) => {
              return (
                <Slide index={index} key={index}>
                  <CarouselImage
                    src={image.src}
                    hasMasterSpinner={false}
                    style={{borderRadius: '10px'}}
                  />
                </Slide>
              );
            })}
          </Slider>
          <ButtonNext style={styleForArrows} className={s.buttonNext}>
            <ArrowForwardIosIcon className={s.arrowForward}/>
          </ButtonNext>
        </CarouselProvider>
      ) : (
        ''
      )}
      <div className={s.galleryRoot}>
        <div className={s.currentSlide}>
          <CarouselProvider naturalSlideWidth={67} naturalSlideHeight={43} totalSlides={images?.length}
                            infinite={true} currentSlide={currentSlide} orientation={'vertical'}>
            <Slider>
              {images.map((image, index) => (
                <Slide index={index} key={index}>
                  <CarouselImage hasMasterSpinner={false} src={image.src} className={s.imageMain}
                                 onClick={() => {
                                   toggleFullWidth(), toggleCurrentSlide(index);
                                 }}/>
                </Slide>
              ))}
            </Slider>
          </CarouselProvider>
        </div>
        <div className={s.listOfSlides}>
          {images.slice(0, 4).map((image, index) => (
            <img src={image.src} alt={'image'} className={clsx(s.image)} key={index}
                 onClick={() => setCurrentSlide(index)}/>
          ))}
        </div>
      </div>
    </>
  );
}

