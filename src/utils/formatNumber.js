function formatNumber(num) {
    if (num < 1000) return num.toString();

    const units = [
        { value: 1e9, symbol: "B" },
        { value: 1e6, symbol: "M" },
        { value: 1e3, symbol: "K" },
    ];

    for (let i = 0; i < units.length; i++) {
        if (num >= units[i].value) {
            const value = num / units[i].value;
            if (Number.isInteger(value)) {
                return value + units[i].symbol;
            }
            if (value < 10) {
                return value.toFixed(1).replace(".", ",") + units[i].symbol;
            }
            return value.toString().replace(".", ",") + units[i].symbol;
        }
    }
}
export default formatNumber;
