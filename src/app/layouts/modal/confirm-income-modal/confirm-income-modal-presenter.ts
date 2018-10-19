export class ConfirmIncomePresenter {

    // ลืมสูตร เดี๋ยวกลับไปดูครับ

    public calVAT(netIncome: string): string {
        return (Number(this.cutComma(netIncome))).toString();
    }

    public calWHT(netIncome: string): string {
        return (Number(this.cutComma(netIncome))).toString();
    }

    public calTotal(netIncome: string): string {
        return (Number(this.cutComma(netIncome))).toString();
    }

    private cutComma(text: string): string {
        return text.replace(/,/g, "");
    }
}