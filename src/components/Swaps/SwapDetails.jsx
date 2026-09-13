import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getSwap } from '../../services/swapService';

const SwapDetails = () => {
  const { swapId } = useParams();
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

  if (message) {
    return <p>{message}</p>;
  }

  if (!swap) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <h1>Swap Details</h1>

      <p>Swap ID: {swap._id}</p>
      <p>Status: {swap.status}</p>
      <p>Requester: {swap.requester}</p>
      <p>Receiver: {swap.receiver}</p>
      <p>Skill Offered: {swap.skillOffered}</p>
      <p>Skill Requested: {swap.skillRequested}</p>
      <p>
        Scheduled Date: {swap.scheduledDate || 'Not scheduled'}
      </p>
    </main>
  );
};

export default SwapDetails;