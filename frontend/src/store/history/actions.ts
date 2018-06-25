import { ActionCreator, Dispatch } from "redux"

import { Location } from "../location/city/types"

import {
    HistoryActionType, HistoryItem, LocationReloadAction, LocationRemoveAction
} from './types'

// LocationReloadAction ----------------------------------------------------------------------------

const locationReloadAction: ActionCreator<LocationReloadAction> = (history: HistoryItem) => ({
    payload: { history },
    type: HistoryActionType.LOCATION_RELOAD
})

export const reloadLocation = (history: HistoryItem) =>
    (dispatch: Dispatch<LocationReloadAction>) => dispatch(locationReloadAction(history))

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
