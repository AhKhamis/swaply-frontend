import { useContext } from 'react';
import { Route, Routes } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Dashboard from './components/Dashboard/Dashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import Landing from './components/Landing/Landing';
import Profile from './components/Profile/Profile';
import ProfileForm from './components/Profile/ProfileForm';

import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            !user ? (
              <Landing />
            ) : user.role === 'admin' ? (
              <AdminDashboard />
            ) : (
              <Dashboard />
            )
          }
        />

        {/* Authentication */}
        <Route
          path="/sign-up"
          element={<SignUpForm />}
        />

        <Route
          path="/sign-in"
          element={<SignInForm />}
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={user ? <Profile /> : <SignInForm />}
        />

        <Route
          path="/profile/edit"
          element={user ? <ProfileForm /> : <SignInForm />}
        />
      </Routes>
    </>
  );
};

export default App;