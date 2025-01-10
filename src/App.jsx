import './App.css'
import Calendar from './Calendar.jsx'
import moment from 'moment/min/moment-with-locales'

function App() {
  
  moment.locale('ru');
  const now = moment();
return (
  <Calendar date={now} />
);
}

export default App
