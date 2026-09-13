import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createReview } from '../../services/reviewService';

const ReviewForm = ({ reviewedUser, swap }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    reviewedUser: reviewedUser || '',
    swap: swap || '',
    rating: '',
    comment: '',
  });

  const [message, setMessage] = useState('');

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
      await createReview(formData);
      navigate('/reviews');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <main>
      <h1>Leave a Review</h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating">Rating:</label>

          <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="comment">Comment:</label>

          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button type="submit">
            Submit Review
          </button>

          <button
            type="button"
            onClick={() => navigate('/reviews')}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default ReviewForm;