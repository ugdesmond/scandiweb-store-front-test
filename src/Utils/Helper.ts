export const getPrice = (prices: any | [], currency: string) => {
    for (let i = 0; i < prices.length; i++) {
        if (prices[i]?.currency.symbol === currency) {
            return prices[i].amount;
        }
    }
    return null;
};
export const enums = {

    Constant: {
        all: "all"
    }
} 