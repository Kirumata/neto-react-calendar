import './App.css'
import Calendar from './Calendar.jsx'
//import moment from 'moment'
import moment from 'moment/min/moment-with-locales'

function App() {
  //const now = new Date();
  
  moment.locale('ru');
  const now = moment();
// внутри компонента App:
return (
  <Calendar date={now} />
);
}

export default App
