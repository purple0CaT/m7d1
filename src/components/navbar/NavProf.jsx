import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cleanUpAct, logOutUser } from "../../redux/action/action";

function NavProf({ closeDropdown }) {
  const dispatch = useDispatch();
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
      <NavLink
        className="d-flex align-items-center navBtn font-weight-bold my-1"
        exact
        to="/"
        activeClassName="selectedNavb"
        onClick={() => {
          dispatch(logOutUser());
          dispatch(cleanUpAct());
        }}
      >
        <span className="text-dropdown">Log out</span>
      </NavLink>
    </div>
  );
}

export default NavProf;
