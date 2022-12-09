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
  Image,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import clsx from "clsx";

export const DesktopCarousel = ({images}: { images?: { src: string }[] }) => {

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
                  <Image
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
            <div className={s.imageFullWidthControl}>
              <CloseIcon
                className={s.closeIcon}
                onClick={toggleFullWidth}
                style={{display: displayIsShow}}
              />
              <ButtonBack style={styleForArrows} className={s.buttonBack}>
                <ArrowBackIosIcon className={s.arrowBack}/>
              </ButtonBack>
            </div>
            <Slider>
              {images.map((image, index) => (
                <Slide index={index} key={index}>
                  <Image hasMasterSpinner={false} src={image.src} className={clsx(s.image, s.imageMain)} onClick={() => {
                    toggleFullWidth(), toggleCurrentSlide(index);
                  }}/>
                </Slide>
              ))}
            </Slider>
          </CarouselProvider>
        </div>
        <div className={s.listOfSlides}>
          <CarouselProvider naturalSlideWidth={70} naturalSlideHeight={42} totalSlides={images?.length}
                            orientation={'vertical'} infinite={true} className={s.listOfSlidesCarousel}>
            <div className={s.listOfSlidesCarouselChild}>
              {images.map((image, index) => (
                <Slide index={index} key={index} onClick={() => setCurrentSlide(index)} className={s.listOfImages}>
                  <Image hasMasterSpinner={false} src={image.src} className={clsx(s.image)}/>
                </Slide>
              ))}
            </div>
          </CarouselProvider>
        </div>
      </div>
    </>
  );
}

