import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      <h1>Site Name</h1>
      <NavLink to="/home">View Events</NavLink>
      <NavLink to="/plan">Plan an Event</NavLink>
      <NavLink to="/">Log Out</NavLink>
    </div>
  );
};

export default Nav;
