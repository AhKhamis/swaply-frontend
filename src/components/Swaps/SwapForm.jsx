import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createSwap } from '../../services/swapService';

const SwapForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    receiver: '',
    skillOffered: '',
    skillRequested: '',
    scheduledDate: '',
  });

  const [message, setMessage] = useState('');

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
      await createSwap(formData);
      navigate('/swaps');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <main>
      <h1>Create Swap</h1>

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
          <button type="submit">Create Swap</button>

          <button
            type="button"
            onClick={() => navigate('/swaps')}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default SwapForm;