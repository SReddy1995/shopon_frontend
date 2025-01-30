export const getFormattedPriceValue = (value: any) => {
    return Number(value).toFixed(value % 1 === 0 ? 0 : 2)
}