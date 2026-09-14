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

import SkillsList from './components/Skills/SkillsList';
import SkillForm from './components/Skills/SkillForm';
import SkillDetails from './components/Skills/SkillDetails';

import SwapList from './components/Swaps/SwapList';
import SwapDetails from './components/Swaps/SwapDetails';
import SwapForm from './components/Swaps/SwapForm';
import SwapEdit from './components/Swaps/SwapEdit';
<<<<<<< Updated upstream

import ReviewList from './components/Reviews/ReviewList';
import ReviewDetails from './components/Reviews/ReviewDetails';
import ReviewForm from './components/Reviews/ReviewForm';

=======
import ReviewList from './components/Reviews/ReviewList';
>>>>>>> Stashed changes

import { UserContext } from './contexts/UserContext';

import './App.css';

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

        {/* Skills */}
        <Route
          path="/skills"
          element={user ? <SkillsList /> : <SignInForm />}
        />

        <Route
          path="/skills/new"
          element={user ? <SkillForm /> : <SignInForm />}
        />

        <Route
          path="/skills/:id"
          element={user ? <SkillDetails /> : <SignInForm />}
        />

        <Route
          path="/skills/:id/edit"
          element={user ? <SkillForm /> : <SignInForm />}
        />

        {/* Swaps */}
        <Route
          path="/swaps"
          element={user ? <SwapList /> : <SignInForm />}
        />

        <Route
          path="/swaps/new"
          element={user ? <SwapForm /> : <SignInForm />}
        />

        <Route
          path="/swaps/:swapId"
          element={user ? <SwapDetails /> : <SignInForm />}
        />

        <Route
          path="/swaps/:swapId/edit"
          element={user ? <SwapEdit /> : <SignInForm />}
        />

        <Route
          path="/reviews"
          element={user ? <ReviewList /> : <SignInForm />}
<<<<<<< Updated upstream
        />

        <Route
          path="/reviews/:reviewId"
          element={user ? <ReviewDetails /> : <SignInForm />}
        />

        <Route
          path="/reviews/new"
          element={user ? <ReviewForm /> : <SignInForm />}
=======
>>>>>>> Stashed changes
        />
      </Routes>
    </>
  );
};

export default App;