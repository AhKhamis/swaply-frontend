import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const AdminDashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <main>
      <h1>Admin Dashboard</h1>

      <p>Welcome, {user?.name}!</p>

      <p>Admin control panel for Swaply.</p>

      <hr />

      <h2>Management</h2>

      <ul>
        <li>Users</li>
        <li>Skills</li>
        <li>Swaps</li>
        <li>Reviews</li>
      </ul>
    </main>
  );
};

export default AdminDashboard;