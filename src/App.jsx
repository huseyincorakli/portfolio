import { Link, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Me from './components/Me'
import Projects from './components/Projects'
import Contact from './components/Contact'


function App() {
  return (
    <div className=" text-white">
      
      <Routes>
    <Route  path="/" element={<Layout />}>
      <Route index element={<Me />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
    </Route>
    </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <div className="flex justify-center flex-row flex-nowrap mt-5">
        
      <div className="basis-1/5">
        <Link  className="btnHeader" to="/"><span>Me</span></Link>
      </div>
      <div className="basis-1/5 mx-7">
      <Link className="btnHeader" to="/projects"><span>Works</span></Link>
        
      </div>
      <div className="basis-1/6">
      <Link className="btnHeader" to="/contact"><span>Contact</span></Link>
      </div>
      </div>
      <br />
      <Outlet />
      
    </div>
    
  );
}

export default App;
