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

  const toggleClassName = (
    className: string,
    entry: IntersectionObserverEntry,
  ) => {
    const parentBlocks = entry.target.children;
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
      // if (entry.isIntersecting) observer.unobserve(entry.target);
    });
    observer.observe(webAssetContainer.current);
  }, []);

  const onMouseEnter = (id: string, className: string) => {
    document.getElementById(id).classList.toggle(className);
  };

  const onMouseLeave = (id: string, className: string) => {
    document.getElementById(id).classList.toggle(className);
  };

  return (
    <section className={classNames(s.webAssets, className)}>
      <div className={s.container}>
        <h1 className={s.assetsTitle}>Welcome To The Era Of WEB3 Assets</h1>
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
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/binaryx-logo.svg'
              }
              imageDescription={'Binaryx Marketplace'}
            />
          </WebAssetBlock>
          <WebAssetBlock
            id="propertyTokenization"
            className={classNames(s.propertyTokenization)}
            animationOrder={6}
          >
            <WebAssetCard
              animationOrder={8}
              className={classNames(s.property)}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/property.svg'
              }
              imageDescription={'Property'}
            />
            <WebAssetCard
              animationOrder={10}
              className={classNames(s.propertyTokens)}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/property-tokens.svg'
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
            animationOrder={14}
          >
            <WebAssetCard
              animationOrder={16}
              className={s.propertyToken}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/propety-token.svg'
              }
              imageDescription={'Property Token'}
            />
            <WebAssetCard
              animationOrder={18}
              className={s.stablecoins}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/stablecoins.svg'
              }
              imageDescription={'Stablecoins'}
            />
            <WebAssetCard
              animationOrder={20}
              className={s.users}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/users.svg'
              }
              imageDescription={'Users'}
            />
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
            animationOrder={26}
          >
            <WebAssetCard
              animationOrder={28}
              className={s.propertyRent}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/property-rent.svg'
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
