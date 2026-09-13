const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/swaps`;

const getSwaps = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  const res = await fetch(BASE_URL, config);
  const data = await res.json();

  if (data.err) {
    throw new Error(data.err);
  }

  return data.swaps;
};

const getSwap = async (swapId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  const res = await fetch(`${BASE_URL}/${swapId}`, config);
  const data = await res.json();

  if (data.err) {
    throw new Error(data.err);
  }

  return data.swap;
};

const createSwap = async (formData) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(formData),
  };

  const res = await fetch(BASE_URL, config);
  const data = await res.json();

  if (data.err) {
    throw new Error(data.err);
  }

  return data.swap;
};

export {
  getSwaps,
  getSwap,
  createSwap,
};