//Получаем месяц в родительном падеже
function getMonthPlural(date) {
    const a = date.format('D MMMM');
    const words = a.split(' ');
    const monthX = words[1];
    return monthX;
}


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

function getDaysArray(date) {
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

function Calendar({ date }) {


    const dayN = date.date(); // День месяца (число)
    const day = date.format('dddd'); //День недели
    const month = date.format('MMMM');

    const monthX = getMonthPlural(date);
    const year = date.year();

    const daysArray = getDaysArray(date);

    const listOfWeeks = Array(daysArray.length);

    for (let i = 0; i < listOfWeeks.length; i++) {
        let DayKey = 0;
        let prev = [];

        if (daysArray[i].daysOfPrevMonth.length > 0) {
            prev = daysArray[i].daysOfPrevMonth.map((number1) =>
                <td key = {DayKey++} className="ui-datepicker-other-month">{number1}</td>
            );
        }


        let n = [];
        if (daysArray[i].days.includes(dayN)) {
            for (let j = 0; j < daysArray[i].days.length; j++) {
                if (daysArray[i].days[j] == dayN) {
                    n = n.concat(<td className="ui-datepicker-today">{daysArray[i].days[j]}</td>);
                }
                else {
                    n = n.concat(<td key = {DayKey++}>{daysArray[i].days[j]}</td>);
                }
            }
        }
        else {
            n = daysArray[i].days.map((number2) =>
                <td key = {DayKey++}>{number2}</td>
            );
        }


        let next = [];
        if (daysArray[i].daysOfNextMonth.length > 0) {
            next = daysArray[i].daysOfNextMonth.map((number3) =>
                <td key = {DayKey++} className="ui-datepicker-other-month">{number3}</td>
            );
        }

        const listItems = prev.concat(n.concat(next));
        listOfWeeks[i] = <tr key = {i}>{listItems}</tr>;
        
    }

    return (
        <div className="ui-datepicker">
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">{day}</div>
                <div className="ui-datepicker-material-date">
                    <div className="ui-datepicker-material-day-num">{dayN}</div>
                    <div className="ui-datepicker-material-month">{monthX}</div>
                    <div className="ui-datepicker-material-year">{year}</div>
                </div>
            </div>
            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                    <span className="ui-datepicker-month">{month}</span>&nbsp;<span className="ui-datepicker-year">{year}</span>
                </div>
            </div>
            <table className="ui-datepicker-calendar">
                <colgroup>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col className="ui-datepicker-week-end"></col>
                    <col className="ui-datepicker-week-end"></col>
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col" title="Понедельник">Пн</th>
                        <th scope="col" title="Вторник">Вт</th>
                        <th scope="col" title="Среда">Ср</th>
                        <th scope="col" title="Четверг">Чт</th>
                        <th scope="col" title="Пятница">Пт</th>
                        <th scope="col" title="Суббота">Сб</th>
                        <th scope="col" title="Воскресенье">Вс</th>
                    </tr>
                </thead>
                <tbody>
                    {listOfWeeks}
                </tbody>
            </table>
        </div>
    );
}

export default Calendar