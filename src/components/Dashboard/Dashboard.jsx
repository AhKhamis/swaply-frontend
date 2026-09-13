import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <main>
      <h1>Welcome, {user?.name}!</h1>

      <p>Welcome to your Swaply dashboard.</p>

      <p>Email: {user?.email}</p>

      <p>Role: {user?.role}</p>
    </main>
  );
};

export default Dashboard;