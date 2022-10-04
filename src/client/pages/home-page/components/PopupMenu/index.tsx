import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import NavSocialImage from '../NavSocialImage';
import s from './styles.module.scss';

type Props = {
  isShowing: boolean;
  setIsShowing: Dispatch<SetStateAction<boolean>>;
};

const PopupMenu = ({ isShowing, setIsShowing }: Props) => {
  const popupMenu = useRef<HTMLDivElement>(null);

  const onKeyUp = (e: KeyboardEvent<HTMLDivElement>) =>
    e.key === 'Escape' ? handleOnClick() : '';

  const handleOnClick = () => {
    popupMenu.current.classList.add(s.closing);
    setTimeout(() => setIsShowing(!isShowing), 500);
  };

  useEffect(() => {
    popupMenu.current.focus();
  }, []);

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
            link={'https://discord.gg/kJqgYh7G9G'}
            src={'https://cdn-icons-png.flaticon.com/512/5968/5968898.png'}
            alt={'discord'}
            className={s.socialImage}
            width={40}
          />
          <NavSocialImage
            link={'https://twitter.com/realBinaryx'}
            src={'https://cdn-icons-png.flaticon.com/512/733/733635.png'}
            alt={'twitter'}
            className={s.socialImage}
            width={40}
          />
          <NavSocialImage
            link={'https://www.linkedin.com/company/realbinaryx/'}
            src={'https://cdn-icons-png.flaticon.com/512/61/61109.png'}
            alt={'linkedIn'}
            className={s.socialImage}
            width={40}
          />
          <NavSocialImage
            link={'https://t.me/binaryxnews'}
            src={'https://cdn-icons-png.flaticon.com/512/2111/2111710.png'}
            alt={'telegram'}
            className={s.socialImage}
            width={40}
          />
        </div>
        <span>or</span>
        <h3 className={s.appeal}>
          Join waitlist and receive only important news via email. No spam, we
          promise
        </h3>
        <form className={s.formSection}>
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
