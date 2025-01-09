//Получаем месяц в родительном падеже
function monthPlural(date){
    const a =  date.format('D MMMM');
    const words = a.split(' ');
    const monthX = words[1];
    return monthX;
}

function Calendar({ date }){


    const newDate = date.format('LLLL');

    const dayN = date.date(); // День месяца (число)
    const day = date.format('dddd'); //День недели
    const month =  date.format('MMMM');

    const monthX = monthPlural(date);
    const year = date.year();

    return(
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
      <tr>
        <td className="ui-datepicker-other-month">27</td>
        <td className="ui-datepicker-other-month">28</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
      </tr>
      <tr>
        <td>6</td>
        <td>7</td>
        <td className="ui-datepicker-today">8</td>
        <td>9</td>
        <td>10</td>
        <td>11</td>
        <td>12</td>
      </tr>
    </tbody>
  </table>
</div>
    );
}

export default Calendar