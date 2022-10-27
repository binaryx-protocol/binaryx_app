import { FC, useEffect, useRef } from 'react';
import classNames from 'classnames';
import s from './styles.module.scss';
import Props from '../WebAssetBlock';
import WebAssetCard from '../WebAssetCard';
import WebAssetBlock from '../WebAssetBlock';
import AnimationElement from '../../AnimationElement';

type Props = {
  className?: string;
};

const SchemaSection: FC<Props> = ({ className }) => {
  const webAssetContainer = useRef<HTMLDivElement>(null);
  const isMobile = true;

  const toggleClassName = (
    className: string,
    entry: IntersectionObserverEntry,
  ) => {
    const parentBlocks = entry?.target?.children || [];
    for (let i = 0; i < parentBlocks.length; i++) {
      parentBlocks[i].classList.toggle(className, entry.isIntersecting);
      const childBlocks = entry.target.children[i].children;
      for (let j = 0; j < childBlocks.length; j++) {
        childBlocks[j].classList.toggle(className, entry.isIntersecting);
      }
    }
  };

  useEffect(() => {
    const isDesktop = window.innerWidth > 768;
    const observer = new IntersectionObserver(([entry]) => {
      if (isDesktop) {
        toggleClassName(s.isShow, entry);
      }
      if (entry.isIntersecting) observer?.unobserve(entry.target);
    });
    // @ts-ignore
    observer?.observe(webAssetContainer.current);
  }, []);

  const onMouseEnter = (id: string, className: string) => {
    // @ts-ignore
    document.getElementById(id).classList.toggle(className);
  };

  const onMouseLeave = (id: string, className: string) => {
    // @ts-ignore
    document.getElementById(id).classList.toggle(className);
  };

  if (isMobile) {
    return (
      <section className={classNames(s.webAssets, className)}>
        {/*<BgOverlay isBgOverlayActive={true} isBgAnimationActive={true} isBgOverlayAbsolute={true} />*/}
        <div className={s.textContainer}>
          <h1 className={s.assetsTitle}>Welcome To The Era Of <br />WEB3 Assets</h1>
        </div>
        <div className={s.container}>
          <img className={s.mobileSchemaImage} src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/mobile/lp-schema-mobile-large.png" />
        </div>
        <div ref={webAssetContainer} className={s.webAssetsContainer} />
      </section>
    );
  }

  return (
    <section className={classNames(s.webAssets, className)}>
      {/*<BgOverlay isBgOverlayActive={true} isBgAnimationActive={true} isBgOverlayAbsolute={true} />*/}
      <div className={s.textContainer}>
        <h1 className={s.assetsTitle}>Welcome To The Era Of <br />WEB3 Assets</h1>
      </div>
      <div className={s.container}>
        <div ref={webAssetContainer} className={s.webAssetsContainer}>
          <WebAssetBlock
            className={classNames(s.webAssetsLegend)}
            animationOrder={4}
          >
            <AnimationElement
              onMouseEnter={() =>
                onMouseEnter(
                  'propertyTokenization',
                  s.propertyTokenizationSelected,
                )
              }
              onMouseLeave={() =>
                onMouseLeave(
                  'propertyTokenization',
                  s.propertyTokenizationSelected,
                )
              }
              order={6}
              className={classNames(s.legendMenuFirst)}
              id={'legendMenuFirst'}
            >
              <p>1. Property Tokenization</p>
            </AnimationElement>
            <AnimationElement
              onMouseEnter={() =>
                onMouseEnter(
                  'purchasingPropertyTokens',
                  s.purchasingPropertyTokensSelected,
                )
              }
              onMouseLeave={() =>
                onMouseLeave(
                  'purchasingPropertyTokens',
                  s.purchasingPropertyTokensSelected,
                )
              }
              order={14}
              className={classNames(s.legendMenuSecond)}
              id={'legendMenuSecond'}
            >
              <p>2. Purchasing Property Tokens</p>
            </AnimationElement>
            <AnimationElement
              onMouseEnter={() =>
                onMouseEnter('claimingRewards', s.claimingRewardsSelected)
              }
              onMouseLeave={() =>
                onMouseLeave('claimingRewards', s.claimingRewardsSelected)
              }
              order={26}
              className={classNames(s.legendMenuThird)}
              id={'legendMenuThird'}
            >
              <p>3. Claiming Rewards from Rent</p>
            </AnimationElement>
          </WebAssetBlock>
          <WebAssetBlock
            className={classNames(s.binaryxMarketplace)}
            animationOrder={2}
          >
            <WebAssetCard
              animationOrder={0}
              className={classNames(s.binaryxMain)}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/binaryx-logo3.png'
              }
              imageDescription={'Binaryx Marketplace'}
            ></WebAssetCard>
          </WebAssetBlock>
          <WebAssetBlock
            id="propertyTokenization"
            className={classNames(s.propertyTokenization)}
            onMouseEnter={() => {
              onMouseEnter('legendMenuFirst', s.legendMenuFirstSelected);
              onMouseEnter(
                'propertyTokenization',
                s.propertyTokenizationSelected,
              );
            }}
            onMouseLeave={() => {
              onMouseLeave('legendMenuFirst', s.legendMenuFirstSelected);
              onMouseLeave(
                'propertyTokenization',
                s.propertyTokenizationSelected,
              );
            }}
            animationOrder={6}
          >
            <WebAssetCard
              animationOrder={8}
              className={classNames(s.property)}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/property3.png'
              }
              imageDescription={'Property'}
            />
            <WebAssetCard
              animationOrder={10}
              className={classNames(s.propertyTokens)}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/property-tokens3.png'
              }
              imageDescription={'Property Tokens'}
            />
            <AnimationElement
              order={12}
              className={classNames(s.vector1Desktop, s.vectorsDesktop)}
            >
              <img src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-arrows/Vector-1.svg" />
            </AnimationElement>
            <img
              src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/mobile/web3-arrows/Vector-1.svg"
              className={classNames(s.vector1Mobile, s.vectorsMobile)}
            />
          </WebAssetBlock>
          <WebAssetBlock
            id="purchasingPropertyTokens"
            className={s.purchasingPropertyTokens}
            onMouseEnter={() => {
              onMouseEnter('legendMenuSecond', s.legendMenuSecondSelected);
              onMouseEnter(
                'purchasingPropertyTokens',
                s.purchasingPropertyTokensSelected,
              );
            }}
            onMouseLeave={() => {
              onMouseLeave('legendMenuSecond', s.legendMenuSecondSelected);
              onMouseLeave(
                'purchasingPropertyTokens',
                s.purchasingPropertyTokensSelected,
              );
            }}
            animationOrder={14}
          >
            <WebAssetCard
              animationOrder={16}
              className={s.propertyToken}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/property-token3.png'
              }
              imageDescription={'Property Token'}
            ></WebAssetCard>
            <WebAssetCard
              animationOrder={18}
              className={s.stablecoins}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/stablecoins3.png'
              }
              imageDescription={'Stablecoins'}
            ></WebAssetCard>
            <WebAssetCard
              animationOrder={20}
              className={s.users}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/users3.png'
              }
              imageDescription={'Users'}
            ></WebAssetCard>
            <AnimationElement
              order={24}
              className={classNames(s.vector2Desktop, s.vectorsDesktop)}
            >
              <img src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-arrows/Vector-2.svg" />
            </AnimationElement>
            <AnimationElement
              order={22}
              className={classNames(s.vector3Desktop, s.vectorsDesktop)}
            >
              <img src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-arrows/Vector-3.svg" />
            </AnimationElement>
            <img
              src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/mobile/web3-arrows/Vector-3.svg"
              className={classNames(s.vector3Mobile, s.vectorsMobile)}
            />
            <img
              src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/mobile/web3-arrows/Vector-4.svg"
              className={classNames(s.vector4Mobile, s.vectorsMobile)}
            />
            <img
              src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/mobile/web3-arrows/Vector-5.svg"
              className={classNames(s.vector5Mobile, s.vectorsMobile)}
            />
            <img
              src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/mobile/web3-arrows/Vector-6.svg"
              className={classNames(s.vector6Mobile, s.vectorsMobile)}
            />
          </WebAssetBlock>
          <WebAssetBlock
            id="claimingRewards"
            className={s.claimingRewards}
            onMouseEnter={() => {
              onMouseEnter('legendMenuThird', s.legendMenuThirdSelected);
              onMouseEnter('claimingRewards', s.claimingRewardsSelected);
            }}
            onMouseLeave={() => {
              onMouseLeave('legendMenuThird', s.legendMenuThirdSelected);
              onMouseLeave('claimingRewards', s.claimingRewardsSelected);
            }}
            animationOrder={26}
          >
            <WebAssetCard
              animationOrder={28}
              className={s.propertyRent}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/property-rent3.png'
              }
              imageDescription={'Property Rent'}
            />
            <AnimationElement order={32} className={s.rent}>
              <p>Rent Goes To Smart-Contact</p>
            </AnimationElement>
            <AnimationElement order={36} className={s.claim}>
              <p>Claim</p>
            </AnimationElement>
            <AnimationElement order={40} className={s.sentMoney}>
              <p>Sent money</p>
            </AnimationElement>
            <AnimationElement
              order={30}
              className={classNames(s.vector4Desktop, s.vectorsDesktop)}
            >
              <img src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-arrows/Vector-4.svg" />
            </AnimationElement>
            <AnimationElement
              order={38}
              className={classNames(s.vector5Desktop, s.vectorsDesktop)}
            >
              <img src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-arrows/Vector-5.svg" />
            </AnimationElement>
            <AnimationElement
              order={34}
              className={classNames(s.vector6Desktop, s.vectorsDesktop)}
            >
              <img src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-arrows/Vector-6.svg" />
            </AnimationElement>
            <img
              src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/mobile/web3-arrows/Vector-2.svg"
              className={classNames(s.vector2Mobile, s.vectorsMobile)}
            />
          </WebAssetBlock>
        </div>
      </div>
    </section>
  );
};

export default SchemaSection;
