import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";

export default function CategoryGridLine({ containerRef }) {
  const reduce = useReducedMotion();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 15%"],
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const measure = () => {
      setDimensions({
        width: container.clientWidth,
        height: container.clientHeight,
      });
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(container);

    return () => observer.disconnect();
  }, [containerRef]);

  const { width, height } = dimensions;

  if (!width || !height) return null;

  const path = `
  M -3 ${height * 0.04}

  C ${width * 0.18} ${height * 0.02},
    ${width * 0.32} ${height * 0.16},
    ${width * 0.48} ${height * 0.13}

  C ${width * 0.68} ${height * 0.10},
    ${width * 0.77} ${height * 0.02},
    ${width * 0.72} ${height * 0.19}

  C ${width * 0.67} ${height * 0.34},
    ${width * 0.35} ${height * 0.25},
    ${width * 0.40} ${height * 0.41}

  C ${width * 0.45} ${height * 0.57},
    ${width * 0.79} ${height * 0.43},
    ${width * 0.88} ${height * 0.57}

  C ${width * 0.97} ${height * 0.72},
    ${width * 0.65} ${height * 0.79},
    ${width * 0.48} ${height * 0.69}

  C ${width * 0.30} ${height * 0.58},
    ${width * 0.21} ${height * 0.78},
    ${width * 0.38} ${height * 0.87}

  C ${width * 0.55} ${height * 0.97},
    ${width * 0.83} ${height * 0.83},
    ${width * 0.91} ${height * 1.02}

  C ${width * 0.98} ${height * 1.16},
    ${width * 0.76} ${height * 1.18},
    ${width * 0.65} ${height * 1.20}
`;

  return (
    <svg
      className="category-grid-line"
      viewBox={`0 0 ${width} ${height * 1.2}`}
      style={{ height: "120%" }}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d={path}
        fill="none"
        stroke="#285CFF"
        strokeWidth="25"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          pathLength: reduce ? 1 : scrollYProgress,
        }}
      />
    </svg>
  );
}