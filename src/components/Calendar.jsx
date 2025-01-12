import {getMonthPlural, getDaysArray} from '../utils.jsx'

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
                <td key = {`week ${i} day ${number1}`} className="ui-datepicker-other-month">{number1}</td>
            );
        }

        let n = [];
        if (daysArray[i].days.includes(dayN)) {
            for (let j = 0; j < daysArray[i].days.length; j++) {
                if (daysArray[i].days[j] == dayN) {
                    n = n.concat(<td key = {`week ${i} day ${j}`} className="ui-datepicker-today">{daysArray[i].days[j]}</td>);
                    
                }
                else {
                    n = n.concat(<td key = {`week ${i} day ${j}`}>{daysArray[i].days[j]}</td>);
                }
            }
        }
        else {
            n = daysArray[i].days.map((number2) =>
                <td key = {`week ${i} day ${number2}`}>{number2}</td>
            );
        }


        let next = [];
        if (daysArray[i].daysOfNextMonth.length > 0) {
            next = daysArray[i].daysOfNextMonth.map((number3) =>
                <td key = {`week ${i} day ${number3}`} className="ui-datepicker-other-month">{number3}</td>
            );
        }
        
        const listItems = prev.concat(n.concat(next));
        let weekId = `week ${i}`;
        listOfWeeks[i] = <tr key = {weekId}>{listItems}</tr>;
        
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