export class NumericHelper {
    isNumeric(input: string): boolean {
        return !isNaN(Number(input));
    }
}