import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  userId: number;
}

const Plan = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState<Event>({
    title: '',
    date: '',
    time: '',
    location: '',
    userId: 12345, // Replace with actual userId
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        // Redirect to the "View Events" page
        navigate('/events');
      } else {
        // Handle error
        console.error('Failed to create event');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Nav />
      <div className="flex justify-center items-start w-full pt-20">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl flex flex-col gap-4 p-6 border border-black rounded-md shadow-md"
        >
          <label htmlFor="title">Event Name</label>
          <input
            type="text"
            id="title"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="date">Event Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            required
          />

          <label htmlFor="time">Event Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={eventData.time}
            onChange={handleChange}
            required
          />

          <label htmlFor="location">Event Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            required
          />

          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Plan;
