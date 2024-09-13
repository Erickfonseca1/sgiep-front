
import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../Pages/Home/index'
import ProfessorCalendar from '../Pages/ProfessorCalendar'
import CitizenCalendar from '../Pages/CitizenCalendar'
import ListActivities from '../Pages/ListActivities'
import AdminForm from '../Pages/Admin/Form'
import Login from '../Pages/Login'
import {useAuth} from '../Context/AuthContext'
import AdminList from '../Pages/Admin/List'
import ManagerList from '../Pages/Manager/List'
import ManagerForm from '../Pages/Manager/Form'

const RoutesMap = () => {
  const {isLoggedIn, loadingAuthState, setLoadingAuthState, isAdmin} = useAuth()

  useEffect(() => {
    setLoadingAuthState(false)
  }
  , [])

  if (loadingAuthState) {
    return <div>Loading...</div>
  }

  return (
    <Routes>
      <Route path="/login" element={ isLoggedIn ? <Navigate to="/" /> :  <Login />} />

      {isLoggedIn ? (
        <>
          <Route path="/professors">
            <Route path="schedule" element={<ProfessorCalendar professorId={1} />} />
          </Route>

          <Route path="/citizens">
            <Route path="schedule" element={<CitizenCalendar citizenId={3} />} />
          </Route>

          <Route path="/activities">
            <Route path="" element={<ListActivities />} />
          </Route>
          
          {isAdmin && (  
            <>
              <Route path="/admin">
                <Route path="form" element={<AdminForm />} />
                <Route path="list" element={<AdminList />} />
              </Route>
              <Route path="/managers">
                <Route path="form" element={<ManagerForm />} />
                <Route path="list" element={<ManagerList />} />
              </Route>
              <Route path="/activities">
                <Route path="" element={<ListActivities />} />
              </Route>
            </>
          )}
          <Route path="/" element={<Home />} />
        </>
      ) : (
        // <Route path='*' element={<Navigate to="/login" />} />
        <Route path="/login" element={ isLoggedIn ? <Navigate to="/" /> :  <Login />} />
      )}
    </Routes>
  )
}

export default RoutesMap
