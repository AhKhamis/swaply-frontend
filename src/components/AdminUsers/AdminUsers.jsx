import { useEffect, useState } from 'react';

import {
  deleteUser,
  getUsers,
} from '../../services/adminService';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsers();

        setUsers(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadUsers();
  }, []);

  const handleDelete = async (userId) => {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this user?'
    );

    if (!shouldDelete) {
      return;
    }

    try {
      setDeletingId(userId);
      setMessage('');

      await deleteUser(userId);

      setUsers(
        users.filter((user) => user._id !== userId)
      );
    } catch (err) {
      setMessage(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="admin-page">
      <h1>Users</h1>

      {message && (
        <p className="admin-message">
          {message}
        </p>
      )}

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Bio</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>{user.role}</td>

                  <td>
                    {user.bio || 'No bio'}
                  </td>

                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(user._id)
                      }
                      disabled={deletingId === user._id}
                    >
                      {deletingId === user._id
                        ? 'Deleting...'
                        : 'Delete'}
                    </button>
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

export default AdminUsers;