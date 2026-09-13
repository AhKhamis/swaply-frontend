import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getProfile } from '../../services/userService';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadProfile();
  }, []);

  if (!user) {
    return <main>{message || 'Loading profile...'}</main>;
  }

  return (
    <main>
      <h1>My Profile</h1>

      {user.profileImage && (
        <img
          src={user.profileImage}
          alt={`${user.name}'s profile`}
          width="150"
        />
      )}

      <h2>{user.name}</h2>

      <p>Email: {user.email}</p>

      <p>Bio: {user.bio || 'No bio yet.'}</p>

      <Link to="/profile/edit">
        Edit Profile
      </Link>
    </main>
  );
};

export default Profile;