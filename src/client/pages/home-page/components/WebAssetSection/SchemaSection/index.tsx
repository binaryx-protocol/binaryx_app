import { FC, useEffect } from 'react';
import classNames from 'classnames';
import s from './styles.module.scss';
import Props from '../WebAssetBlock';
import WebAssetCard from '../WebAssetCard';
import WebAssetBlock from '../WebAssetBlock';
import AnimationElement from '../../AnimationElement';

type Props = {
  className?: string;
  id?: string;
};

const SchemaSection: FC<Props> = ({ className, id }) => {
  useEffect(() => {
    const webAssetBlock = document.querySelectorAll(
      '.styles_webAssetBlock__2R29o',
    );
    const webAssetCard = document.querySelectorAll(
      '.styles_webAssetCard__cCZGz',
    );
    const animation = document.querySelectorAll('.animationElement');

    const observer = new IntersectionObserver((entries) =>
      entries.forEach((entry) => {
        entry.target.classList.toggle(
          'styles_isShow__g-Dv6',
          entry.isIntersecting,
        );
      }),
    );

    webAssetBlock.forEach((elem) => observer.observe(elem));
    webAssetCard.forEach((elem) => observer.observe(elem));
    animation.forEach((elem) => observer.observe(elem));
  }, []);

  return (
    <section id={id} className={classNames(s.webAssets, className)}>
      <div className={s.container}>
        <h1 className={s.assetsTitle}>Welcome To The Era Of WEB3 Assets</h1>
        <div className={s.webAssetsContainer}>
          <WebAssetBlock className={s.webAssetsLegend} animationOrder={6}>
            <AnimationElement order={8} className={s.legendMenuFirst}>
              <p>1. Property Tokenization</p>
            </AnimationElement>
            <AnimationElement order={16} className={s.legendMenuSecond}>
              <p>2. Purchasing Property Tokens</p>
            </AnimationElement>
            <AnimationElement order={28} className={s.legendMenuThird}>
              <p>3. Claiming Rewards from Rent</p>
            </AnimationElement>
          </WebAssetBlock>
          <WebAssetBlock className={s.binaryxMarketplace} animationOrder={4}>
            <WebAssetCard
              animationOrder={2}
              className={s.binaryxMain}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/binaryx-logo.svg'
              }
              imageDescription={'Binaryx Marketplace'}
            />
          </WebAssetBlock>
          <WebAssetBlock className={s.propertyTokenization} animationOrder={8}>
            <WebAssetCard
              animationOrder={10}
              className={s.property}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/property.svg'
              }
              imageDescription={'Property'}
            />
            <WebAssetCard
              animationOrder={12}
              className={s.propertyTokens}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/property-tokens.svg'
              }
              imageDescription={'Property Tokens'}
            />
            <AnimationElement
              order={14}
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
            className={s.purchasingPropertyTokens}
            animationOrder={16}
          >
            <WebAssetCard
              animationOrder={18}
              className={s.propertyToken}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/propety-token.svg'
              }
              imageDescription={'Property Token'}
            />
            <WebAssetCard
              animationOrder={20}
              className={s.stablecoins}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/stablecoins.svg'
              }
              imageDescription={'Stablecoins'}
            />
            <WebAssetCard
              animationOrder={22}
              className={s.users}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/users.svg'
              }
              imageDescription={'Users'}
            />
            <AnimationElement
              order={26}
              className={classNames(s.vector2Desktop, s.vectorsDesktop)}
            >
              <img src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-arrows/Vector-2.svg" />
            </AnimationElement>
            <AnimationElement
              order={24}
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
          <WebAssetBlock className={s.claimingRewards} animationOrder={28}>
            <WebAssetCard
              animationOrder={30}
              className={s.propertyRent}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/property-rent.svg'
              }
              imageDescription={'Property Rent'}
            />
            <AnimationElement order={34} className={s.rent}>
              <p>Rent Goes To Smart-Contact</p>
            </AnimationElement>
            <AnimationElement order={38} className={s.claim}>
              <p>Claim</p>
            </AnimationElement>
            <AnimationElement order={42} className={s.sentMoney}>
              <p>Sent money</p>
            </AnimationElement>
            <AnimationElement
              order={32}
              className={classNames(s.vector4Desktop, s.vectorsDesktop)}
            >
              <img src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-arrows/Vector-4.svg" />
            </AnimationElement>
            <AnimationElement
              order={40}
              className={classNames(s.vector5Desktop, s.vectorsDesktop)}
            >
              <img src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-arrows/Vector-5.svg" />
            </AnimationElement>
            <AnimationElement
              order={36}
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
