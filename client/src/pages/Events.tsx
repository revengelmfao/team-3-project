import { useEffect, useState } from 'react';
import Nav from '../components/Nav';

interface Event {
  eventname: string;
  eventdate: string;
  eventtime: string;
  eventlocation: string;
  eventdescription: string;
}

const ViewEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Fetch events from localStorage
    const savedEvents: Event[] = JSON.parse(localStorage.getItem('events') || '[]');
    setEvents(savedEvents);
  }, []);

  return (
    <div>
      <Nav />
      <div className="flex justify-center items-start w-full pt-20">
        <div className="w-full max-w-xl p-6 border border-black rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-4">View Events</h1>
          {events.length > 0 ? (
            events.map((event, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md">
                <p><strong>Event Name:</strong> {event.eventname}</p>
                <p><strong>Event Date:</strong> {event.eventdate}</p>
                <p><strong>Event Time:</strong> {event.eventtime}</p>
                <p><strong>Event Location:</strong> {event.eventlocation}</p>
                <p><strong>Event Description:</strong> {event.eventdescription}</p>
              </div>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewEvents;