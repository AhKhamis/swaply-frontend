import { useContext } from 'react';
import { Route, Routes } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Dashboard from './components/Dashboard/Dashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import Landing from './components/Landing/Landing';
import SwapList from './components/Swaps/SwapList';

import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />

      <Routes>
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

        <Route
          path="/sign-up"
          element={<SignUpForm />}
        />

        <Route
          path="/sign-in"
          element={<SignInForm />}
        />

        <Route
          path="/swaps"
          element={<SwapList />}
        />
      </Routes>
    </>
  );
};

export default App;