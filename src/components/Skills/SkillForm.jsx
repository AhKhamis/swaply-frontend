import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import {
  createSkill,
  getSkill,
  updateSkill,
} from '../../services/skillService';

const SkillForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
  });

  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      return;
    }

    const loadSkill = async () => {
      try {
        const skill = await getSkill(id);

        setFormData({
          name: skill.name || '',
          category: skill.category || '',
          description: skill.description || '',
        });

        setCurrentImage(skill.skillImage || '');
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadSkill();
  }, [id, isEditing]);

  const handleChange = (evt) => {
    setMessage('');

    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleImageChange = (evt) => {
    const selectedImage = evt.target.files[0];

    if (selectedImage) {
      setImage(selectedImage);
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      setIsSaving(true);
      setMessage('');

      if (isEditing) {
        await updateSkill(id, formData, image);
      } else {
        if (!image) {
          setMessage('Please select a skill image.');
          setIsSaving(false);
          return;
        }

        await createSkill(formData, image);
      }

      navigate('/skills');
    } catch (err) {
      setMessage(err.message);
      setIsSaving(false);
    }
  };

  return (
    <main className="skill-form-page">
      <section className="skill-form-header">
        <h1>
          {isEditing ? 'Edit Skill' : 'Add New Skill'}
        </h1>
      </section>

      {message && (
        <p className="form-message">
          {message}
        </p>
      )}

      <form
        className="skill-form"
        onSubmit={handleSubmit}
      >
        <div className="skill-form-fields">
          <div className="form-field">
            <label htmlFor="name">
              Skill Name:
            </label>

            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter skill name"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="category">
              Category:
            </label>

            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Programming, Design, Language..."
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="description">
              Description:
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the skill you can teach..."
              rows="7"
              required
            />
          </div>
        </div>

        <div className="skill-image-upload">
          <label htmlFor="skillImage">
            Skill Image
          </label>

          <div className="image-preview-large">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Skill preview"
              />
            ) : currentImage ? (
              <img
                src={currentImage}
                alt="Current skill"
              />
            ) : (
              <span>IMAGE</span>
            )}
          </div>

          <input
            type="file"
            id="skillImage"
            name="skillImage"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
          />
        </div>

        <div className="skill-form-actions">
          <button
            type="submit"
            disabled={isSaving}
          >
            {isSaving
              ? 'Saving...'
              : isEditing
                ? 'Save Changes'
                : 'Add Skill'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/skills')}
            disabled={isSaving}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default SkillForm;