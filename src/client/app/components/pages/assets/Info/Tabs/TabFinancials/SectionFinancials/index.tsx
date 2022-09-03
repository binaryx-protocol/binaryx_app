import { FC } from 'react';
import TabRow from '../../TabRow';
import s from './styles.module.scss';

type Props = {
  items: Array<{ title: string; value: string | number }>;
};

const SectionFinancials: FC<Props> = ({ items }: Props) => {
  return (
    <section className={s.sectionTabFinancials}>
      {items.map(({ title, value }, index) => (
        <TabRow key={index} title={title} value={value} />
      ))}
    </section>
  );
};

export default SectionFinancials;
