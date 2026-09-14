import { useEffect, useState } from 'react';

import { getSwaps } from '../../services/adminService';

const AdminSwaps = () => {
  const [swaps, setSwaps] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadSwaps = async () => {
      try {
        const data = await getSwaps();

        setSwaps(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadSwaps();
  }, []);

  return (
    <main className="admin-page">
      <h1>Swap Requests</h1>

      {message && (
        <p className="admin-message">
          {message}
        </p>
      )}

      {swaps.length === 0 ? (
        <p>No swap requests found.</p>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Requester</th>
                <th>Recipient</th>
                <th>Skill</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {swaps.map((swap) => (
                <tr key={swap._id}>
                  <td>
                    {swap.requester?.name ||
                      'Unknown'}
                  </td>

                  <td>
                    {swap.recipient?.name ||
                      'Unknown'}
                  </td>

                  <td>
                    {swap.skill?.name ||
                      'Unknown'}
                  </td>

                  <td>
                    {swap.status || 'Unknown'}
                  </td>

                  <td>
                    {swap.createdAt
                      ? new Date(
                        swap.createdAt
                      ).toLocaleDateString()
                      : 'Unknown'}
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

export default AdminSwaps;