import s from "./styles.module.scss";
import GoogleMapReact from "google-map-react";
import {LocationPin} from "../LocationPin";
type Props = {
  location:{
    lat:number;
    lng:number
  }
}
export const Location = (props: Props) =>{
  const {location} = props
  return(
    <div className={s.googleMap}>
      <p className={s.header}>
        Location
      </p>
       <GoogleMapReact
         bootstrapURLKeys={{key: ''}}
         defaultCenter={location}
         defaultZoom={20}
       >
         <LocationPin
           // @ts-ignore
           lat={location.lat}
           lng={location.lng}/>
       </GoogleMapReact>
    </div>
  )
}
