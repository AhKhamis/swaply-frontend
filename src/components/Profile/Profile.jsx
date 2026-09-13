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
      <main>
        {message || 'Loading profile...'}
      </main>
    );
  }

  return (
    <main>
      <h1>My Profile</h1>

      {message && <p>{message}</p>}

      {user.profileImage && (
        <img
          src={user.profileImage}
          alt={`${user.name}'s profile`}
          width="150"
        />
      )}

      <h2>{user.name}</h2>

      <p>Email: {user.email}</p>

      <p>
        Bio: {user.bio || 'No bio yet.'}
      </p>

      <Link to="/profile/edit">
        Edit Profile
      </Link>

      <hr />

      <section>
        <h2>Danger Zone</h2>

        <p>
          Permanently delete your Swaply account and all
          associated data.
        </p>

        {!showDeleteConfirmation ? (
          <button
            type="button"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            Delete Account
          </button>
        ) : (
          <div>
            <h3>Are you sure you want to delete your account?</h3>

            <p>
              This action cannot be undone.
            </p>

            <button
              type="button"
              onClick={handleDeleteAccount}
              disabled={isDeleting}
            >
              {isDeleting
                ? 'Deleting...'
                : 'Delete My Account'}
            </button>

            <button
              type="button"
              onClick={() => setShowDeleteConfirmation(false)}
              disabled={isDeleting}
            >
              Cancel
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Profile;
