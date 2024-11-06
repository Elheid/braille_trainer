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

  if (isMobile)
  return (
    <BrowserRouter aria-hidden="true">
        {!isMobile &&
        <Alert aria-hidden="true" severity="error" sx={{position:"absolute"}}>
          Функционал приложения доступен только на мобильных устройствах
        </Alert>
        }
      <div className={"App"} aria-live="assertive">
        <Routes aria-hidden="true">
          <Route aria-hidden="true"  path="/braille" element={<BrailleTrainApp/>}/>
          <Route aria-hidden="true" path="/" element={<StartPage type={typeOfRoute} setType={setType}/>}/>
          <Route aria-hidden="true" path="/split" element={<SplitScreen type={typeOfRoute} setType={setType}/>}/>
          <Route aria-hidden="true" path="/training" element={<BrailleTrainApp/>}/>
          <Route aria-hidden="true" path="/learning" element={<BrailleLearningApp/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
