const SwapCard = ({ swap }) => {
  return (
    <li>
      <p>Swap ID: {swap._id}</p>
      <p>Status: {swap.status}</p>
      <p>Requester: {swap.requester}</p>
      <p>Receiver: {swap.receiver}</p>
      <p>Skill Offered: {swap.skillOffered}</p>
      <p>Skill Requested: {swap.skillRequested}</p>
    </li>
  );
};

export default SwapCard;