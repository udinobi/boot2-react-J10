import { ActionCreator, Dispatch } from "redux"

import {
    CityActionType,
    Location, LocationSelectedAction,
    SuggestionsFailureAction, SuggestionsLookupAction,
    SuggestionsResetAction, SuggestionsRetrievedAction
} from "./types"

import { Country } from "../country/types"

// LocationSelectedAction --------------------------------------------------------------------------

const locationSelectedAction: ActionCreator<LocationSelectedAction> = (location: Location) => ({
    payload: { location },
    type: CityActionType.LOCATION_SELECTED
})

export const locationSelected = (location: Location) =>
    (dispatch: Dispatch<LocationSelectedAction | SuggestionsResetAction>) => {
        dispatch(suggestionsReset())
        dispatch(locationSelectedAction(location))
    }

// SuggestionsFailureAction ------------------------------------------------------------------------

export const suggestionsFailure: ActionCreator<SuggestionsFailureAction> = () => ({
    type: CityActionType.SUGGESTIONS_FAILURE
})

// SuggestionsLookupAction -------------------------------------------------------------------------

export const suggestionsLookup: ActionCreator<SuggestionsLookupAction> = (country: Country, locationTerm: string) => ({
    payload: { country, locationTerm },
    type: CityActionType.SUGGESTIONS_LOOKUP
})

// SuggestionsResetAction ------------------------------------------------------------------------

const suggestionsReset: ActionCreator<SuggestionsResetAction> = () => ({
    type: CityActionType.SUGGESTIONS_RESET
})

// SuggestionsRetrievedAction ----------------------------------------------------------------------

export const suggestionsRetrieved: ActionCreator<SuggestionsRetrievedAction> = (country: Country, suggestions: Location[]) => ({
    payload: { country, suggestions },
    type: CityActionType.SUGGESTIONS_RETRIEVED
})

// Action mapping ----------------------------------------------------------------------------------

export interface CityDispatchProps {
    locationSelected: typeof locationSelected
    suggestionsLookup: typeof suggestionsLookup
    suggestionsReset: typeof suggestionsReset
}

export const mapCityDispatchToProps = {
    locationSelected,
    suggestionsLookup,
    suggestionsReset
}
