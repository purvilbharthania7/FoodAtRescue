
import React, { useContext, useEffect } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";

//! User Files

import * as ActionTypes from "../common/actionTypes";
import jwtDecode from "jwt-decode";
import Error from "../common/error";
import { AppContext } from "../context/userContext";
import { ROUTES, TOKEN } from "../common/constants";
import Login from "../pages/UserManagement/Login/Login";
import Signup from "../pages/UserManagement/Signup/Signup";
import SignupFoodOwner from "../pages/UserManagement/Signup/SignupFoodOwner";
import Logout from "../Components/Logout";
import ViewFoodList from "../pages/FoodManagement/ViewFoodList";
import HomePage from "../pages/HomePage/index";
import ViewReservedFood from "../pages/FoodManagement/ViewReservedFood";
import ViewMyPosting from "../pages/FoodManagement/ViewMyPosting";
import ViewReservation from "../pages/FoodManagement/ViewReservation";
import AddFood from "../pages/PostFood/AddFood";

function Routing() {
  const { initializeAuth, dispatch } = useContext(AppContext);
  const location = useLocation();
  const openPages = [
    {
      pageLink: ROUTES.HOMEPAGE,
      view: HomePage,
    },
    {
      pageLink: ROUTES.LOGIN,
      view: Login,
    },
    {
      pageLink: ROUTES.SIGNUP,
      view: Signup,
    },
    {
      pageLink: ROUTES.SIGNUP_FOOD_OWNER,
      view: SignupFoodOwner,
    },
    {
      pageLink: ROUTES.LOGOUT,
      view: Logout,
    },
    {
      pageLink: ROUTES.FOOD_LISTING,
      view: ViewFoodList,
    },
    {
      pageLink: ROUTES.RESERVED_FOOD,
      view: ViewReservedFood,
    },
    {
      pageLink: ROUTES.VIEW_MY_POSTING,
      view: ViewMyPosting,
    },
    {
      pageLink: ROUTES.VIEW_RESERVATION,
      view: ViewReservation,
    },
    {
      pageLink: ROUTES.ERROR,
      view: Error,
    },
    {
      pageLink: ROUTES.POST_FOOD,
      view: AddFood,
    }
  ];

  useEffect(() => {
    initializeAuth();
    if (localStorage.getItem(TOKEN)) {
      const token = localStorage.getItem(TOKEN);
      const decoded = jwtDecode(token);
      const expiresAt = decoded.exp;
      const currentTime = Date.now();

      if (expiresAt < currentTime / 1000) {
        dispatch({ type: ActionTypes.LOGOUT });
      }
    }
  }, []);

  const routes = (
    <Routes location={location}>
      {openPages.map((page, index) => {
        return (
          <Route
            exact
            path={page.pageLink}
            element={<page.view />}
            key={index}
          />
        );
      })}
      <Route path={ROUTES.NOT_FOUND} element={<Navigate to={ROUTES.ERROR} />} />
    </Routes>
  );

  return <div className="container">{routes}</div>;
}

export default Routing;
