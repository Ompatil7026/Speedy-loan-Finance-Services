'use client'
import { useEffect } from "react";
import AOS from "aos"
import 'aos/dist/aos.css';

const Aoscompo = ({children}:any) => {
    useEffect(() => {
        AOS.init({
            duration: 400,             // Crisp animation duration (400ms instead of 800ms)
            once: true,                // Trigger animations only once to prevent scrolling lag
            offset: 50,                // Trigger animations earlier (50px offset instead of 120px)
            easing: 'ease-out-cubic',  // Faster initial acceleration for perceived speed
        })
    }, [])
  return (
    <div>
      {children}
    </div>
  )
}

export default Aoscompo
