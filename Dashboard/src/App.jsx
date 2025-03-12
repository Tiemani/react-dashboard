import { useState } from 'react'
import Navbar from './components/Navbar';
import Map from './components/Map';
import QuickActions from './components/QuickActions';
import IncidentForm from './components/IncidentForm';
import ReportsPending from './components/ReportsPending';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
    <Navbar />
    <div className="dashboard">
      <Map />
      <QuickActions />
      <IncidentForm />
      <ReportsPending />
    </div>
  </div>
  )
}

export default App
