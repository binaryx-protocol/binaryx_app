import {WelcomeScreen} from "./WelcomeScreen";
import s from './styles.module.scss'
export const AssetListing = () =>{
  return(
    <div className={s.root}>
      <div className={s.welcomeScreen}>
        <WelcomeScreen />
      </div>
    </div>
  )
}
