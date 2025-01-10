//Получаем месяц в родительном падеже
function getMonthPlural(date) {
    const a = date.format('D MMMM');
    const words = a.split(' ');
    const monthX = words[1];
    return monthX;
}

function getDaysArray(date) {

    const startOfMonth = date.clone().startOf('month');

    const startDay = startOfMonth.day();


    let daysArray = Array(startDay);

    const endOfPrevMonth = date.clone().subtract(1, 'months').endOf('month');
    let endDate = endOfPrevMonth.date();

    for (let i = startDay - 1; i > 0; i--) {
        daysArray[i] = endDate--;
    }
    daysArray[startDay] = startOfMonth.date();

    const daysInCurrentMonth = date.daysInMonth();

    for (let i = 2; i < daysInCurrentMonth + 1; i++) {
        daysArray.push(i);
    }

    let dayOfNextMonth = 1;
    while ((daysArray.length - 1) % 7 != 0) {
        daysArray.push(dayOfNextMonth++);
    }
    return daysArray;
}

function getStartWeek(date, startDay, endDate, daysCounter) {

    let prevDaysArray = Array(startDay - 1);
    for (let i = startDay - 2; i >= 0; i--) {
        prevDaysArray[i] = endDate--;
    }

    let weekDaysArray = Array(7 - prevDaysArray.length);
    for (let i = 0; i < weekDaysArray.length; i++) {
        weekDaysArray[i] = i + 1;
        daysCounter++;
    }

    let today = -1;

    if (weekDaysArray.includes(date.date())) {
        today = date.date();
    }

    let nextMonthDays = [];
    let week1 = { today: today, daysOfPrevMonth: prevDaysArray, days: weekDaysArray, daysOfNextMonth: nextMonthDays };
    return week1;
}


function getDaysArray2(date) {
    /*Хотим объект формата:
    const daysArray = [
    { weekid: 1, dayOfPrevMonth: [30, 31], today: -1, days: [1, 2, 3], daysOfNextMonth:[] },
    { weekid: 2, dayOfPrevMonth: [], today: 8, days: [1, 2, 3], daysOfNextMonth:[] },
    { weekid: 3, dayOfPrevMonth: [, today: -1, days: [1, 2, 3], daysOfNextMonth:[1, 2, 3] }
  ];
    */

    let daysArray = [];

    const startOfMonth = date.clone().startOf('month');

    const startDay = startOfMonth.day();

    const endOfPrevMonth = date.clone().subtract(1, 'months').endOf('month');
    let endDate = endOfPrevMonth.date();

    let daysCounter = 0; //Счётчик, какое число мы добавили в массив
    let weeksCounter = 0;
    if (daysCounter == 0 && startDay != 0) {
        const week1 = getStartWeek(date, startDay, endDate, daysCounter);
        week1.weekid = weeksCounter++;
        daysCounter = daysCounter + week1.days.length;
        daysArray.push(week1);
    }

    while (daysCounter < date.daysInMonth() && date.daysInMonth() - daysCounter >= 7) {
        let weekDaysArray = Array(7);
        for (let i = 0; i < 7; i++) {
            weekDaysArray[i] = ++daysCounter;
        }
        let today = -1;
        if (weekDaysArray.includes(date.date())) {
            today = date.date();
        }
        let week = { weekid: weeksCounter++, today: today, daysOfPrevMonth: [], daysOfNextMonth: [], days: weekDaysArray };
        daysArray.push(week);
    }
    const daysInLastWeek = date.daysInMonth() - daysCounter;
    if (daysInLastWeek < 7) {
        let weekDaysArray = Array(daysInLastWeek);
        let i = 0;
        while (daysCounter < date.daysInMonth()) {
            weekDaysArray[i++] = ++daysCounter;
        }
        let today = -1;
        if (weekDaysArray.includes(date.date())) {
            today = date.date();
        }
        let daysOfNextMonth = Array(7 - daysInLastWeek);
        for (let i = 0; i < (7 - daysInLastWeek); i++) {
            daysOfNextMonth[i] = i + 1;
        }
        let week = { weekid: weeksCounter++, today: today, daysOfPrevMonth: [], daysOfNextMonth: daysOfNextMonth, days: weekDaysArray };
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
    //const daysArray = getDaysArray(date);
    const daysArray = getDaysArray2(date);

    const listOfWeeks = Array(daysArray.length);

    for (let i = 0; i < listOfWeeks.length; i++) {
        let prev = [];

        if (daysArray[i].daysOfPrevMonth.length > 0) {
            prev = daysArray[i].daysOfPrevMonth.map((number1) =>
                <td className="ui-datepicker-other-month">{number1}</td>
            );
        }
        let n = daysArray[i].days.map((number2) =>
            <td>{number2}</td>
        );

        let next = [];
        if (daysArray[i].daysOfNextMonth.length > 0) {
            next = daysArray[i].daysOfNextMonth.map((number1) =>
                <td className="ui-datepicker-other-month">{number1}</td>
            );
        }

        const listItems = prev.concat(n.concat(next));
        listOfWeeks[i] = <tr>{listItems}</tr>;
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