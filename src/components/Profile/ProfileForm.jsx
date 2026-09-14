import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router';

import {
  getProfile,
  updateProfile,
} from '../../services/userService';

const ProfileForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
  });

  const [profileImage, setProfileImage] = useState(null);

  const [message, setMessage] = useState('');

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = await getProfile();

        setFormData({
          name: user.name || '',
          bio: user.bio || '',
        });
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (evt) => {
    setMessage('');

    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleImageChange = (evt) => {
    setProfileImage(evt.target.files[0]);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      setIsSaving(true);

      setMessage('');

      const data = new FormData();

      data.append('name', formData.name);

      data.append('bio', formData.bio);

      if (profileImage) {
        data.append('profileImage', profileImage);
      }

      await updateProfile(data);

      navigate('/profile');
    } catch (err) {
      setMessage(err.message);

      setIsSaving(false);
    }
  };

  return (
    <main className="profile-form-page">
      <section className="profile-form-card">
        <h1>Edit Profile</h1>

        <p className="profile-form-subtitle">
          Update your profile information.
        </p>

        {message && (
          <p className="profile-form-error">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="profile-form-group">
            <label htmlFor="name">
              Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="profile-form-group">
            <label htmlFor="bio">
              Bio
            </label>

            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell the Swaply community about yourself..."
            />
          </div>

          <div className="profile-form-group">
            <label htmlFor="profileImage">
              Profile Image
            </label>

            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
            />
          </div>

          <div className="profile-form-actions">
            <button
              type="submit"
              className="profile-save-button"
              disabled={isSaving}
            >
              {isSaving
                ? 'Saving...'
                : 'Save Changes'}
            </button>

            <button
              type="button"
              className="profile-cancel-button"
              onClick={() => navigate('/profile')}
              disabled={isSaving}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ProfileForm;

