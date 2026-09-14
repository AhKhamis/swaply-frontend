import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getReview } from '../../services/reviewService';

const ReviewDetails = () => {
  const { reviewId } = useParams();

  const [review, setReview] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadReview = async () => {
      try {
        const data = await getReview(reviewId);
        setReview(data);
      } catch (error) {
        setMessage(error.message);
      }
    };

    loadReview();
  }, [reviewId]);

  if (message) {
    return <p>{message}</p>;
  }

  if (!review) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <h1>Review Details</h1>

      <p>Review ID: {review._id}</p>
      <p>Rating: {review.rating}</p>
      <p>Comment: {review.comment}</p>
      <p>Reviewer: {review.reviewer}</p>
      <p>Reviewed User: {review.reviewedUser}</p>
      <p>Swap: {review.swap}</p>
      <p>Created At: {review.createdAt}</p>
    </main>
  );
};

export default ReviewDetails;