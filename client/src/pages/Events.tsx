import Navbar from '../components/Nav';
import { Outlet } from 'react-router-dom';

const Events = () => {
  return (
    <div className='container'>
      <div id="root"></div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    <h1>View Events</h1>
    </div>
  );
}


export default Events;
