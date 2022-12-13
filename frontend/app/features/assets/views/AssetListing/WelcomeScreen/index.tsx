import s from './styles.module.scss'
import Image from "next/image";
import {Button} from "../../../../../shared/ui/views/Button";
import { ArrowIcon } from 'features/account/views/svg/ArrowIcon';

export const WelcomeScreen = () =>{
  return(
    <div className={s.root}>
    <Image src={'/feature/assets/paper.svg'} alt={'paper'} width={70} height={70}/>
      <p>
        Apply to sell your property on Binaryx
      </p>
      <p>
        Get a cash offer, sell within a few days.
      </p>
      <div>
        <Image src={'/feature/assets/clock.svg'} alt={'clock'} width={20} height={20}/>
        <p>
          Duration 5 minutes
        </p>
      </div>
      <Button>
        Continue
        <Image src={'/svg/arrow.svg'} alt={'paper'} width={15} height={15}/>
      </Button>
    </div>
  )
}
