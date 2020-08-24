import moment from "moment";

export const getDateRangeString = (startTime?: number, textBetween?: string, endTime?: number): string => {
    if (!startTime) return "";
    const from = moment.unix(startTime).format("LLL");
    const until = endTime
        ? moment.unix(endTime).dayOfYear() !== moment.unix(startTime).dayOfYear()
            ? moment.unix(endTime).format("LLL")
            : moment.unix(endTime).format("LT")
        : "";
    textBetween = textBetween ? " " + textBetween + " " : "";
    return from + (until ? textBetween + until : "");
}

export const getDateDiffString = (startTime: number, endTime: number): string => {
    const a = moment.unix(startTime);
    const b = moment.unix(endTime);
    const days = b.diff(a, "days");
    const hours = b.diff(a, "hours") % 24;
    const minutes = b.diff(a, "minutes") % 60;
    return (
        (days > 0 ? (days + "d ") : "") +
        (hours > 0 ? (hours + "h ") : "") +
        (minutes > 0 ? (minutes + "m") : "")
    );
}