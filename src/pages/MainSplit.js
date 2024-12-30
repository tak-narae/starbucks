import { gsap } from 'gsap';
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SplitEffect = () => {
  const targets = document.querySelectorAll('.split');

  targets.forEach(target => {
    const SplitClient = new SplitType(target, { type: 'lines, words, chars' });
    const chars = SplitClient.chars; //분할된 문자

    gsap.from(chars, {
      yPercent: 100,
      autoAlpha: 0,
      duration: 0.45,
      ease: 'circ.out',
      stagger: {
        amount: 1,
        // from: 'random'
      },
      scrollTrigger: {
        trigger: target,
        start: 'top bottom',
        end: '+=400',
        markers: false,
      },
    });
  });
};

export default SplitEffect;