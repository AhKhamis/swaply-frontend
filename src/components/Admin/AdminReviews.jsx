import { useEffect, useState } from 'react';

import {
  deleteReview,
  getReviews,
} from '../../services/adminService';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await getReviews();
        setReviews(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this review?'
    );

    if (!shouldDelete) {
      return;
    }

    try {
      setDeletingId(reviewId);
      setMessage('');

      await deleteReview(reviewId);

      setReviews((currentReviews) =>
        currentReviews.filter(
          (review) => review._id !== reviewId
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
      <h1>Reviews</h1>

      {message && (
        <p className="admin-message">
          {message}
        </p>
      )}

      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Reviewer</th>
                <th>Reviewed User</th>
                <th>Swap</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((review) => (
                <tr key={review._id}>
                  <td>
                    {review.reviewer?.name || 'Unknown'}
                  </td>

                  <td>
                    {review.reviewedUser?.name || 'Unknown'}
                  </td>

                  <td>
                    {review.swap?._id ||
                      review.swap ||
                      'Unknown'}
                  </td>

                  <td>
                    {review.rating ?? 'N/A'}/5
                  </td>

                  <td>
                    {review.comment || 'No comment'}
                  </td>

                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(review._id)
                      }
                      disabled={
                        deletingId === review._id
                      }
                    >
                      {deletingId === review._id
                        ? 'Deleting...'
                        : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default AdminReviews;
