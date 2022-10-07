import { FC, ReactChild } from 'react';

type Props = {
  order: number;
  children: ReactChild | ReactChild[];
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const AnimationElement: FC<Props> = ({
  order,
  className,
  onMouseEnter,
  onMouseLeave,
  children,
}) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{ '--order': order } as any}
    >
      {children}
    </div>
  );
};

export default AnimationElement;
