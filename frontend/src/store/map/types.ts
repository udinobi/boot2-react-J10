import { Option } from "tsoption"

import { LocationReloadAction } from "../history/types"

import { Location, LocationSelectedAction } from "../location/city/types"

export interface MapState {
    location: Option<Location>
}

export type MapActions = LocationReloadAction | LocationSelectedAction
