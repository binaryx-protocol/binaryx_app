import { ReactChild, FC } from 'react';
import s from './styles.module.scss';

type Props = {
  animationOrder?: number;
  children: ReactChild | ReactChild[];
};

const DescriptionBlock: FC<Props> = ({ animationOrder, children }) => {
  return (
    <>
      <div
        style={{ '--order': animationOrder } as any}
        className={s.descriptionBlock}
      >
        <ul>{children}</ul>
      </div>
    </>
  );
};

export default DescriptionBlock;
