import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

const Plan = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Perform any form data handling here (e.g., saving to state or API)

    // Redirect to the "View Events" page
    navigate('/events');
  };

  return (
    <div>
      <Nav />
      <div className="flex justify-center items-start h-screen top-0 left-0 fixed w-full pt-20">
        <form
          onSubmit={handleSubmit} // Add onSubmit handler
          className="w-full max-w-xl flex flex-col gap-4 p-6 border border-black rounded-md shadow-md"
        >
          <label htmlFor="eventname">Event Name</label>
          <input type="text" id="eventname" name="eventname" required />

          <label htmlFor="eventdate">Event Date</label>
          <input type="date" id="eventdate" name="eventdate" required />

          <label htmlFor="eventtime">Event Time</label>
          <input type="time" id="eventtime" name="eventtime" required />

          <label htmlFor="eventlocation">Event Location</label>
          <input type="text" id="eventlocation" name="eventlocation" required />

          <label htmlFor="eventdescription">Event Description</label>
          <input type="text" id="eventdescription" name="eventdescription" required />

          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Plan;