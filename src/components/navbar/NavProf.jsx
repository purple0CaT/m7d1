import React from "react";
import { NavLink } from "react-router-dom";

function NavProf({ closeDropdown }) {
  return (
    <div className="shortMenu d-flex flex-column">
      <NavLink
        className="d-flex align-items-center navBtn font-weight-bold my-1"
        exact
        to="/profile"
        activeClassName="selectedNavb"
        onClick={() => closeDropdown()}
      >
        <span className="text-dropdown">Profile</span>
      </NavLink>
      <NavLink
        className="d-flex align-items-center navBtn font-weight-bold my-1"
        exact
        to="/favorites"
        activeClassName="selectedNavb"
        onClick={() => closeDropdown()}
      >
        <span className="text-dropdown">Favorites</span>
      </NavLink>
    </div>
  );
}

export default NavProf;
