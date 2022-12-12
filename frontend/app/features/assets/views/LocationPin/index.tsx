import Image from "next/image";
import locationPinIcon from '../../../../../public/svg/locationPin.svg'
type Props = {
  lat: number;
  lng: number;
}
export const LocationPin = (props: Props) => (
  <div className="pin">
    <Image src={locationPinIcon} alt={'locationPinIcon'} />
  </div>
)
