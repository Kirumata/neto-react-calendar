function getFirstWeek(startDay, endDate) {

    let prevDaysArray = Array(startDay - 1);
    for (let i = startDay - 2; i >= 0; i--) {
        prevDaysArray[i] = endDate--;
    }

    let weekDaysArray = Array(7 - prevDaysArray.length);
    for (let i = 0; i < weekDaysArray.length; i++) {
        weekDaysArray[i] = i + 1;
    }

    let week1 = { daysOfPrevMonth: prevDaysArray, days: weekDaysArray, daysOfNextMonth: [] };
    return week1;
}


function getLastWeek(date, daysInLastWeek, daysCounter){
    let weekDaysArray = Array(daysInLastWeek);
        let i = 0;
        while (daysCounter < date.daysInMonth()) {
            weekDaysArray[i++] = ++daysCounter;
        }
        let daysOfNextMonth = Array(7 - daysInLastWeek);
        for (let i = 0; i < (7 - daysInLastWeek); i++) {
            daysOfNextMonth[i] = i + 1;
        }
        let week = { daysOfPrevMonth: [], daysOfNextMonth: daysOfNextMonth, days: weekDaysArray };
        return week;
}


export function getDaysArray(date) {
    /*Хотим объект формата:
    const daysArray = [
    { dayOfPrevMonth: [30, 31], days: [1, 2, 3], daysOfNextMonth:[] },
    { dayOfPrevMonth: [], days: [1, 2, 3], daysOfNextMonth:[] },
    { dayOfPrevMonth: [, days: [1, 2, 3], daysOfNextMonth:[1, 2, 3] }
  ];
    */

    let daysArray = [];

    const startOfMonth = date.clone().startOf('month');

    const startDay = startOfMonth.day();

    const endOfPrevMonth = date.clone().subtract(1, 'months').endOf('month');
    let endDate = endOfPrevMonth.date();

    let daysCounter = 0; //Счётчик, какое число мы добавили в массив
    if (daysCounter == 0 && startDay != 0) {
        const week1 = getFirstWeek(startDay, endDate);
        daysCounter = daysCounter + week1.days.length;
        daysArray.push(week1);
    }

    while (daysCounter < date.daysInMonth() && date.daysInMonth() - daysCounter >= 7) {
        let weekDaysArray = Array(7);
        for (let i = 0; i < 7; i++) {
            weekDaysArray[i] = ++daysCounter;
        }
        let week = { daysOfPrevMonth: [], daysOfNextMonth: [], days: weekDaysArray };
        daysArray.push(week);
    }
    const daysInLastWeek = date.daysInMonth() - daysCounter;
    if (daysInLastWeek > 0) {
        let week = getLastWeek(date, daysInLastWeek, daysCounter);
        daysArray.push(week);
    }


    return daysArray;
}


export function getMonthPlural(date) {
    const a = date.format('D MMMM');
    const words = a.split(' ');
    const monthX = words[1];
    return monthX;
}

