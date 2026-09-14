import { Link } from 'react-router';

const SwapCard = ({ swap }) => {
  return (
    <li>
      <p>Status: {swap.status}</p>
      <p>Requester: {swap.requester}</p>
      <p>Receiver: {swap.receiver}</p>
      <p>Skill Offered: {swap.skillOffered}</p>
      <p>Skill Requested: {swap.skillRequested}</p>

      <Link to={`/swaps/${swap._id}`}>
        View Details
      </Link>
    </li>
  );
};

export default SwapCard;