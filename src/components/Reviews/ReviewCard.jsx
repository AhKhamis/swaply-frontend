const ReviewCard = ({ review }) => {
  return (
    <li>
      <p>Rating: {review.rating}/5</p>
      <p>Comment: {review.comment}</p>
    </li>
  );
};

export default ReviewCard;