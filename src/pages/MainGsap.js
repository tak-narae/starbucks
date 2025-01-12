import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const MainPrd = ()=>{
  // gsap.to("#main", {
  //   scrollTrigger: {
  //     trigger: "#main",
  //     start: "top top",
  //     end: "bottom bottom",
  //     scrub: true,
  //     pin: ".main__visual",
  //     markers: false,
  //   },
  // });

  // gsap.from(".main__visual div", {
  //   opacity: 0,
  //   y: 50,
  //   duration: 1,
  //   scrollTrigger: {
  //     trigger: ".main__visual",
  //     start: "top center",
  //     toggleActions: "play none none reverse",
  //   },
  // });
}