export default function formatCurrentcy (number) {
  return new Intl.NumberFormat('vi', { maximumSignificantDigits: 10 }).format(Number.parseInt(number));
}
