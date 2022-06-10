export const createHiddenCard = (cardNumber: string) => {
  const numberCard = cardNumber.substring(12, 15);
  return `**** **** **** ${numberCard}`;
}
