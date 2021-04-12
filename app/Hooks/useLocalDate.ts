import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext/LanguageContext";
import moment from 'moment';
import { ITime } from "../components/FormDateInput/FormDatePicker";

// TODO Find a nicer Solution to include only used Locales !
import "moment/locale/de.js";
import "moment/locale/en-gb.js";

export function useLocalDate() {
    const { language } = useContext(LanguageContext);
    
    function getLocale() {
        const locale = language === "de" ? "de" : "en-gb";
        return locale;
    }

    const getLocalDateString = (date: number | Date, shortYear: boolean = true) => {
        const f = shortYear ? "DD.MM.YY" : "DD.MM.YYYY";
         // TODO Find a nicer Solution !
        if (typeof date === "number") {
            return moment.unix(date).locale(getLocale()).format(f);
        } else {
            return moment(date).locale(getLocale()).format(f);
        }
    }

    function getLocalTimeString(ts: number) {
        const d = moment.unix(ts).locale(getLocale());
        const s = d.get("hours") + ":" + d.get("minutes") + ":" + d.get("seconds");
        return s;
    }

    const getLocalDateRange = (date1?: number, date2?: number) => {
        let date: string = "";
        if (date1) {
            date = getLocalDateString(date1);
        }
        if (date2) {
            const endDate = getLocalDateString(date2);
            if (date === endDate) {
                return date === "" ? undefined : date;
            } else {
                date += " - " + endDate;
            }
        }
        return date === "" ? undefined : date;
    }

    const getTimeRange = (t1?: ITime, t2?: ITime) => {
        let time: string = "";
        if (t1) {
            time = getTimeString(t1);
        }
        if (t2) {
            if (t1 && timesAreEqual(t1, t2)) {
                return time === "" ? undefined : time;
            }
            time += " - " + getTimeString(t2);
        }
        return time === "" ? undefined : time;
    }

    const getTimeString = (time: ITime) =>
        time.hour.toString().padStart(2, "0") + ":" +
        time.minute.toString().padStart(2, "0");

    const timesAreEqual = (t1: ITime, t2: ITime) =>
        t1.hour === t2.hour && t1.minute === t2.minute

    const getTimeDate = (time: ITime) => {
        let d = new Date();
        d.setHours(time.hour, time.minute)
        return d;
    }

    const getTime = (date: Date) => ({
        hour: date.getHours(), 
        minute: date.getMinutes()
    })

    return {
        getLocalDateString: getLocalDateString,
        getLocalDateRange: getLocalDateRange,
        getTimeString: getTimeString,
        timesAreEqual: timesAreEqual,
        getTimeRange: getTimeRange,
        getTimeDate,
        getTime,
        getLocalTimeString
    }
}