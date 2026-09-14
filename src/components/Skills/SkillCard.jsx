import { Link } from 'react-router';

const SkillCard = ({ skill }) => {
  return (
    <article className="skill-card">
      <div className="skill-card-image">
        {skill.skillImage ? (
          <img
            src={skill.skillImage}
            alt={skill.name}
          />
        ) : (
          <span>Skill Image</span>
        )}
      </div>

      <div className="skill-card-content">
        <div className="skill-card-title">
          <h2>{skill.name}</h2>
        </div>

        <p className="skill-category">
          {skill.category}
        </p>

        <p className="skill-owner">
          By {skill.owner?.name || 'Unknown'}
        </p>

        <p className="skill-review">
          Review: 8/10
        </p>

        <Link
          to={`/skills/${skill._id}`}
          className="view-skill-button"
        >
          View Skill
        </Link>
      </div>
    </article>
  );
};

export default SkillCard;