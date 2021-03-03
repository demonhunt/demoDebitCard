export function validateSKU(text) {
  return /^[0-9]{10,15}-{0,1}[0-9,a-z]{0,5}$/i.test(text);
}
