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
      <h1 className="profile-page-title">My Profile</h1>

      {message && (
        <p className="profile-message">
          {message}
        </p>
      )}

      <section className="profile-header">
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
        </div>

        <div className="profile-info">
          <h2>{user.name}</h2>

          <p className="profile-email">
            {user.email}
          </p>

          <p className="profile-bio">
            {user.bio || 'No bio yet.'}
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
          <h2>About</h2>

          <p>
            {user.bio || 'No bio yet.'}
          </p>
        </div>
      </section>

      <section className="profile-danger-zone">
        <h2>Danger Zone</h2>

        <p>
          Permanently delete your Swaply account and all
          associated data.
        </p>

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
                onClick={() =>
                  setShowDeleteConfirmation(false)
                }
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
