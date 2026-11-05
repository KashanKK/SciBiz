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
    M -3 0
    C ${width * 0.16} ${height * 0.04},
      ${width * 0.03} ${height * 0.09},
      ${width * 0.09} ${height * 0.14}

    C ${width * 0.16} ${height * 0.19},
      ${width * 0.15} ${height * 0.22},
      ${width * 0.07} ${height * 0.27}

    C ${width * 0.01} ${height * 0.32},
      ${width * 0.03} ${height * 0.37},
      ${width * 0.10} ${height * 0.42}

    C ${width * 0.17} ${height * 0.47},
      ${width * 0.14} ${height * 0.51},
      ${width * 0.92} ${height * 0.57}

    C ${width * 0.99} ${height * 0.62},
      ${width * 0.97} ${height * 0.67},
      ${width * 0.90} ${height * 0.72}

    C ${width * 0.83} ${height * 0.77},
      ${width * 0.85} ${height * 0.82},
      ${width * 0.93} ${height * 0.87}

    C ${width * 0.99} ${height * 0.92},
      ${width * 0.94} ${height * 0.96},
      ${width * 0.88} ${height}
  `;

  return (
    <svg
      className="category-grid-line"
      viewBox={`0 0 ${width} ${height}`}
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