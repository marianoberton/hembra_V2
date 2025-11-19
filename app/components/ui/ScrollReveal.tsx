"use client";

import React, { useEffect, useRef, useMemo, ReactNode, RefObject, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const [isClient, setIsClient] = useState(false);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    
    // Check if text contains HTML tags
    if (text.includes('<strong>')) {
      // Parse HTML and split by words while preserving tags
      const parts = text.split(/(<strong>.*?<\/strong>)/g);
      const wordIndex = 0;
      
      return parts.map((part, partIndex) => {
        if (part.startsWith('<strong>')) {
          // Handle strong tags
          const content = part.replace(/<\/?strong>/g, '');
          return content.split(/(\s+)/).map((word, index) => {
            if (word.match(/^\s+$/)) return word;
            return (
              <strong className="inline-block word" key={`${partIndex}-${index}`}>
                {word}
              </strong>
            );
          });
        } else {
          // Handle regular text
          return part.split(/(\s+)/).map((word, index) => {
            if (word.match(/^\s+$/)) return word;
            return (
              <span className="inline-block word" key={`${partIndex}-${index}`}>
                {word}
              </span>
            );
          });
        }
      }).flat();
    } else {
      // Original logic for plain text
      return text.split(/(\s+)/).map((word, index) => {
        if (word.match(/^\s+$/)) return word;
        return (
          <span className="inline-block word" key={index}>
            {word}
          </span>
        );
      });
    }
  }, [children]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    gsap.fromTo(
      el,
      { transformOrigin: "0% 50%", rotate: baseRotation },
      {
        ease: "none",
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom",
          end: rotationEnd,
          scrub: true,
        },
      }
    );

    const wordElements = el.querySelectorAll<HTMLElement>(".word");

    gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: "opacity" },
      {
        ease: "none",
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom-=20%",
          end: wordAnimationEnd,
          scrub: true,
        },
      }
    );

    if (enableBlur) {
      gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: "none",
          filter: "blur(0px)",
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top bottom-=20%",
            end: wordAnimationEnd,
            scrub: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [
    isClient,
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
  ]);

  if (!isClient) {
    return (
      <h2 className={`my-5 ${containerClassName}`}>
        <p 
          className={`text-[clamp(1.2rem,3vw,2rem)] leading-[1.4] ${textClassName}`}
          style={{ fontWeight: '300' }}
          dangerouslySetInnerHTML={{ __html: typeof children === "string" ? children : "" }}
        />
      </h2>
    );
  }

  return (
    <h2 ref={containerRef} className={`my-5 ${containerClassName}`}>
      <p
        className={`text-[clamp(1.2rem,3vw,2rem)] leading-[1.4] ${textClassName}`}
        style={{ fontWeight: '300' }}
      >
        {splitText}
      </p>
    </h2>
  );
};

export default ScrollReveal;