export const formatPrice = (n) =>
  `$${n.toLocaleString('en-US')}`;

export const savingsPercent = (us, gc) =>
  Math.round(((us - gc) / us) * 100);
