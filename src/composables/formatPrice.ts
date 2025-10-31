export function formatPrettyPrice(originalValue: number | undefined) {
    if(!originalValue) {
        return "-"
    }
    
    let formatter = new Intl.NumberFormat("de-DE");
    let formattedNum = formatter.format(originalValue)
    
    return "€ " + formattedNum;
}