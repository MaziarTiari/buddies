import moment from 'moment';
export class Utilities {
    public static arraysEqual<T>(a: T[], b: T[]) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (!b.includes(a[i])) {
                return false;
            }
        }
        return true;
    }
    public static isUnixTimeExpired = (time: number) => time - moment().unix() <= 0;
}