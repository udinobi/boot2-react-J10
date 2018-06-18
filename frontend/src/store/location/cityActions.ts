import axios, { AxiosResponse } from "axios"
import { ActionCreator, Dispatch } from "redux"

import {
    CityActions, CityActionType,
    Country, Location, LocationSelectedAction,
    SuggestionsFailureAction, SuggestionsLookupAction,
    SuggestionsResetAction, SuggestionsRetrievedAction
} from './types'

// LocationSelectedAction --------------------------------------------------------------------------

const locationSelectedAction: ActionCreator<LocationSelectedAction> = (location: Location) => ({
    payload: { location },
    type: CityActionType.LOCATION_SELECTED
})

export const locationSelected = (location: Location) =>
    (dispatch: Dispatch<LocationSelectedAction | SuggestionsResetAction>) => {
        dispatch(locationSelectedAction(location))
        dispatch(suggestionsReset())
    }

// SuggestionsFailureAction ------------------------------------------------------------------------

const suggestionsFailure: ActionCreator<SuggestionsFailureAction> = () => ({
    type: CityActionType.SUGGESTIONS_FAILURE
})

// SuggestionsLookupAction -------------------------------------------------------------------------

const suggestionsLookup: ActionCreator<SuggestionsLookupAction> = () => ({
    type: CityActionType.SUGGESTIONS_LOOKUP
})

const lookupSuggestions = (country: Country, locationTerm: string) => {
    return async (dispatch: Dispatch<CityActions>) => {
        dispatch(suggestionsLookup())

        try {
            const url = `${process.env.REACT_APP_SERVICE_URL}${process.env.REACT_APP_LOOKUP_SUGGESTIONS_PATH}/${country.code}/${locationTerm}`
            const response: AxiosResponse<Location[]> = await axios.get(encodeURI(url))
            response.data.forEach(location => location.country = country)
            dispatch(suggestionsRetrieved(response.data))
        } catch (error) {
            dispatch(suggestionsFailure())
        }
    }
}

// SuggestionsResetAction ------------------------------------------------------------------------

const suggestionsReset: ActionCreator<SuggestionsResetAction> = () => ({
    type: CityActionType.SUGGESTIONS_RESET
})

// SuggestionsRetrievedAction ----------------------------------------------------------------------

const suggestionsRetrieved: ActionCreator<SuggestionsRetrievedAction> = (suggestions: Location[]) => ({
    payload: { suggestions },
    type: CityActionType.SUGGESTIONS_RETRIEVED
})

// Action mapping ----------------------------------------------------------------------------------

export interface CityDispatchProps {
    locationSelected: typeof locationSelected
    lookupSuggestions: typeof lookupSuggestions
}

export const mapCityDispatchToProps = {
    locationSelected,
    lookupSuggestions
}
