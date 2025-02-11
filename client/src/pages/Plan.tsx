import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

interface Event {
  eventname: string;
  eventdate: string;
  eventtime: string;
  eventlocation: string;
  eventdescription: string;
}

const Plan = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState<Event>({
    eventname: '',
    eventdate: '',
    eventtime: '',
    eventlocation: '',
    eventdescription: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get existing events from localStorage
    const existingEvents = JSON.parse(localStorage.getItem('events') || '[]') as Event[];

    // Add the new event to the array
    const updatedEvents = [...existingEvents, eventData];

    // Save the updated array back to localStorage
    localStorage.setItem('events', JSON.stringify(updatedEvents));

    // Redirect to the "View Events" page
    navigate('/events');
  };

  return (
    <div>
      <Nav />
      <div className="flex justify-center items-start w-full pt-20">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl flex flex-col gap-4 p-6 border border-black rounded-md shadow-md"
        >
          <label htmlFor="eventname">Event Name</label>
          <input
            type="text"
            id="eventname"
            name="eventname"
            value={eventData.eventname}
            onChange={handleChange}
            required
          />

          <label htmlFor="eventdate">Event Date</label>
          <input
            type="date"
            id="eventdate"
            name="eventdate"
            value={eventData.eventdate}
            onChange={handleChange}
            required
          />

          <label htmlFor="eventtime">Event Time</label>
          <input
            type="time"
            id="eventtime"
            name="eventtime"
            value={eventData.eventtime}
            onChange={handleChange}
            required
          />

          <label htmlFor="eventlocation">Event Location</label>
          <input
            type="text"
            id="eventlocation"
            name="eventlocation"
            value={eventData.eventlocation}
            onChange={handleChange}
            required
          />

          <label htmlFor="eventdescription">Event Description</label>
          <input
            type="text"
            id="eventdescription"
            name="eventdescription"
            value={eventData.eventdescription}
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