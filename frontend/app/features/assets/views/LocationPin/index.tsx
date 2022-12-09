import Image from "next/image";
import locationPinIcon from '../../../../../public/svg/locationPin.svg'

export const LocationPin = () => (
  <div className="pin">
    <Image src={locationPinIcon} alt={'locationPinIcon'} />
  </div>
)
