"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { name: "Projects Completed", value: 10, suffix: "+" },
  { name: "Years of Study", value: 5, suffix: "+" },
  { name: "Technologies Used", value: 20, suffix: "+" },
  { name: "Code Quality", value: 100, suffix: "%" },
];

function useIntersectionObserver(ref: React.RefObject<HTMLElement>, options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
}

function CountUp({
  end,
  duration = 2000,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setHasAnimated(true);
        }
      };
      requestAnimationFrame(step);
    }
  }, [isVisible, end, duration, hasAnimated]);

  return (
    <div ref={ref} className="text-4xl font-bold text-gradient sm:text-5xl">
      {count}
      {suffix}
    </div>
  );
}

export function QuickStats() {
  return (
    <section className="bg-muted/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-y-16 gap-x-8 text-center lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col gap-y-4">
                <CountUp end={stat.value} suffix={stat.suffix} />
                <p className="text-sm font-semibold leading-6 text-foreground/80">{stat.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
