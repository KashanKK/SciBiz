import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export default function CategoryCard({
  category,
  isWide,
  square,
  wide,
  onSelect,
  canHover,
  onHoverStart,
  onHoverEnd,
}) {
  const reduce = useReducedMotion() === true;
  const duration = reduce ? 0.01 : 0.4;

  return (
    <motion.button
      type="button"
      className={isWide ? "category-card is-wide" : "category-card"}
      data-wide={isWide ? "true" : "false"}
      initial={false}
      animate={{
        width: isWide ? wide : square,
        height: square,
        backgroundColor: isWide ? "#171816" : "#f7f6f2",
        color: isWide ? "#f4f2ec" : "#141513",
      }}
      exit={{ opacity: 0, transition: { duration: reduce ? 0.01 : 0.16 } }}
      transition={{ duration, ease: EASE }}
      onClick={() => onSelect(category.id)}
      onMouseEnter={canHover ? onHoverStart : undefined}
      onMouseLeave={canHover ? onHoverEnd : undefined}
      aria-expanded="false"
      aria-label={`Open ${category.name}`}
    >
      <span className="category-copy">
        <span className="category-name">{category.name}</span>
        <AnimatePresence initial={false}>
          {isWide ? (
            <motion.span
              key="intro"
              className="category-intro-wrap"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: reduce ? 0.01 : 0.32, ease: EASE }}
            >
              <span className="category-intro">{category.introduction}</span>
            </motion.span>
          ) : null}
        </AnimatePresence>
      </span>
    </motion.button>
  );
}
