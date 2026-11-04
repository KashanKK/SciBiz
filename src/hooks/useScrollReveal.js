import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollReveal(selector = "[data-reveal]") {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const elements = gsap.utils.toArray(selector);
    const animations = [];

    elements.forEach((element) => {
      const fadeOnly = element.dataset.reveal === "fade";

      const animation = gsap.fromTo(
        element,
        {
          opacity: 0,
          ...(fadeOnly ? {} : { y: 45 }),
        },
        {
          opacity: 1,
          ...(fadeOnly ? {} : { y: 0 }),
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 95%",
            once: true,
          },
        }
      );

      animations.push(animation);
    });

    ScrollTrigger.refresh();

    return () => {
      animations.forEach((animation) => {
        animation.scrollTrigger?.kill();
        animation.kill();
      });
    };
  }, [selector]);
}