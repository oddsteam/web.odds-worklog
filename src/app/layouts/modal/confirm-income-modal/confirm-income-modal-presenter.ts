export class ConfirmIncomePresenter {

    public calVAT(netIncome: string): string {
        return (this.stringToNumber(netIncome) * 0.07).toString();
    }

    public calWHT(netIncome: string): string {
        return (this.stringToNumber(netIncome) * 0.03).toString();
    }

    public calTotal(netIncome: string, vat: string, wht: string): string {
        return (
            this.stringToNumber(netIncome) +
            this.stringToNumber(vat) -
            this.stringToNumber(wht)
        ).toString();
    }

    private stringToNumber(text: string): number {
        return Number(this.cutComma(text));
    }

    private cutComma(text: string): string {
        return text.replace(/,/g, "");
    }
}