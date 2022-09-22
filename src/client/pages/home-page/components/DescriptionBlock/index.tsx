import { ReactChild, FC } from 'react';
import s from './styles.module.scss';

type Props = {
  year?: string;
  children: ReactChild | ReactChild[];
};

const DescriptionBlock: FC<Props> = ({ year, children }) => {
  return (
    <>
      {year ? (
        <div className={s.yearBlock}>
          <h2>{year}</h2>
        </div>
      ) : (
        ''
      )}
      <div className={s.descriptionBlock}>
        <ul>{children}</ul>
      </div>
    </>
  );
};

export default DescriptionBlock;
