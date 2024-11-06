import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StartPage from './components/pages/StartPage/StartPage'
//import { LearningPage } from './components/pages/LearningPage/LearningPage';
import SplitScreen from './components/pages/StartPage/SplitScreanPage';
import BrailleTrainApp from './brail/BrailleTrainApp';
import BrailleLearningApp from './brail/BrailleLearningApp';
import { Alert } from '@mui/material';

function App() {
  const [typeOfRoute, setType] = useState(localStorage.getItem('route') || ''); 
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    setIsMobile(isMobileDevice);

  }, []);
  const alert =!isMobile &&
    <Alert aria-hidden="true" severity="error" sx={{position:"absolute"}}>
      Функционал приложения доступен только на мобильных устройствах
    </Alert>
    console.log(alert)

  if (isMobile)
  return (
    <BrowserRouter>

      <div className={"App"} aria-live="assertive" tabIndex={0}>
        <Routes >
          <Route  path="/braille" element={<BrailleTrainApp/>}/>
          <Route  path="/" element={<StartPage type={typeOfRoute} setType={setType}/>}/>
          <Route path="/split" element={<SplitScreen type={typeOfRoute} setType={setType}/>}/>
          <Route  path="/training" element={<BrailleTrainApp/>}/>
          <Route  path="/learning" element={<BrailleLearningApp/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
