const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/admin`;

const getAuthHeaders = () => {
  return {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
};

const getDashboard = async () => {
  try {
    const res = await fetch(`${BASE_URL}/dashboard`, {
      headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data.statistics;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

const getUsers = async () => {
  try {
    const res = await fetch(`${BASE_URL}/users`, {
      headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data.users;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

const getSkills = async () => {
  try {
    const res = await fetch(`${BASE_URL}/skills`, {
      headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data.skills;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

const getSwaps = async () => {
  try {
    const res = await fetch(`${BASE_URL}/swaps`, {
      headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data.swaps;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

const getReviews = async () => {
  try {
    const res = await fetch(`${BASE_URL}/reviews`, {
      headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data.reviews;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

const deleteUser = async (userId) => {
  try {
    const res = await fetch(
      `${BASE_URL}/users/${userId}`,
      {
        method: 'DELETE',
        headers: getAuthHeaders(),
      }
    );

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

const deleteSkill = async (skillId) => {
  try {
    const res = await fetch(
      `${BASE_URL}/skills/${skillId}`,
      {
        method: 'DELETE',
        headers: getAuthHeaders(),
      }
    );

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

const deleteReview = async (reviewId) => {
  try {
    const res = await fetch(
      `${BASE_URL}/reviews/${reviewId}`,
      {
        method: 'DELETE',
        headers: getAuthHeaders(),
      }
    );

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

export {
  getDashboard,
  getUsers,
  getSkills,
  getSwaps,
  getReviews,
  deleteUser,
  deleteSkill,
  deleteReview,
};