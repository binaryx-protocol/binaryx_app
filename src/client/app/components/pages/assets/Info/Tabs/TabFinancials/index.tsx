import React, { FC } from 'react';
import TabRow from '../TabRow';
import s from './styles.module.scss';

type Props = {
  items: Array<{ item: { title: string; value: string | number } }>;
};

const TabFinancials: FC<Props> = ({ items }: Props) => {
  return (
    <div className={s.tabFinancials}>
      {items.map((application, index) =>
        Object.values(application).map(({ title, value }) => {
          return <TabRow key={index} title={title} value={value} />;
        }),
      )}
    </div>
  );
};

export default TabFinancials;
