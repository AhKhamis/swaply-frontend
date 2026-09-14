import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getSwap, updateSwap } from '../../services/swapService';

const SwapEdit = () => {
  const { swapId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    receiver: '',
    skillOffered: '',
    skillRequested: '',
    scheduledDate: '',
    status: '',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadSwap = async () => {
      try {
        const swap = await getSwap(swapId);

        setFormData({
          receiver: swap.receiver,
          skillOffered: swap.skillOffered,
          skillRequested: swap.skillRequested,
          scheduledDate: swap.scheduledDate
            ? new Date(swap.scheduledDate).toISOString().slice(0, 16)
            : '',
          status: swap.status,
        });
      } catch (error) {
        setMessage(error.message);
      }
    };

    loadSwap();
  }, [swapId]);

  const handleChange = (evt) => {
    setMessage('');

    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      await updateSwap(swapId, formData);
      navigate(`/swaps/${swapId}`);
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (message && !formData.receiver) {
    return <p>{message}</p>;
  }

  return (
    <main>
      <h1>Edit Swap</h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="receiver">Receiver:</label>
          <input
            type="text"
            id="receiver"
            name="receiver"
            value={formData.receiver}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="skillOffered">Skill Offered:</label>
          <input
            type="text"
            id="skillOffered"
            name="skillOffered"
            value={formData.skillOffered}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="skillRequested">Skill Requested:</label>
          <input
            type="text"
            id="skillRequested"
            name="skillRequested"
            value={formData.skillRequested}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="scheduledDate">Scheduled Date:</label>
          <input
            type="datetime-local"
            id="scheduledDate"
            name="scheduledDate"
            value={formData.scheduledDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <button type="submit">Update Swap</button>

          <button
            type="button"
            onClick={() => navigate(`/swaps/${swapId}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default SwapEdit;