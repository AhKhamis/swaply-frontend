const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/skills`;

const getAuthHeaders = () => {
  return {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
};

const getSkills = async () => {
  try {
    const res = await fetch(BASE_URL, {
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

const getSkill = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data.skill;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

const createSkill = async (skillData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(skillData),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data.skill;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

const updateSkill = async (id, skillData) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(skillData),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data.skill;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

const deleteSkill = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

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
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
};
