import { FC } from 'react';
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
  return (
    <section id={id} className={classNames(s.webAssets, className)}>
      <div className={s.container}>
        <h1 className={s.assetsTitle}>Welcome To The Era Of WEB3 Assets</h1>
        <div className={s.webAssetsContainer}>
          <WebAssetBlock className={s.webAssetsLegend} animationOrder={5}>
            <AnimationElement order={5}>
              <p className={s.legendMenuFirst}>1. Property Tokenization</p>
            </AnimationElement>
            <AnimationElement order={10}>
              <p className={s.legendMenuSecond}>
                2. Purchasing Property Tokens
              </p>
            </AnimationElement>
            <AnimationElement order={16}>
              <p className={s.legendMenuThird}>3. Claiming Rewards from Rent</p>
            </AnimationElement>
          </WebAssetBlock>
          <WebAssetBlock className={s.binaryxMarketplace} animationOrder={4}>
            <WebAssetCard
              animationOrder={2}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/binaryx-logo.svg'
              }
              imageDescription={'Binaryx Marketplace'}
            />
          </WebAssetBlock>
          <WebAssetBlock className={s.propertyTokenization} animationOrder={5}>
            <WebAssetCard
              animationOrder={7}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/property.svg'
              }
              imageDescription={'Property'}
            />
            <WebAssetCard
              animationOrder={8}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/property-tokens.svg'
              }
              imageDescription={'Property Tokens'}
            />
            {/* <AnimationElement order={8}> */}
            <img
              src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-arrows/Vector-1.svg"
              className={classNames(s.vector1Desktop, s.vectorsDesktop)}
            />
            {/* </AnimationElement> */}
            <img
              src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/mobile/web3-arrows/Vector-1.svg"
              className={classNames(s.vector1Mobile, s.vectorsMobile)}
            />
          </WebAssetBlock>
          <WebAssetBlock
            className={s.purchasingPropertyTokens}
            animationOrder={10}
          >
            <WebAssetCard
              animationOrder={11}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/propety-token.svg'
              }
              imageDescription={'Property Token'}
            />
            <WebAssetCard
              animationOrder={12}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/stablecoins.svg'
              }
              imageDescription={'Stablecoins'}
            />
            <WebAssetCard
              animationOrder={13}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/users.svg'
              }
              imageDescription={'Users'}
            />
            {/* <AnimationElement order={14}> */}
            <img
              src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-arrows/Vector-2.svg"
              className={classNames(s.vector2Desktop, s.vectorsDesktop)}
            />
            {/* </AnimationElement> */}
            {/* <AnimationElement order={13}> */}
            <img
              src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-arrows/Vector-3.svg"
              className={classNames(s.vector3Desktop, s.vectorsDesktop)}
            />
            {/* </AnimationElement> */}
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
          <WebAssetBlock className={s.claimingRewards} animationOrder={15}>
            <WebAssetCard
              animationOrder={17}
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/property-rent.svg'
              }
              imageDescription={'Property Rent'}
            />
            <p className={s.rent}>Rent Goes To Smart-Contact</p>
            <p className={s.claim}>Claim</p>
            <p className={s.sentMoney}>Sent money</p>
            <img
              src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-arrows/Vector-4.svg"
              className={classNames(s.vector4Desktop, s.vectorsDesktop)}
            />
            <img
              src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-arrows/Vector-5.svg"
              className={classNames(s.vector5Desktop, s.vectorsDesktop)}
            />
            <img
              src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-arrows/Vector-6.svg"
              className={classNames(s.vector6Desktop, s.vectorsDesktop)}
            />
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
