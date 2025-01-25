import { Asset } from "modules/AssetPage/types";
import { Property } from "modules/Properties/types";
import { Landlord } from "modules/PropertyPage/components/Landlord/types";

export type GlobalStateContextType = {
  state: State;
  actions: {
    setUser: (id: string, name: string) => void;
    setProperties: (properties: Property[]) => void;
    setLandlords: (landlords: Landlord[]) => void;
    setAssets: (assets: Asset[]) => void;
    // Add other actions here
  };
};

export type State = {
  user: { id: string | null; name: string | null };
  properties: any;
  landlords: any;
  assets: any;
  // Add other global state variables here
};

// Define actions
export type Action =
  | { type: "SET_USER"; payload: { id: string; name: string } }
  | { type: "SET_PROPERTIES"; payload: Property[] }
  | { type: "SET_LANDLORDS"; payload: Landlord[] }
  | { type: "SET_ASSETS"; payload: Asset[] };
