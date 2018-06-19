import { ActionCreator, Dispatch } from "redux"

import { Location } from "../location/types"

import {
    HistoryActionType, LocationReloadAction, LocationRemoveAction
} from './types'

// LocationReloadAction ----------------------------------------------------------------------------

const locationReloadAction: ActionCreator<LocationReloadAction> = (location: Location) => ({
    payload: { location },
    type: HistoryActionType.LOCATION_RELOAD
})

export const reloadLocation = (location: Location) =>
    (dispatch: Dispatch<LocationReloadAction>) => dispatch(locationReloadAction(location))

// LocationRemoveAction ----------------------------------------------------------------------------

const locationRemoveAction: ActionCreator<LocationRemoveAction> = (location: Location) => ({
    payload: { location },
    type: HistoryActionType.LOCATION_REMOVE
})

const removeLocation = (location: Location) =>
    (dispatch: Dispatch<LocationRemoveAction>) => dispatch(locationRemoveAction(location))

// Action mapping ----------------------------------------------------------------------------------

export interface HistoryDispatchProps {
    reloadLocation: typeof reloadLocation
    removeLocation: typeof removeLocation
}

export const mapHistoryDispatchToProps = {
    reloadLocation,
    removeLocation
}
