import { useContext } from 'react';
import { Route, Routes } from 'react-router';

import NavBar from './components/NavBar/NavBar';

import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';

import Dashboard from './components/Dashboard/Dashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import AdminUsers from './components/AdminUsers/AdminUsers';
import AdminSkills from './components/AdminSkills/AdminSkills';
import AdminSwaps from './components/AdminSwaps/AdminSwaps';
import AdminReviews from './components/AdminReviews/AdminReviews';

import Landing from './components/Landing/Landing';

import Profile from './components/Profile/Profile';
import ProfileForm from './components/Profile/ProfileForm';

import SkillsList from './components/Skills/SkillsList';
import SkillForm from './components/Skills/SkillForm';
import SkillDetails from './components/Skills/SkillDetails';

import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);

  const isAdmin = user?.role === 'admin';

  return (
    <>
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <Landing />
            ) : isAdmin ? (
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
          path="/profile"
          element={user ? <Profile /> : <SignInForm />}
        />

        <Route
          path="/profile/edit"
          element={
            user ? <ProfileForm /> : <SignInForm />
          }
        />

        <Route
          path="/skills"
          element={
            user ? <SkillsList /> : <SignInForm />
          }
        />

        <Route
          path="/skills/new"
          element={
            user ? <SkillForm /> : <SignInForm />
          }
        />

        <Route
          path="/skills/:id"
          element={
            user ? <SkillDetails /> : <SignInForm />
          }
        />

        <Route
          path="/skills/:id/edit"
          element={
            user ? <SkillForm /> : <SignInForm />
          }
        />

        <Route
          path="/admin"
          element={
            isAdmin ? (
              <AdminDashboard />
            ) : (
              <SignInForm />
            )
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            isAdmin ? (
              <AdminDashboard />
            ) : (
              <SignInForm />
            )
          }
        />

        <Route
          path="/admin/users"
          element={
            isAdmin ? (
              <AdminUsers />
            ) : (
              <SignInForm />
            )
          }
        />

        <Route
          path="/admin/skills"
          element={
            isAdmin ? (
              <AdminSkills />
            ) : (
              <SignInForm />
            )
          }
        />

        <Route
          path="/admin/swaps"
          element={
            isAdmin ? (
              <AdminSwaps />
            ) : (
              <SignInForm />
            )
          }
        />

        <Route
          path="/admin/reviews"
          element={
            isAdmin ? (
              <AdminReviews />
            ) : (
              <SignInForm />
            )
          }
        />
      </Routes>
    </>
  );
};

export default App;