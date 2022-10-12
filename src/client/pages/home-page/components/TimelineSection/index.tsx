import { FC, useEffect, useRef } from 'react';
import classNames from 'classnames';
import AnimationElement from '../AnimationElement';
import YearBlock from './YearBlock';
import s from './styles.module.scss';
import DescriptionBlock from './DescriptionBlock';

type Props = {
  className?: string;
};

const TimelineSection: FC<Props> = ({ className }) => {
  const timelineGrid = useRef<HTMLDivElement>(null);

  const toggleClassName = (
    className: string,
    entry: IntersectionObserverEntry,
  ) => {
    const parentBlocks = entry.target.children;
    for (let i = 0; i < parentBlocks.length; i++) {
      parentBlocks[i].classList.toggle(className, entry.isIntersecting);
      const childBlocks = entry.target.children[i].children;
      for (let j = 0; j < childBlocks.length; j++) {
        childBlocks[j].classList.toggle(className, entry.isIntersecting);
      }
    }
  };

  useEffect(() => {
    const isDesktop = window.innerWidth > 768;
    const observer = new IntersectionObserver(([entry]) => {
      if (isDesktop) {
        toggleClassName(s.isShow, entry);
      }
      if (entry.isIntersecting) observer.unobserve(entry.target);
    });
    observer.observe(timelineGrid.current);
  }, []);

  return (
    <section className={classNames(s.timeline, className)}>
      <div className={s.container}>
        <div ref={timelineGrid} className={s.timelineGrid}>
          <AnimationElement order={1.8} className={s.timelineSeparatorTr}>
            <div />
          </AnimationElement>
          <ul className={s.timelineSeparatorBars}>
            <AnimationElement className={s.bar} order={2.8}>
              <li />
            </AnimationElement>
            <AnimationElement className={s.bar} order={3.8}>
              <li />
            </AnimationElement>
            <AnimationElement className={s.bar} order={4.8}>
              <li />
            </AnimationElement>
            <AnimationElement className={s.bar} order={5.8}>
              <li />
            </AnimationElement>
            <AnimationElement className={s.bar} order={6.8}>
              <li />
            </AnimationElement>
            <AnimationElement className={s.bar} order={7.8}>
              <li />
            </AnimationElement>
          </ul>
          <div className={s.timelineHeaders}>
            <AnimationElement order={8.8}>
              <h1 className={s.timelineTitle}>Timeline</h1>
            </AnimationElement>
            <AnimationElement order={15.8}>
              {/*<h3 className={s.subTitle}>Product</h3>*/}
            </AnimationElement>
            <AnimationElement order={16.8}>
              {/*<h3 className={s.subTitle}>Marketing</h3>*/}
            </AnimationElement>
            {/*<h3>Organization</h3>*/}
          </div>
          <div className={s.timelineColumn}>
            <YearBlock year={2022} animationOrder={9.8} />
            <DescriptionBlock animationOrder={17.8}>
              <li>MVP Building</li>
            </DescriptionBlock>
            <DescriptionBlock animationOrder={18.8}>
              <li>– Socials launch</li>
              <li>– First 750 members onboarded</li>
            </DescriptionBlock>
            {/*<DescriptionBlock>*/}
            {/*  <li>Legal set up</li>*/}
            {/*</DescriptionBlock>*/}
          </div>
          <div className={s.timelineColumn}>
            <YearBlock year={'Q1 2023'} animationOrder={10.8} />
            <DescriptionBlock animationOrder={19.8}>
              <li>Binaryx marketplace pre-launch on Testnet v1, v2</li>
            </DescriptionBlock>
            <DescriptionBlock animationOrder={20.8}>
              <li>&gt; 5k members onboarded</li>
              <li>&gt; 2k KYC done</li>
            </DescriptionBlock>
            {/*<DescriptionBlock>*/}
            {/*  <li>Seed round</li>*/}
            {/*</DescriptionBlock>*/}
          </div>
          <div className={s.timelineColumn}>
            <YearBlock year={'Q2 2023'} animationOrder={11.8} />
            <DescriptionBlock animationOrder={21.8}>
              <li>Testnet v3 launch</li>
            </DescriptionBlock>
            <DescriptionBlock animationOrder={22.8}>
              <li>– Academy launch</li>
              <li>– Ambassador program launch</li>
            </DescriptionBlock>
            {/*<DescriptionBlock>*/}
            {/*  <li>IDO</li>*/}
            {/*</DescriptionBlock>*/}
          </div>
          <div className={s.timelineColumn}>
            <YearBlock year={'Q3 2023'} animationOrder={12.8} />
            <DescriptionBlock animationOrder={23.8}>
              <li>Binaryx marketplace official launch</li>
            </DescriptionBlock>
            <DescriptionBlock animationOrder={24.8}>
              <li>– Airdrop for the first academy graduates</li>
              <li>– Staking program</li>
              <li>&gt; 70k members onboarded</li>
              <li>&gt; 7k $aBNRX holders</li>
            </DescriptionBlock>
            {/*<DescriptionBlock>*/}
            {/*  <li>– Token launch</li>*/}
            {/*  <li>– DAO launch</li>*/}
            {/*</DescriptionBlock>*/}
          </div>
          <div className={s.timelineColumn}>
            <YearBlock year={'Q4 2023'} animationOrder={13.8} />
            <DescriptionBlock animationOrder={25.8}>
              <li>1 st Smart contact audit</li>
            </DescriptionBlock>
            <DescriptionBlock animationOrder={26.8}>
              <li>Referral program launch</li>
              <li>200k members onboarded</li>
              <li>&gt; 20k $aBNRX holders</li>
            </DescriptionBlock>
          </div>
          <div className={s.timelineColumn}>
            <YearBlock year={2024} animationOrder={14.8} />
            <DescriptionBlock animationOrder={27.8}>
              <li>Other DeFi services launch The secondary market</li>
            </DescriptionBlock>
            <DescriptionBlock animationOrder={28.8}>
              <li>&gt; 100k $aBRX holders</li>
            </DescriptionBlock>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
