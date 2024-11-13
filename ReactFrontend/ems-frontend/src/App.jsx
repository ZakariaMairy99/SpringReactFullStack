
import './App.css'
import FooterCompenent from './components/FooterCompenent'
import HeaderComponent from './components/HeaderComponent'
import ListeEmployeeComponent from './components/ListeEmployeeComponent'
import EmployeeComponent from './components/EmployeeComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
          <Routes>
            {/* //http://localhost:3000 */}
            <Route path='/' element={<ListeEmployeeComponent />}></Route>
            {/* //http://localhost:3000/employees */}
            <Route path='/employees' element={<ListeEmployeeComponent />}></Route>
            {/* //http://localhost:3000/add-employee */}
            <Route path='/add-employee' element={<EmployeeComponent />}></Route>
            {/* //http://localhost:3000/update-employee/:id */}
            <Route path='/edit-employee/:id' element={<EmployeeComponent />}></Route>
          </Routes> 
        <FooterCompenent />
      </BrowserRouter>
        
    </>
  )
}

export default App
