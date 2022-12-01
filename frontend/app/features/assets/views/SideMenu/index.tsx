import s from "./styles.module.scss";
import clsx from "clsx";

type Props = {
  children: any;
  className?: string
};

const SideMenu = ({ children, className }: Props) => {
  return (
    <div className={clsx(s.sideMenu, className)}>
      <nav>
        <ul className={s.navList}>
          {children}
        </ul>
      </nav>
    </div>
  )
};

export default SideMenu;
