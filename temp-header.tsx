  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/60 backdrop-blur-2xl border-b-2 border-cyan-300/40 shadow-xl py-2"
          : "bg-white/40 backdrop-blur-xl border-b border-cyan-200/30 shadow-md py-4"
      )}
    >
