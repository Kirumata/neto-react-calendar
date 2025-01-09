import './App.css'
import Calendar from './Calendar.jsx'
function App() {
  const now = new Date(2017, 2, 8);

// внутри компонента App:
return (
  <Calendar date={now} />
);
}

export default App
