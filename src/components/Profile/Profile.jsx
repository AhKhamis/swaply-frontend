import { useContext, useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router';

import {
  getProfile,
  deleteProfile,
} from '../../services/userService';

import { UserContext } from '../../contexts/UserContext';

const Profile = () => {
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const [user, setProfile] = useState(null);

  const [message, setMessage] = useState('');

  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getProfile();

        setProfile(profile);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadProfile();
  }, []);

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      setMessage('');

      await deleteProfile();

      localStorage.removeItem('token');

      setUser(null);

      navigate('/');
    } catch (err) {
      setMessage(err.message);
      setIsDeleting(false);
    }
  };

  if (!user) {
    return (
      <main className="profile-page">
        <div className="profile-loading">
          {message || 'Loading profile...'}
        </div>
      </main>
    );
  }

  return (
    <main className="profile-page">

      <h1 className="profile-page-title">
        My Profile
      </h1>

      {message && (
        <p className="profile-message">
          {message}
        </p>
      )}

      <section className="profile-header">

        <div className="profile-image-section">

          <div className="profile-image-wrapper">

            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={`${user.name}'s profile`}
              />
            ) : (
              <div className="profile-image-placeholder">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}

            <Link
              to="/profile/edit"
              className="profile-camera-button"
              aria-label="Edit profile photo"
              title="Edit profile photo"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M9 5l1.5-2h3L15 5h3a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h3z"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3.5"
                />
              </svg>
            </Link>

          </div>

        </div>

        <div className="profile-info">

          <span className="profile-label">
            SWAPLY MEMBER
          </span>

          <h1>
            {user.name}
          </h1>

          <p className="profile-email">
            {user.email}
          </p>

          <p className="profile-bio">
            {user.bio ||
              'No bio yet. Tell the Swaply community a little about yourself.'}
          </p>

          <div className="profile-actions">

            <Link
              to="/profile/edit"
              className="profile-edit-button"
            >
              Edit Profile
            </Link>

          </div>

        </div>

      </section>

      <section className="profile-content">

        <div className="profile-card">

          <div className="profile-tabs">

            <button
              type="button"
              className={
                activeTab === 'about'
                  ? 'profile-tab active'
                  : 'profile-tab'
              }
              onClick={() => setActiveTab('about')}
            >
              About
            </button>

            <button
              type="button"
              className={
                activeTab === 'skills'
                  ? 'profile-tab active'
                  : 'profile-tab'
              }
              onClick={() => setActiveTab('skills')}
            >
              Skills
            </button>

            <button
              type="button"
              className={
                activeTab === 'reviews'
                  ? 'profile-tab active'
                  : 'profile-tab'
              }
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>

          </div>

          {activeTab === 'about' && (
            <div className="profile-about">

              <span className="profile-section-label">
                ABOUT ME
              </span>

              <h2>
                About
              </h2>

              <p>
                {user.bio || 'No bio yet.'}
              </p>

            </div>
          )}

          {activeTab === 'skills' && (
            <div className="profile-tab-content">

              <span className="profile-section-label">
                MY SKILLS
              </span>

              <h2>
                Skills I Teach
              </h2>

              <p>
                Your skills will appear here once you add
                them to Swaply.
              </p>

            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="profile-tab-content">

              <span className="profile-section-label">
                COMMUNITY FEEDBACK
              </span>

              <h2>
                Reviews
              </h2>

              <p>
                Reviews from other Swaply members will appear
                here after you complete swaps.
              </p>

            </div>
          )}

        </div>

      </section>

      <section className="profile-danger-zone">

        <div>
          <h2>
            Danger Zone
          </h2>

          <p>
            Permanently delete your Swaply account and all
            associated data.
          </p>
        </div>

        {!showDeleteConfirmation ? (

          <button
            type="button"
            className="delete-account-button"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            Delete Account
          </button>

        ) : (

          <div className="delete-confirmation">

            <h3>
              Are you sure you want to delete your account?
            </h3>

            <p>
              This action cannot be undone.
            </p>

            <div className="delete-confirmation-actions">

              <button
                type="button"
                className="confirm-delete-button"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
              >
                {isDeleting
                  ? 'Deleting...'
                  : 'Delete My Account'}
              </button>

              <button
                type="button"
                className="cancel-delete-button"
                onClick={() => setShowDeleteConfirmation(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>

            </div>

          </div>

        )}

      </section>

    </main>
  );
};

export default Profile;
