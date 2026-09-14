import { useEffect, useState } from 'react';
import { getReviews } from '../../services/reviewService';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await getReviews();
        setReviews(data);
      } catch (error) {
        setMessage(error.message);
      }
    };

    loadReviews();
  }, []);

  return (
    <main>
      <h1>Reviews</h1>

      {message && <p>{message}</p>}

      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review._id}>
              <p>Rating: {review.rating}</p>
              <p>Comment: {review.comment}</p>
              <p>Reviewer: {review.reviewer}</p>
              <p>Reviewed User: {review.reviewedUser}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default ReviewList;