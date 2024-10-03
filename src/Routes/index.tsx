
import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../Pages/Home/index'
import ProfessorCalendar from '../Pages/ProfessorCalendar'
import CitizenCalendar from '../Pages/CitizenCalendar'
import AdminForm from '../Pages/Admin/Form'
import Login from '../Pages/Login'
import {useAuth} from '../Context/AuthContext'
import AdminList from '../Pages/Admin/List'
import ManagerList from '../Pages/Manager/List'
import ManagerForm from '../Pages/Manager/Form'
import ProfessorForm from '../Pages/Professor/Form'
import ProfessorList from '../Pages/Professor/List'
import CitizenList from '../Pages/Citizen/List'
import ActivityForm from '../Pages/Activity/Form'
import ActivityList from '../Pages/Activity/List'
import MainPage from '../Pages/MainPage'
import PublicActivityList from '../Pages/PublicActivityList'
import Register from '../Pages/Register'
import MyAccount from '../Pages/MyAccount'
import EditProfile from '../Pages/MyAccount/Edit'

const RoutesMap = () => {
  const {
    isLoggedIn, 
    loadingAuthState, 
    setLoadingAuthState, 
    isAdmin,
    isManager,
    isCitizen,
    isProfessor
  } = useAuth()

  useEffect(() => {
    setLoadingAuthState(false)
  }
  , [])

  if (loadingAuthState) {
    return <div>Loading...</div>
  }

  return (
    <Routes>
      <Route path='/activities' element={<PublicActivityList />} />

      {isLoggedIn ? (
        <>
          <Route path="/activities" element={<PublicActivityList />} />
          
          {isProfessor && 
            <>
              <Route path="/professors">
                <Route path="schedule" element={<ProfessorCalendar/>} />
              </Route>
              <Route path='/my-account'>
                <Route path='' element={<MyAccount />} />
                <Route path='edit' element={<EditProfile />} />
              </Route>
            </>
          }

          {isCitizen &&
            <>
              <Route path="/citizens">
                <Route path="schedule" element={<CitizenCalendar/>} />
              </Route>
              <Route path='/my-account'>
                <Route path='' element={<MyAccount />} />
                <Route path='edit' element={<EditProfile />} />
              </Route>
            </>
          }
          
          {isAdmin && (  
            <>
              <Route path="/admins">
                <Route path="form" element={<AdminForm />} />
                <Route path="list" element={<AdminList />} />
              </Route>
              <Route path="/managers">
                <Route path="form/:id?" element={<ManagerForm />} />
                <Route path="list" element={<ManagerList />} />
              </Route>
              <Route path="/professors">
                <Route path="form/:id?" element={<ProfessorForm />} />
                <Route path="list" element={<ProfessorList />} />
              </Route>
              <Route path="/citizens">
                <Route path="list" element={<CitizenList />} />
              </Route>
              <Route path="/activities">
                <Route path="form/:id?" element={<ActivityForm />} />
                <Route path='list' element={<ActivityList />} />
              </Route>
            </>
          )}

          {isManager && (
            <>
              <Route path="/professors">
                <Route path="form/:id?" element={<ProfessorForm />} />
                <Route path="list" element={<ProfessorList />} />
              </Route>
              <Route path="/citizens">
                <Route path="list" element={<CitizenList />} />
              </Route>
              <Route path="/activities">
                <Route path="form/:id?" element={<ActivityForm />} />
                <Route path='list' element={<ActivityList />} />
              </Route>
            </>
          )}
          <Route path="/" element={<Home />} />
        </>
      ) : (
        <>
          <Route path="/login" element={ isLoggedIn ? <Navigate to="/" /> :  <Login />} />
          <Route path="/register" element={ isLoggedIn ? <Navigate to="/" /> :  <Register />} />
          <Route path="/" element={ isLoggedIn ? <Navigate to="/" /> :  <MainPage />} />
        </>
      )}
    </Routes>
  )
}

export default RoutesMap
