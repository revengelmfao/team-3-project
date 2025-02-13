import { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Nav from '../components/Nav';

interface Event {
  eventname: string;
  eventdate: string;
  eventtime: string;
  eventlocation: string;
  eventdescription: string;
}

// Google Maps container style
const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

// Default center for the map (can be any location)
const defaultCenter = {
  lat: 37.7749, // San Francisco
  lng: -122.4194,
};

const ViewEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [markerPositions, setMarkerPositions] = useState<
    google.maps.LatLngLiteral[]
  >([]);
  const [editEventIndex, setEditEventIndex] = useState<number | null>(null);
  const [editedEvent, setEditedEvent] = useState<Event | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCqmENzAMiamkPGT1h1W82scZ5XnSNglFg', // Replace with your API key
  });

  useEffect(() => {
    // Fetch events from localStorage
    const savedEvents: Event[] = JSON.parse(
      localStorage.getItem('events') || '[]'
    );
    setEvents(savedEvents);

    // Geocode event locations to get marker positions
    const geocodeEvents = async () => {
      const geocoder = new window.google.maps.Geocoder();
      const positions = await Promise.all(
        savedEvents.map((event) => {
          return new Promise<google.maps.LatLngLiteral>((resolve) => {
            geocoder.geocode(
              { address: event.eventlocation },
              (results, status) => {
                if (status === 'OK' && results?.[0]) {
                  const location = results[0].geometry.location;
                  resolve({ lat: location.lat(), lng: location.lng() });
                } else {
                  resolve(defaultCenter); // Fallback to default center if geocoding fails
                }
              }
            );
          });
        })
      );
      setMarkerPositions(positions);
    };

    if (isLoaded) {
      geocodeEvents();
    }
  }, [isLoaded]);

  const handleEdit = (index: number) => {
    setEditEventIndex(index);
    setEditedEvent(events[index]);
  };

  const handleSaveEdit = () => {
    if (editedEvent) {
      const updatedEvents = [...events];
      updatedEvents[editEventIndex!] = editedEvent;
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      setEditEventIndex(null);
      setEditedEvent(null);
    }
  };

  const handleDelete = (index: number) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div>
      <Nav />
      <div className="flex justify-center items-start w-full pt-20">
        <div className="w-full max-w-4xl flex gap-8">
          {/* Events List */}
          <div className="w-1/2 p-6 border border-black rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">View Events</h1>
            {events.length > 0 ? (
              events.map((event, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border border-gray-300 rounded-md"
                >
                  {editEventIndex === index ? (
                    <div>
                      <input
                        type="text"
                        value={editedEvent?.eventname}
                        onChange={(e) =>
                          setEditedEvent({
                            ...editedEvent!,
                            eventname: e.target.value,
                          })
                        }
                      />
                      {/* Add similar input fields for other event properties */}
                      <button onClick={handleSaveEdit}>Save</button>
                    </div>
                  ) : (
                    <div>
                      <p>
                        <strong>Event Name:</strong> {event.eventname}
                      </p>
                      <p>
                        <strong>Event Date:</strong> {event.eventdate}
                      </p>
                      <p>
                        <strong>Event Time:</strong> {event.eventtime}
                      </p>
                      <p>
                        <strong>Event Location:</strong> {event.eventlocation}
                      </p>
                      <p>
                        <strong>Event Description:</strong>{' '}
                        {event.eventdescription}
                      </p>
                      <button onClick={() => handleEdit(index)}>Edit</button>
                      <button onClick={() => handleDelete(index)}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No events found.</p>
            )}
          </div>

          {/* Google Map */}
          <div className="w-1/2">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={10}
              center={markerPositions[0] || defaultCenter}
            >
              {markerPositions.map((position, index) => (
                <Marker key={index} position={position} />
              ))}
            </GoogleMap>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEvents;
