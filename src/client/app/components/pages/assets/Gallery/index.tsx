import s from './styles.module.scss';
import { FC, useState } from 'react';
import useAssets from 'hooks/useAssets';
import { useRouter } from 'next/router';
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

const Gallery: FC = () => {
  const { id } = useRouter().query;
  const item = useAssets({ id: id as string }).assets[0];
  const imageWidth =
    typeof window !== 'undefined' ? window?.innerWidth / 4 : 300;

  const [isFullWidth, setIsFullWidth] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const displayIsShow = isFullWidth ? 'block' : 'none';
  const styleForArrows = {
    display: displayIsShow,
  };

  const toggleFullWidth = () => setIsFullWidth(!isFullWidth);
  const toggleCurrentSlide = (indexOfSlide: number) =>
    setCurrentSlide(indexOfSlide);

  if (!item) {
    return null;
  }

  return (
    <>
      {isFullWidth ? (
        <CarouselProvider
          className={s.carouselProvider}
          naturalSlideWidth={100}
          naturalSlideHeight={60}
          totalSlides={item.images?.images.length}
          currentSlide={currentSlide}
          disableAnimation={true}
        >
          <div className={s.imageFullWidthContol}>
            <CloseIcon
              className={s.closeIcon}
              onClick={toggleFullWidth}
              style={{ display: displayIsShow }}
            />
            <ButtonBack style={styleForArrows} className={s.buttonBack}>
              <ArrowBackIosIcon className={s.arrowBack} />
            </ButtonBack>
          </div>
          <Slider
            id="mySlider"
            style={{
              display: displayIsShow,
              width: '100%',
              margin: 'auto',
              borderRadius: '10px',
              boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
            }}
          >
            {item.images?.images.map((image, index) => {
              return (
                <Slide index={index} key={index}>
                  <Image
                    src={image.src}
                    hasMasterSpinner={false}
                    style={{ borderRadius: '10px' }}
                  />
                </Slide>
              );
            })}
          </Slider>
          <ButtonNext style={styleForArrows} className={s.buttonNext}>
            <ArrowForwardIosIcon className={s.arrowForward} />
          </ButtonNext>
        </CarouselProvider>
      ) : (
        ''
      )}

      <div className={s.gallery}>
        {item.images?.images.slice(0, 4).map((image, index) => {
          return (
            <div
              key={index}
              className={`${s.imageWrap}`}
              onClick={() => {
                toggleFullWidth(), toggleCurrentSlide(index);
              }}
            >
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
    </>
  );
};

export default Gallery;
