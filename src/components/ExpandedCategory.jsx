import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export default function ExpandedCategory({ category, onSelect }) {
  const reduce = useReducedMotion() === true;
  const duration = reduce ? 0.01 : 0.34;

  return (
    <motion.div
      className="expanded"
      role="region"
      aria-label={category.name}
      data-expanded={category.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0.01 : 0.22, ease: EASE }}
    >
      <motion.button
        type="button"
        className="detail-card detail-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration, ease: EASE }}
        onClick={() => onSelect(category.id)}
        aria-expanded="true"
        aria-label={`Close ${category.name}`}
      >
        <span className="category-name">{category.name}</span>
        <span className="detail-intro">{category.introduction}</span>
      </motion.button>

      <motion.article
        className="detail-card detail-description"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration, ease: EASE, delay: reduce ? 0 : 0.05 }}
      >
        <h2 className="detail-label">Description</h2>
        <p>{category.description}</p>
      </motion.article>

      <motion.article
        className="detail-card detail-rules"
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration, ease: EASE, delay: reduce ? 0 : 0.08 }}
      >
        <div className="detail-block">
          <h2 className="detail-label">Rules</h2>
          <p>{category.rules}</p>
        </div>
        {category.additional ? (
          <div className="detail-block">
            <h2 className="detail-label">Additional information</h2>
            <p>{category.additional}</p>
          </div>
        ) : null}
      </motion.article>
    </motion.div>
  );
}
