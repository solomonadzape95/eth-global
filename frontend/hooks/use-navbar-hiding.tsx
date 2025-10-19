import * as React from "react";
export function useNavbarHide(){
    const [scrollDirection,setScrollDirection] = React.useState("up")
    const prevScrollPosition = React.useRef(0)
    const ticking = React.useRef(false)

    React.useEffect(() => {
        function onScroll(e: Event){
          const currentScrollPosition = window.scrollY;
      
          if(!ticking.current){
          window.requestAnimationFrame(() => {
            if(currentScrollPosition > prevScrollPosition.current){
              setScrollDirection("down")
            }else{
              setScrollDirection("up")
            }
      
            prevScrollPosition.current = currentScrollPosition;
      
            ticking.current = false
          })
          ticking.current = true
          }
        }
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
      })
      return scrollDirection
}