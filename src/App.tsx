import React from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import EmployeeList from './components/EmployeeComponent';
import TimesheetDetail from './components/TimesheetDetail';
import { EmployeeProvider } from './context/EmployeeContexts';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>

      <Route element={<EmployeeList />} path='/' />
      <Route path="/employee/:employeeId" element={<TimesheetDetail />} />

    </>
  )
)

function App() {
  return (
    <>
      <EmployeeProvider>
        <RouterProvider router={router} />
      </EmployeeProvider>
    </>
  )
}

export default App;