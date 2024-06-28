export type GlobalStateContextType = {
  state: State;
  actions: {
    setUser: () => void;
    // Add other actions here
  };
};

export type State = {
  user: { id: string | null; name: string | null };
  // Add other global state variables here
};

// Define actions
export type Action = {
  type: "SET_USER";
  payload: { id: string; name: string };
};
