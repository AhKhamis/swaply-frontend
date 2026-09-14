import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';
import { getDashboard } from '../../services/adminService';

const AdminDashboard = () => {
  const { user } = useContext(UserContext);

  const [statistics, setStatistics] = useState({
    users: 0,
    skills: 0,
    swaps: 0,
    reviews: 0,
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getDashboard();
        setStatistics(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadDashboard();
  }, []);

  return (
    <main className="admin-page">
      <section className="admin-header">
        <h1>Admin Dashboard</h1>

        <p>Welcome, {user?.name}!</p>

        <p>Manage the Swaply platform from here.</p>
      </section>

      {message && (
        <p className="admin-message">
          {message}
        </p>
      )}

      <section className="admin-statistics">
        <div className="admin-stat-card">
          <h2>Users</h2>
          <p>{statistics.users}</p>
        </div>

        <div className="admin-stat-card">
          <h2>Skills</h2>
          <p>{statistics.skills}</p>
        </div>

        <div className="admin-stat-card">
          <h2>Swap Requests</h2>
          <p>{statistics.swaps}</p>
        </div>

        <div className="admin-stat-card">
          <h2>Reviews</h2>
          <p>{statistics.reviews}</p>
        </div>
      </section>

      <section className="admin-management">
        <h2>Management</h2>

        <div className="admin-management-grid">
          <Link to="/admin/users">Users</Link>

          <Link to="/admin/skills">Skills</Link>

          <Link to="/admin/swaps">Swap Requests</Link>

          <Link to="/admin/reviews">Reviews</Link>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
