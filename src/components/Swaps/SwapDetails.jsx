import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getSwap, deleteSwap } from '../../services/swapService';

const SwapDetails = () => {
  const { swapId } = useParams();
  const navigate = useNavigate();

  const [swap, setSwap] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadSwap = async () => {
      try {
        const data = await getSwap(swapId);
        setSwap(data);
      } catch (error) {
        setMessage(error.message);
      }
    };

    loadSwap();
  }, [swapId]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this swap?'
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteSwap(swapId);
      navigate('/swaps');
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (message && !swap) {
    return <p>{message}</p>;
  }

  if (!swap) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <h1>Swap Details</h1>

      {message && <p>{message}</p>}

      <p>Swap ID: {swap._id}</p>
      <p>Status: {swap.status}</p>
      <p>Requester: {swap.requester}</p>
      <p>Receiver: {swap.receiver}</p>
      <p>Skill Offered: {swap.skillOffered}</p>
      <p>Skill Requested: {swap.skillRequested}</p>

      <p>
        Scheduled Date: {swap.scheduledDate || 'Not scheduled'}
      </p>

      <button
        type="button"
        onClick={() => navigate(`/swaps/${swap._id}/edit`)}
      >
        Edit
      </button>

      <button
        type="button"
        onClick={handleDelete}
      >
        Delete
      </button>
    </main>
  );
};

export default SwapDetails;