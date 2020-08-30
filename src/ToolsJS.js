export function toDateString(date, separator = "/", yearBefore = false) {
    let s = separator ? separator : "/";
    let month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    if (yearBefore)
        return (year + s + month + s + day);
    return (day + s + month + s + year);
}

export function toHourString(date, separator = ":", withSecond = false) {
    let s = separator ? separator : "/";
    let hour = '' + (date.getHours()),
        minute = '' + (date.getMinutes()),
        second = '' + (date.getSeconds());

    if (hour.length < 2)
        hour = '0' + hour;
    if (minute.length < 2)
        minute = '0' + minute;
    if (second.length < 2)
        second = '0' + second;
    if (withSecond)
        return (hour + s + minute + s + second);
    return (hour + s + minute);
}

