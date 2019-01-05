export class NumberUtil {

    static formatInteger(data: string): string {
        data = data.replace(/[^0-9.]/g, '');
        data = data.indexOf(',') !== -1 ? data.replace(/,/g, '') : data;
        return data;
    }

    static formatCurrency(Result: string): string {
        Result = Result.substring(0, 9);
        Result = Result.replace(/^(\d+)(\d{3})/, '$1,$2');
        Result = Result.replace(/^(\d+)(\d{3})/, '$1,$2');
        Result = Result.replace(/^(\d+)(\d{3})/, '$1,$2');
        return Result;
    }
}
