import Navigation from './components/HomeNavigation';
import { FC } from 'react';
import SectionElement from './components/SectionElement';
import s from './styles.module.scss';
import TeamBlock from './components/TeamBlock';
import NavSocialImage from './components/NavSocialImage';
import MenuElement from 'components/pages/account_page/AccountMenu/MenuElement';

const HomePage: FC = () => (
  <>
    <Navigation />
    <main className={s.startPage}>
      <div className={s.startPageWrapper}>
        <main className={s.startPageInfo}>
          <h1 className={s.companyTitle}>
            Binaryx Community-powered Real Estate marketplace
          </h1>
          <div className={s.infoSection}>
            <p className={s.hint}>
              Powered on <u>NEAR</u>protocol
            </p>
            <button className={s.btnJoinWaitlist}>Join waitlist</button>
          </div>
        </main>
        <SectionElement
          imageSrc={'#'}
          heading="Change expensive asset value in Real Estate"
        >
          <p className={s.description}>
            There is still needed a huge amount and knowledge to join a real
            estate market. With Binaryx and DeFi you will be able to: Buy a real
            tokenized estate with only 50$ till unlimited Have a way how to
            deversificate your investments and risks And many more
          </p>
        </SectionElement>
        <SectionElement
          imageSrc={'#'}
          heading="Liquidity in the illiquid market"
        >
          <p className={s.description}>
            The second problem is a lack of liquidity in the real estate market
            in traditional finance In DeFi you will be able to sell your
            property fast, secure, and profitable
          </p>
        </SectionElement>
        <SectionElement imageSrc={'#'} heading="Boost economy">
          <p className={s.description}>
            Increasing assets ownership transferring speed with web3
            technologies Increasing assets ownership transferring speed with
            web3 technologies
          </p>
        </SectionElement>
      </div>
      <div className={s.webAssets}>
        <div className={s.webAssetsWrapper}>
          <main className={s.assets}>
            <h1 className={s.assetsTitle}>Welcome to the era of WEB3 assets</h1>
            <img
              className={s.assetsProperty}
              style={{ border: '1px solid white' }}
              src="#"
              alt="#"
            />
          </main>
          <main className={s.ourTeam}>
            <h1 className={s.ourTeamTitle}>Our Team</h1>
            <div className={s.teamGallery}>
              <TeamBlock
                imgSrc={'#'}
                personName={'Oleg Kurchenko'}
                personPosition={'Chief executive producer'}
                socialLinkImage={
                  'https://cdn-icons-png.flaticon.com/512/61/61109.png'
                }
                socialLink={'#'}
                socialUserName={'oleg_kurchenko'}
              />
              <TeamBlock
                imgSrc={'#'}
                personName={'Oleg Kurchenko'}
                personPosition={'Chief executive producer'}
                socialLinkImage={
                  'https://cdn-icons-png.flaticon.com/512/61/61109.png'
                }
                socialLink={'#'}
                socialUserName={'oleg_kurchenko'}
              />
              <TeamBlock
                imgSrc={'#'}
                personName={'Oleg Kurchenko'}
                personPosition={'Chief executive producer'}
                socialLinkImage={
                  'https://cdn-icons-png.flaticon.com/512/61/61109.png'
                }
                socialLink={'#'}
                socialUserName={'oleg_kurchenko'}
              />
              <TeamBlock
                imgSrc={'#'}
                personName={'Oleg Kurchenko'}
                personPosition={'Chief executive producer'}
                socialLinkImage={
                  'https://cdn-icons-png.flaticon.com/512/61/61109.png'
                }
                socialLink={'#'}
                socialUserName={'oleg_kurchenko'}
              />
            </div>
          </main>
          <main className={s.joinWaitlist}>
            <div className={s.topSection}>
              <h2 className={s.joinWaitlistTitle}>Join Waitlist:</h2>
              <form className={s.formSection}>
                <input
                  type="text"
                  className={s.input}
                  placeholder="Your name:"
                />
                <input
                  type="email"
                  className={s.input}
                  placeholder="Your email:"
                />
              </form>
            </div>
            <button type="submit" className={s.btnSend}>
              Send
            </button>
          </main>
        </div>
      </div>
      <div className={s.footerSection}>
        <div className={s.footerWrapper}>
          <footer className={s.footer}>
            <h1 className={s.footerHeading}>Or let's keep in touch with:</h1>
            <nav className={s.footerNavSocial}>
              <NavSocialImage
                link={'#'}
                src={'https://cdn-icons-png.flaticon.com/512/5968/5968898.png'}
                alt={'discord'}
                className={s.footerNavSocialImage}
                width={30}
              />
              <NavSocialImage
                link={'#'}
                src={'https://cdn-icons-png.flaticon.com/512/733/733635.png'}
                alt={'twitter'}
                className={s.footerNavSocialImage}
                width={30}
              />
              <NavSocialImage
                link={'#'}
                src={'https://cdn-icons-png.flaticon.com/512/61/61109.png'}
                alt={'linkedIn'}
                className={s.footerNavSocialImage}
                width={30}
              />
              <NavSocialImage
                link={'#'}
                src={'https://cdn-icons-png.flaticon.com/512/2111/2111710.png'}
                alt={'telegram'}
                className={s.footerNavSocialImage}
                width={30}
              />
            </nav>
          </footer>
          <nav className={s.footerBottomSection}>
            <img
              src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/common/logo_black_horizontal.svg"
              alt="company_logo"
              className={s.footerLogo}
            />
            <div className={s.footerLinks}>
              <MenuElement link={'#'} body={'Privacy Policy'} />
              <MenuElement link={'#'} body={'Terms of service'} />
            </div>
            <span className={s.binarix}>
              ©Binarix. All rights reserved 2022
            </span>
          </nav>
        </div>
      </div>
    </main>
  </>
);

export default HomePage;
