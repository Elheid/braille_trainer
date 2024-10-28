import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StartPage from './components/pages/StartPage/StartPage'
//import { LearningPage } from './components/pages/LearningPage/LearningPage';
import SplitScreen from './components/pages/StartPage/SplitScreanPage';
import BrailleTrainApp from './brail/BrailleTrainApp';
import BrailleLearningApp from './brail/BrailleLearningApp';

function App() {
  const [typeOfRoute, setType] = useState(localStorage.getItem('route') || ''); 
  return (

    <BrowserRouter>
      <div className={"App "}>
        <Routes>
          <Route path="/braille" element={<BrailleTrainApp/>}/>
          <Route path="/" element={<StartPage type={typeOfRoute} setType={setType}/>}/>
          <Route path="/split" element={<SplitScreen type={typeOfRoute} setType={setType}/>}/>
          <Route path="/training" element={<BrailleTrainApp/>}/>
          <Route path="/learning" element={<BrailleLearningApp/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
