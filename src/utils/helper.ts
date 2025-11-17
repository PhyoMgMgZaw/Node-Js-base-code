export const generateDevId = (): string => {
  const prefix = "DVF";
  const number = Math.floor(1000000 + Math.random() * 9000000);

  return `${prefix}${number}`;
};
