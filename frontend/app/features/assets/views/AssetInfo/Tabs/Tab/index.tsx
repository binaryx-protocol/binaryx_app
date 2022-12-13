import s from './styles.module.scss'
import clsx from "clsx";

type Props = {
  id: string;
  title: string;
  activeTab: string;
  setActiveTab: any;
  withUnderline?: boolean;
}

export const Tab = (props: Props) => {
  const {id, title, activeTab, setActiveTab, withUnderline} = props

  const handleClick = () => {
    setActiveTab(id);
  };
  return (
    withUnderline ? (
      <div className={clsx(s.elem, activeTab === id ? s.withUnderlineActive : s.withUnderlineInactive)} onClick={handleClick}>
        <p>
          {title}
        </p>
        <div className={clsx(activeTab === id ? s.underline : '')}></div>
      </div>
    ) : (<div className={clsx(s.elem, activeTab === id ? s.active : s.inactive)} onClick={handleClick}>
      <p>
        {title}
      </p>
    </div>)

  )
}
