import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import SkillCard from './SkillCard';
import { getSkills } from '../../services/skillService';

const categories = [
  'All',
  'Programming',
  'Design',
  'Language',
  'Outdoor',
  'Business',
  'Lifestyle',
];

const SkillsList = () => {
  const [skills, setSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

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

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      skill.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      skill.name.toLowerCase().includes(search.toLowerCase()) ||
      skill.description.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="skills-page">
      <section className="skills-header">
        <div>
          <h1>Explore Skills</h1>
          <p>Discover skills you can learn from the Swaply community.</p>
        </div>

        <Link to="/skills/new" className="add-skill-button">
          Add Skill
        </Link>
      </section>

      <section className="skills-controls">
        <div className="search-box">
          <input
            type="search"
            placeholder="Search skills..."
            value={search}
            onChange={(evt) => setSearch(evt.target.value)}
          />
        </div>

        <div className="category-tabs">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={
                selectedCategory === category
                  ? 'category-tab active'
                  : 'category-tab'
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {message && <p>{message}</p>}

      {filteredSkills.length === 0 ? (
        <p className="no-skills">
          No skills found.
        </p>
      ) : (
        <section className="skills-grid">
          {filteredSkills.map((skill) => (
            <SkillCard
              key={skill._id}
              skill={skill}
            />
          ))}
        </section>
      )}

      <section className="pagination">
        <button type="button">
          ←
        </button>

        <button type="button" className="active">
          1
        </button>

        <button type="button">
          2
        </button>

        <button type="button">
          3
        </button>

        <span>...</span>

        <button type="button">
          →
        </button>
      </section>
    </main>
  );
};

export default SkillsList;