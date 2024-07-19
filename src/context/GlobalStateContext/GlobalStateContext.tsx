"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Action, GlobalStateContextType, State } from "./types";

// Define the shape of your global state

// Initial state
const initialState: State = {
  user: { id: null, name: null },
  properties: [],
  // Initialize other global state variables here
};

// Create a reducer function to handle state changes based on actions
function globalStateReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: { id: action.payload.id, name: action.payload.name },
      };
    case "SET_PROPERTIES":
      return {
        ...state,
        properties: action.payload,
      };
    // Add other cases here
    default:
      return state;
  }
}

// Create context
const GlobalStateContext = createContext<GlobalStateContextType | undefined>(
  undefined
);

// Create a provider component
export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  const setUser = (id: string, name: string) => {
    dispatch({ type: "SET_USER", payload: { id, name } });
  };

  const setProperties = (properties: any) => {
    dispatch({ type: "SET_PROPERTIES", payload: properties });
  };

  const actions = {
    setUser,
    setProperties,
    // Add other actions here
  };

  return (
    <GlobalStateContext.Provider value={{ state, actions }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use the GlobalStateContext
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
