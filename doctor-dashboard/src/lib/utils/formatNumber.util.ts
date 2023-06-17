export function formatNumber(value?: string | number): string {
  const result = value
    ? Number(value)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        .replace(".00", "")
    : "0";
  return result;
}

export function abbreviateNumber(value: number) {
  var suffixes = ["", "k", "m", "b", "t"];
  var suffixNum = Math.floor(("" + value).length / 3);
  var shortValue = parseFloat(
    (suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2)
  );
  if (shortValue % 1 != 0) {
    shortValue = Number(shortValue.toFixed(1));
  }
  return String(shortValue) + suffixes[suffixNum];
}
