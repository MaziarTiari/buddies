import moment from "moment";

export const getDateRangeString = (startTime: number, textBetween: string, endTime?: number) => {
    const from = moment.unix(startTime).format("LLL");
    const until = endTime
        ? moment.unix(endTime).dayOfYear() !== moment.unix(startTime).dayOfYear()
            ? moment.unix(endTime).format("LLL")
            : moment.unix(endTime).format("LT")
        : "";
    return from + (until ? " " + textBetween + " " + until : "");
}