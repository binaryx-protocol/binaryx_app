import {useEffect} from "react";
import {useRouter} from "next/router";

export const useOnPageLoad = (setId: (value:number)=> void)=>{
  const {query} = useRouter()
  useEffect(() => {
    const onPageLoad = () => {
      setId(parseInt(query.id as string))
    };
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad);
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, []);
}
