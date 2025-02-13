import AuthService from '../utils/auth';

const retrieveEvents = async () => {
  try {
    const response = await fetch('/api/events', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AuthService.getToken()}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid user API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval:', err);
    return [];
  }
};

export { retrieveEvents };
