import Game from "./components/Game";
import Navbar from "./components/Navbar";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import FindItem from "./components/FindItem";
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import { TouchBackend } from 'react-dnd-touch-backend';
// import { isTouchDevice } from './utils/device';
import EcoPlanner from "./components/EcoPlanner";

export default function App() {
  // const backend = isTouchDevice() ? TouchBackend : HTML5Backend;
  return (
    <div className="min-h-screen w-full" >
        <Router>
      <Navbar className="bg-green-600"/>
      <div className="p-4">
          <Routes>
             {/* <DndProvider backend={backend}> */}
       <Route path="/" element={<Game/>}/>
    {/* </DndProvider> */}
            
            <Route path="/find" element={<FindItem/>}/>
            <Route path="/planner" element={<EcoPlanner/>}/>
          </Routes>
        
      </div>
     </Router>
    </div>
  );
}
