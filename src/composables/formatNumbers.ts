export function formatPrettyPrice(originalValue: number | undefined): string {
    if(!originalValue) {
        return "-"
    }
    
    let formatter = new Intl.NumberFormat("de-DE", {minimumFractionDigits: 2});
    let formattedNum = formatter.format(originalValue)
    
    return "€ " + formattedNum;
}

export function formatNumberStringToFloat(originalValue: string | number): number {
    // This function takes in account the special characters that come with a price string.
    // In that scenario, parseInt or parseFloat does not suffice.
    if(!originalValue){
        return 0
    }

    if(typeof(originalValue) == "string") {
        // Format price input to proper float.
        let formattedValue: number = parseFloat((originalValue).replace(".", "").replace(",","."))
        console.log("formatted value:", formattedValue)
        return formattedValue;
    } else {
        return originalValue
    }
}