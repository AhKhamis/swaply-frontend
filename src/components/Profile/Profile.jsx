import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useContext } from 'react';
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
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This cannot be undone.'
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProfile();

      localStorage.removeItem('token');
      setUser(null);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  if (!user) {
    return <main>{message || 'Loading profile...'}</main>;
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

      <button
        type="button"
        onClick={handleDeleteAccount}
      >
        Delete Account
      </button>
    </main>
  );
};

export default Profile;