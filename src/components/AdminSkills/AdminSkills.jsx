import { useEffect, useState } from 'react';

import {
  deleteSkill,
  getSkills,
} from '../../services/adminService';

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [message, setMessage] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await getSkills();

        setSkills(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadSkills();
  }, []);

  const handleDelete = async (skillId) => {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this skill?'
    );

    if (!shouldDelete) {
      return;
    }

    try {
      setDeletingId(skillId);
      setMessage('');

      await deleteSkill(skillId);

      setSkills(
        skills.filter(
          (skill) => skill._id !== skillId
        )
      );
    } catch (err) {
      setMessage(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="admin-page">
      <h1>Skills</h1>

      {message && (
        <p className="admin-message">
          {message}
        </p>
      )}

      {skills.length === 0 ? (
        <p>No skills found.</p>
      ) : (
        <div className="admin-skill-grid">
          {skills.map((skill) => (
            <article
              className="admin-skill-card"
              key={skill._id}
            >
              <div className="admin-skill-image">
                {skill.skillImage ? (
                  <img
                    src={skill.skillImage}
                    alt={skill.name}
                  />
                ) : (
                  <span>No Image</span>
                )}
              </div>

              <div className="admin-skill-content">
                <h2>{skill.name}</h2>

                <p>
                  Category: {skill.category}
                </p>

                <p>
                  Owner:{' '}
                  {skill.owner?.name || 'Unknown'}
                </p>

                <p>
                  {skill.description}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(skill._id)
                  }
                  disabled={
                    deletingId === skill._id
                  }
                >
                  {deletingId === skill._id
                    ? 'Deleting...'
                    : 'Delete Skill'}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default AdminSkills;