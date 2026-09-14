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
                <th>Receiver</th>
                <th>Skill Offered</th>
                <th>Skill Requested</th>
                <th>Status</th>
                <th>Scheduled Date</th>
              </tr>
            </thead>

            <tbody>
              {swaps.map((swap) => (
                <tr key={swap._id}>
                  <td>
                    {swap.requester?.name || 'Unknown'}
                  </td>

                  <td>
                    {swap.receiver?.name || 'Unknown'}
                  </td>

                  <td>
                    {swap.skillOffered?.name || 'Unknown'}
                  </td>

                  <td>
                    {swap.skillRequested?.name || 'Unknown'}
                  </td>

                  <td>
                    {swap.status || 'Unknown'}
                  </td>

                  <td>
                    {swap.scheduledDate
                      ? new Date(
                        swap.scheduledDate
                      ).toLocaleDateString()
                      : 'Not scheduled'}
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
