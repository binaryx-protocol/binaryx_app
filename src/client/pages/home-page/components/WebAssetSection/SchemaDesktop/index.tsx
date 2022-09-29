import { FC } from 'react';
import classNames from 'classnames';
import s from './styles.module.scss';
import WebAssetBlock from '../WebAssetBlock';
import WebAssetCard from '../WebAssetCard';

type Props = {
  className?: string;
  id?: string;
};

const SchemaDesktop: FC<Props> = ({ className, id }) => {
  return (
    <section id={id} className={classNames(s.webAssets, className)}>
      <div className={s.container}>
        <h1 className={s.assetsTitle}>Welcome To The Era Of WEB3 Assets</h1>
        <div className={s.webAssetsContainer}>
          <WebAssetBlock className={s.webAssetsLegend}>
            <p>1. Property Tokenization</p>
            <p>2. Purchasing Property Tokens</p>
            <p>3. Claiming Rewards from Rent</p>
          </WebAssetBlock>
          <WebAssetBlock className={s.binaryxMarketplace}>
            <WebAssetCard
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/binaryx-logo.svg'
              }
              imageDescription={'Binaryx Marketplace'}
            />
          </WebAssetBlock>
          <WebAssetBlock className={s.propertyTokenization}>
            <WebAssetCard
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/property.svg'
              }
              imageDescription={'Property'}
            />
            <WebAssetCard
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/property-tokens.svg'
              }
              imageDescription={'Property Tokens'}
            />
            <img
              src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-arrows/Vector-1.svg"
              className={classNames(s.vector1Desktop, s.vectorsDesktop)}
            />
            <img
              src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/mobile/web3-arrows/Vector-1.svg"
              className={classNames(s.vector1Mobile, s.vectorsMobile)}
            />
          </WebAssetBlock>
          <WebAssetBlock className={s.purchasingPropertyTokens}>
            <WebAssetCard
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/propety-token.svg'
              }
              imageDescription={'Property Token'}
            />
            <WebAssetCard
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/stablecoins.svg'
              }
              imageDescription={'Stablecoins'}
            />
            <WebAssetCard
              imageSrc={
                'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-icons/users.svg'
              }
              imageDescription={'Users'}
            />
            <img
              src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-arrows/Vector-2.svg"
              className={classNames(s.vector2Desktop, s.vectorsDesktop)}
            />
            <img
              src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/landing-page/web3Assets/desktop/web3-arrows/Vector-3.svg"
              className={classNames(s.vector3Desktop, s.vectorsDesktop)}
            />
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
          <WebAssetBlock className={s.claimingRewards}>
            <WebAssetCard
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

export default SchemaDesktop;
