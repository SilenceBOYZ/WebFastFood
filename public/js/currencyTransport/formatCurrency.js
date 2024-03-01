function formatCurrency(number) {
  return new Intl.NumberFormat("vi", {
    maximumSignificantDigits: 3,
    currency: "VND",
    style: "currency",
  }).format(Number.parseFloat(number));
}
