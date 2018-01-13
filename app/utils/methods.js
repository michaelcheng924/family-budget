export function getNumber(dollarString) {
    return Math.round(Number(dollarString.replace(/[^0-9\.\-]+/g,'')));
}