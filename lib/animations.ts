export const ease = [0.16, 1, 0.3, 1] as const;

export const fadeUp = (delay = 0, y = 24) => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, delay, ease: "easeOut" as const } },
});

export const stagger = (i: number, y = 40) => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.13, ease },
  },
});

export const wordVariants = {
  hidden: { opacity: 0, y: 60, skewY: 4 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.9, delay: i * 0.18, ease },
  }),
};
