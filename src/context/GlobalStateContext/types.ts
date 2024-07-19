import { Property } from "modules/Properties/types";

export type GlobalStateContextType = {
  state: State;
  actions: {
    setUser: (id: string, name: string) => void;
    setProperties: (properties: Property[]) => void;
    // Add other actions here
  };
};

export type State = {
  user: { id: string | null; name: string | null };
  properties: any;
  // Add other global state variables here
};

// Define actions
export type Action =
  | { type: "SET_USER"; payload: { id: string; name: string } }
  | { type: "SET_PROPERTIES"; payload: Property[] };