import React, { FC } from 'react';
import SectionFinancials from './SectionFinancials';
import s from './styles.module.scss';

const TabFinancials: FC = () => {
  return (
    <div className={s.tabFinancials}>
      <SectionFinancials
        items={[
          {
            value: `$${0}`,
            title: 'Total Investment Value',
          },
          {
            value: `$${0}`,
            title: 'Underlying asset price',
          },
          {
            value: `$${0}`,
            title: 'Closing costs',
          },
          {
            value: `$${0}`,
            title: 'Upfront LLC Fees',
          },
          {
            value: `$${0}`,
            title: 'Initial maintenance reserve',
          },
          {
            value: `$${0}`,
            title: 'Binaryx AI listing fee',
          },
        ]}
      />
      <SectionFinancials
        items={[
          {
            value: `${0}%`,
            title: 'Total returns (IRR)',
          },
          {
            value: `${0}%`,
            title: 'Projected Appreciation',
          },
          {
            value: `${0}%`,
            title: 'Cash on Cash return',
          },
          {
            value: `${0}%`,
            title: 'Cap Rate',
          },
        ]}
      />
      <SectionFinancials
        items={[
          {
            value: `$${0}`,
            title: 'Annual gross rents',
          },
          {
            value: `$${0}`,
            title: 'Property taxes',
          },
          {
            value: `$${0}`,
            title: 'Homeowners insurance',
          },
          {
            value: `$${0}`,
            title: 'Property management',
          },
          {
            value: `$${0}`,
            title: 'Utilities',
          },
          {
            value: `$${0}`,
            title: 'Annual LLC administration and filing fees',
          },
          {
            value: `$${0}`,
            title: 'Annual cash flow',
          },
          {
            value: `$${0}`,
            title: 'Monthly cash flow',
          },
        ]}
      />
    </div>
  );
};

export default TabFinancials;
