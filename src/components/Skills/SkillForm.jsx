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

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
  });

  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const isEditing = Boolean(id);

  useEffect(() => {
    if (!isEditing) {
      return;
    }

    const loadSkill = async () => {
      try {
        const skill = await getSkill(id);

        setFormData({
          name: skill.name || '',
          description: skill.description || '',
          category: skill.category || '',
        });
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

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      setIsSaving(true);
      setMessage('');

      if (isEditing) {
        await updateSkill(id, formData);
      } else {
        await createSkill(formData);
      }

      navigate('/skills');
    } catch (err) {
      setMessage(err.message);
      setIsSaving(false);
    }
  };

  return (
    <main>
      <h1>
        {isEditing ? 'Edit Skill' : 'Add Skill'}
      </h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Skill Name:</label>

          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">
            Description:
          </label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="category">Category:</label>

          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Skill'}
        </button>

        <button
          type="button"
          onClick={() => navigate('/skills')}
          disabled={isSaving}
        >
          Cancel
        </button>
      </form>
    </main>
  );
};

export default SkillForm;
