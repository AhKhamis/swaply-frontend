import { useEffect, useState } from 'react';
import { getSwaps } from '../../services/swapService';

const SwapList = () => {
  const [swaps, setSwaps] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadSwaps = async () => {
      try {
        const data = await getSwaps();
        setSwaps(data);
      } catch (error) {
        setMessage(error.message);
      }
    };

    loadSwaps();
  }, []);

  return (
    <main>
      <h1>My Swaps</h1>

      {message && <p>{message}</p>}

      {swaps.length === 0 ? (
        <p>No swaps found.</p>
      ) : (
        <ul>
          {swaps.map((swap) => (
            <li key={swap._id}>
              <p>Status: {swap.status}</p>
              <p>Swap ID: {swap._id}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default SwapList;