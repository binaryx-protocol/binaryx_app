import {useState} from "react";
import {Tab} from "../Tab";
import {TabContent} from "../TabContent";
import s from './styles.module.scss'
import {Location} from "../../../Location";
import {IconWrapper} from "../../../IconWrapper";
import Image from "next/image";
import bedAIcon from "../../../../../../../public/feature/assets/bed.svg";
import bathIcon from "../../../../../../../public/feature/assets/bath.svg";
import peopleIcon from "../../../../../../../public/feature/assets/people.svg";
import squareIcon from "../../../../../../../public/feature/assets/square.svg";
import houseIcon from "../../../../../../../public/feature/assets/house.svg";

type Props = {
  activeTab: string;
  setActiveTab: (value: string) => void;
  location: { lat: number, lng: number }
}

export const Tabs = (props: Props) => {
  const {setActiveTab, activeTab, location} = props
  return (
    <div>
      <div className={s.tabs}>
        <Tab id={'details'} title={'Details'} activeTab={activeTab} setActiveTab={setActiveTab}/>
        <Tab id={'financials'} title={'Financials'} activeTab={activeTab} setActiveTab={setActiveTab}/>
        <Tab id={'documents'} title={'Documents'} activeTab={activeTab} setActiveTab={setActiveTab}/>
        <Tab id={'buyingProcess'} title={'Buying Process'} activeTab={activeTab} setActiveTab={setActiveTab}/>
        <Tab id={'market'} title={'Market'} activeTab={activeTab} setActiveTab={setActiveTab}/>
      </div>
      <div className={s.outlet}>
        <TabContent id="details" activeTab={activeTab}>
          <div className={s.detailsIcons}>
            <IconWrapper classname={s.detailsIconElem}>
              <Image src={bedAIcon} alt={'bedAIcon'}/>
              <p>3 Bed</p>
            </IconWrapper>
            <IconWrapper classname={s.detailsIconElem}>
              <Image src={bathIcon} alt={'bathIcon'}/>
              <p>2 Bath</p>
            </IconWrapper>
            <IconWrapper classname={s.detailsIconElem}>
              <Image src={squareIcon} alt={'squareIcon'}/>
              <p>1726 sqft</p>
            </IconWrapper>
            <IconWrapper classname={s.detailsIconElem}>
              <Image src={houseIcon} alt={'houseIcon'}/>
              <p>Single Family</p>
            </IconWrapper>
            <IconWrapper classname={s.detailsIconElem}>
              <Image src={peopleIcon} alt={'peopleIcon'}/>
              <p>Occupied</p>
            </IconWrapper>
          </div>
          <p className={s.tabsContentTitle}>
            About the property
          </p>
          <p className={s.propertyDetails}>
            This property is a recently renovated, fully occupied Duplex and is
            located in Lakewood, Ohio. Lakewood is a safe, affluent suburb of Ohio
            with great schools and a thriving rental market. The renovations were
            completed in the past few months and include adding a 4th bedroom to
            each unit, a brand new bathroom, one fully new kitchen with butcher
            block countertops and a breakfast bar, and much more.
          </p>
          <Location location={location}/>
        </TabContent>
        <TabContent id="financials" activeTab={activeTab}>
          <p className={s.tabsContentTitle}>
            Financials
          </p>
        </TabContent>
        <TabContent id="documents" activeTab={activeTab}>
          <p className={s.tabsContentTitle}>
            Documents
          </p>
        </TabContent>
        <TabContent id="buyingProcess" activeTab={activeTab}>
          <p className={s.tabsContentTitle}>
            Buying Process
          </p>
        </TabContent>
        <TabContent id="market" activeTab={activeTab}>
          <p className={s.tabsContentTitle}>
            Market
          </p>
        </TabContent>
      </div>
    </div>
  );
}
