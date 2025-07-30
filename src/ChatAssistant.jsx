import { motion } from 'framer-motion';

export default function ChatAssistant() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="absolute bottom-5 right-5 bg-white shadow-lg rounded-xl p-4 w-80"
    >
      <p className="text-sm font-medium">Привет! Чем могу помочь?</p>
      {/* Здесь будет поле ввода и ответы */}
    </motion.div>
  );
}