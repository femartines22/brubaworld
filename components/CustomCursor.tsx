"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const animate = () => {
      curX += (mouseX - curX) * 0.12;
      curY += (mouseY - curY) * 0.12;
      cursor.style.transform = `translate(${curX - 20}px, ${curY - 20}px)`;
      requestAnimationFrame(animate);
    };

    const onEnter = () => cursor.classList.add("scale-[2.5]");
    const onLeave = () => cursor.classList.remove("scale-[2.5]");

    document.addEventListener("mousemove", onMove);
    document
      .querySelectorAll("a, button, [data-hover]")
      .forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });

    const raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full bg-rosa pointer-events-none z-[9999] transition-transform duration-200 ease-out"
        style={{ mixBlendMode: "multiply" }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-rosa pointer-events-none z-[9999]"
        style={{ mixBlendMode: "multiply" }}
      />
    </>
  );
}
