import s from "./styles.module.scss";

type Props = {
  children: any;
};

const SideMenu = ({ children }: Props) => {
  return (
    <div className={s.sideMenu}>
      <nav>
        <ul className={s.navList}>
          {children}
        </ul>
      </nav>
    </div>
  )
};

export default SideMenu;
