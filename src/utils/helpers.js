const colors = [
  '#7E57C2',
  '#FF7043',
  '#E91E63',
  '#E91E63',
  '#AB47BC',
  '#FFA726',
];

export const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};
