import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FramerDiv: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default FramerDiv;
