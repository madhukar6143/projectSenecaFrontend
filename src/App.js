import { Routes,Route  } from 'react-router-dom';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./userData/login";
import Logout from './userData/logout';
import Signup from "./userData/signup";
import Home from './Home';
import Navigation from './Navigation/Navigation';
import DiseaseRoutes from './Routes/DiseaseRoutes'
import MappedRoutes from './Routes/MappedRoutes'
import SymptomRoutes from './Routes/SymptomRoutes';
import { AuthProvider } from './Auth/auth';
import RequiredAuth from './Auth/requiredAuth';
import SymptomSelector from './MappingOperations/SearchDisease';
import CreateDisease from './DiseaseOperations/CreateDisease'
import EditOrDeleteDisease from './DiseaseOperations/EditOrDeleteDisease';
import CreateSymptom from './SymptomOperations/CreateSymptom';
import EditOrDeleteSymptom from './SymptomOperations/EditOrDeleteSymptom';
import EditingPage from './MappingOperations/EditingPage';
<<<<<<< HEAD

//export const URL = "http://localhost:5000"

export const URL = "http://localhost:3031"
=======
import Combined from './DiseaseOperations/Combined';

export const URL = "http://localhost:5000"
//export const URL = "http://localhost:3031"
>>>>>>> 902ca0c7a90dd442e35a8cf7973065ce6b99ed68



//export const URL = "https://disease-prediction-seneca-backend.onrender.com"


function App() {
  return (
    <AuthProvider>
    <div className="App">
      <Navigation/>
    <Routes>
    <Route path='home' exact  element={<Home/>}/>
    <Route path="disease" element={<RequiredAuth role="admin" ><DiseaseRoutes/></RequiredAuth>}>
      <Route index element={<EditOrDeleteDisease/>}/>
      <Route  path='create' element={<CreateDisease/>}  />
      <Route path='edit' element={<Combined/>}></Route>
    </Route>
    <Route path='/mapped'  element={<RequiredAuth role="admin" ><MappedRoutes/></RequiredAuth>}/>
    <Route path='/edit'  element={<RequiredAuth role="admin" ><EditingPage/></RequiredAuth>}/>
    <Route path='/predict'  element={<RequiredAuth role="user" ><SymptomSelector/></RequiredAuth>}/>
    <Route path='/symptom'  element={<RequiredAuth role="admin" ><SymptomRoutes/></RequiredAuth>}>
      <Route index element={<EditOrDeleteSymptom/>}/>
      <Route  path='create' element={<CreateSymptom/>}  />
      <Route path='edit' element={<EditOrDeleteSymptom/>}></Route>
    </Route>
    <Route path='login' element={<Login/>}/>
    <Route path='logout' element={<Logout/>}/>
    
    <Route path='signup' element={<Signup/>}/>

    
    <Route path="*" element={<Home/>}/>
    
    
    </Routes>
   
    </div>
    </AuthProvider>
  );
}

export default App;


/*<AuthProvider>
    <div className="App">
      <Navigation/>
    <Routes>
    <Route path='home' exact  element={<Home/>}/>
    <Route path='disease'  element={<RequiredAuth role="admin" ><DiseaseRoutes/></RequiredAuth>}/>
    <Route path='/mapped'  element={<RequiredAuth role="admin" ><MappedRoutes/></RequiredAuth>}/>
    <Route path='/predict'  element={<RequiredAuth role="user" ><SymptomSelector/></RequiredAuth>}/>
    <Route path='/symptom'  element={<RequiredAuth role="admin" ><SymptomRoutes/></RequiredAuth>}/>
    <Route path='login' element={<Login/>}/>
    <Route path='logout' element={<Logout/>}/>
    
    <Route path='signup' element={<Signup/>}/>

    
    <Route path="*" element={<Home/>}/>
    
    
    </Routes>
   
    </div>
    </AuthProvider>
    */