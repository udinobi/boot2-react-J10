import { Option } from "ts-option"

import { LocationReloadAction } from "../history/types"

import { Location, LocationSelectedAction } from "../location/city/types"

export interface MapAndWeatherState {
    location: Option<Location>
}

export type MapAndWeatherActions = LocationReloadAction | LocationSelectedAction
