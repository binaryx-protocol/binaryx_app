import s from './style.module.scss'
import clsx from "clsx";
export const AssetInvestDetails =() =>{
  return(
    <div>
      <div className={s.wrapper}>
        <p className={s.boldText}>Total Investment Value</p>
        <p className={s.boldText}>$332,250</p>
      </div>
      <div className={s.wrapper}>
        <p className={s.greyText}>Underlying asset price</p>
        <p className={s.boldText}>$292,515.46</p>
      </div>
      <div className={s.wrapper}>
        <p className={s.greyText}>Upfront LLC fees</p>
        <p className={s.boldText}>$600</p>
      </div>
      <div className={s.wrapper}>
        <p className={s.greyText}>Initial maintenance reserve (5.1%)</p>
        <p className={s.boldText}>$14,876.54</p>
      </div>
      <div className={s.wrapper}>
        <p className={s.greyText}>Vacancy reserve (2%)</p>
        <p className={s.boldText}>$5,850</p>
      </div>
      <div className={s.wrapper}>
        <p className={s.greyText}>Lofty AI listing fee (5%)</p>
        <p className={s.boldText}>$14,608</p>
      </div>
      <div className={clsx(s.wrapper, s.borderTop)}>
        <p className={s.boldText}>Total returns (IRR)</p>
        <p className={s.boldText}>13.45%</p>
      </div>
      <div className={s.wrapper}>
        <p className={s.greyText}>Projected Appreciation</p>
        <p className={s.boldText}>8.00%</p>
      </div>
      <div className={s.wrapper}>
        <p className={s.greyText}>Cash on Cash return</p>
        <p className={s.boldText}>5.45%</p>
      </div>
      <div className={clsx(s.wrapper, s.borderBottom)}>
        <p className={s.greyText}>Cap Rate</p>
        <p className={s.boldText}>5.45%</p>
      </div>
      <div className={s.wrapper}>
        <p className={s.boldText}>Annual gross rents</p>
        <p className={s.boldText}>$22,440</p>
      </div>
      <div className={s.wrapper}>
        <p className={s.greyText}>Property taxes</p>
        <p className={s.boldText}>$678.76</p>
      </div>
      <div className={s.wrapper}>
        <p className={s.greyText}>Homeowners insurance</p>
        <p className={s.boldText}>$1,290.3</p>
      </div>
      <div className={s.wrapper}>
        <p className={s.greyText}>Property management</p>
        <p className={s.boldText}>$150</p>
      </div>
      <div className={s.wrapper}>
        <p className={s.greyText}>Annual LLC administration and filing fees</p>
        <p className={s.boldText}>$500</p>
      </div>
      <div className={s.wrapper}>
        <p className={s.greyText}>Annual cash flow</p>
        <p className={s.boldText}>$18,111</p>
      </div>
      <div className={s.wrapper}>
        <p className={s.greyText}>Monthly cash flow</p>
        <p className={s.boldText}>$1,509</p>
      </div>
    </div>
  )
}
