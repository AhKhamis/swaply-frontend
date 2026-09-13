import { useEffect, useState } from 'react';
import { getReviews } from '../../services/reviewService';
import ReviewCard from './ReviewCard';

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
            <ReviewCard
              key={review._id}
              review={review}
            />
          ))}
        </ul>
      )}
    </main>
  );
};

export default ReviewList;