"use client";

import React from "react";
import { gsap } from "gsap";
import Link from "next/link";

interface MenuItemProps {
  link: string;
  text: string;
  image: string;
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
  onItemClick?: () => void;
  onFirstItemHover?: (isHovered: boolean) => void;
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [], onItemClick, onFirstItemHover }) => {
  return (
    <div className="w-full h-full overflow-hidden">
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem 
            key={idx} 
            {...item} 
            onItemClick={onItemClick}
            onFirstItemHover={idx === 0 ? onFirstItemHover : undefined}
          />
        ))}
      </nav>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps & { onItemClick?: () => void; onFirstItemHover?: (isHovered: boolean) => void }> = ({ 
  link, 
  text, 
  image, 
  onItemClick,
  onFirstItemHover
}) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);

  const animationDefaults = { duration: 0.6, ease: "expo" };

  const findClosestEdge = (
    mouseX: number,
    mouseY: number,
    width: number,
    height: number
  ): "top" | "bottom" => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist =
      Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    
    // Notify parent if this is the first item - add check to prevent errors
    if (onFirstItemHover && typeof onFirstItemHover === 'function') {
      try {
        onFirstItemHover(true);
      } catch (error) {
        console.warn('Error calling onFirstItemHover:', error);
      }
    }
    
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    // Clear any existing animation
    gsap.killTweensOf([marqueeRef.current, marqueeInnerRef.current]);
    
    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" });
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    
    // Notify parent if this is the first item - add check to prevent errors
    if (onFirstItemHover && typeof onFirstItemHover === 'function') {
      try {
        onFirstItemHover(false);
      } catch (error) {
        console.warn('Error calling onFirstItemHover:', error);
      }
    }
    
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    // Clear any existing animation
    gsap.killTweensOf([marqueeRef.current, marqueeInnerRef.current]);

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }).to(
      marqueeInnerRef.current,
      { y: edge === "top" ? "101%" : "-101%" },
      "<"
    );
  };

  const repeatedMarqueeContent = React.useMemo(() => {
    return Array.from({ length: 4 }).map((_, idx) => (
      <React.Fragment key={idx}>
        <span 
          className="uppercase font-light text-[3vh] md:text-[4vh] leading-[1.2] p-[1vh_1vw_0] tracking-wider"
          style={{ color: '#3D4A3D' }}
        >
          {text}
        </span>
        <div
          className="w-[120px] md:w-[200px] h-[4vh] md:h-[7vh] my-[1em] md:my-[2em] mx-[2vw] p-[1em_0] rounded-[50px] bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      </React.Fragment>
    ));
  }, [text, image]);

  const handleClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <div
      className="flex-1 relative overflow-hidden text-center shadow-[0_-1px_0_0_rgba(255,255,255,0.1)]"
      ref={itemRef}
    >
      <Link
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-light tracking-wider text-[3vh] md:text-[4vh] transition-colors duration-300"
        style={{ 
          color: '#cedbbf',
          backgroundColor: 'transparent'
        }}
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {text}
      </Link>
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none translate-y-[101%]"
        style={{ backgroundColor: '#fefcfb' }}
        ref={marqueeRef}
      >
        <div className="h-full w-[200%] flex" ref={marqueeInnerRef}>
          <div className="flex items-center relative h-full w-[200%] will-change-transform animate-marquee">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowingMenu; 