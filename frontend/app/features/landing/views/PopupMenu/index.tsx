// @ts-nocheck

import { KeyboardEvent, useEffect, useRef } from 'react';
import NavSocialImage from '../NavSocialImage';
import s from './styles.module.scss';
import IconDiscord from '../NavSocialImage/IconDiscord';
import IconTwitter from '../NavSocialImage/IconTwitter';
import IconLinkedIn from '../NavSocialImage/IconLinkedIn';
import IconTelegram from '../NavSocialImage/IconTelegram';

type Props = {
  isShowing: boolean;
  setIsShowing: any;
  handleFormSubmit: (event: any) => void;
};

const PopupMenu = ({ isShowing, setIsShowing, handleFormSubmit }: Props) => {
  const popupMenu = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const onKeyUp = (e: KeyboardEvent<HTMLDivElement>) =>
    e.key === 'Escape' ? handleOnClick() : '';

  const handleOnClick = () => {
    popupMenu.current.classList.add(s.closing);
    setTimeout(() => setIsShowing(!isShowing), 500);
  };

  useEffect(() => {
    popupMenu.current?.focus();
  }, []);

  if (!isShowing) {
    return null;
  }

  return (
    <div tabIndex={0} ref={popupMenu} className={s.popupMenu} onKeyUp={onKeyUp}>
      <div className={s.popupMenuBgOverlay} onClick={handleOnClick} />
      <div className={s.container}>
        <div className={s.title}>
          <h2 style={{ color: 'var(--font-color_blue-light)' }}>
            Join our social media
          </h2>
          <h2>To be a part of our community</h2>
        </div>
        <div className={s.socialLinks}>
          <NavSocialImage
            link={'https://discord.gg/f4mTchBKC8'}
            icon={
              <IconDiscord
                className={s.socialImage}
                width={isMobile ? 36 : 55}
                height={isMobile ? 26 : 40}
                fill="#335367"
              />
            }
          />
          <NavSocialImage
            link={'https://twitter.com/BinaryxProtocol'}
            icon={
              <IconTwitter
                className={s.socialImage}
                width={isMobile ? 34 : 45}
                height={isMobile ? 25 : 41}
                fill="#335367"
              />
            }
          />
          <NavSocialImage
            link={'https://www.linkedin.com/company/binaryxprotocol/'}
            icon={
              <IconLinkedIn
                className={s.socialImage}
                width={isMobile ? 32 : 45}
                height={isMobile ? 29 : 44}
                fill="#335367"
              />
            }
          />
          <NavSocialImage
            link={'https://t.me/binaryxnews'}
            icon={
              <IconTelegram
                className={s.socialImage}
                width={isMobile ? 30 : 43}
                height={isMobile ? 30 : 43}
                fill="#335367"
              />
            }
          />
        </div>
        <span>or</span>
        <h3 className={s.appeal}>
          Join waitlist and receive only important news via email. No spam, we
          promise
        </h3>
        <form className={s.formSection} onSubmit={handleFormSubmit}>
          <input className={s.inputName} type="text" placeholder="Your name:" />
          <input
            className={s.inputEmail}
            type="email"
            placeholder="Your email:"
          />
          <button className={s.btnToSubscribe} type="submit">
            Subscribe
          </button>
          <p className={s.privacyPolicy}>
            By subscribing, you agree to the Privacy Policy and Terms of Service
          </p>
        </form>
        <img
          className={s.closePopup}
          src={'https://cdn-icons-png.flaticon.com/512/1828/1828778.png'}
          onClick={handleOnClick}
        />
      </div>
    </div>
  );
};

export default PopupMenu;
