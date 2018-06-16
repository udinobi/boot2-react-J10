import axios, { AxiosResponse } from "axios"
import { ActionCreator, Dispatch } from "redux"

import {
    Country, CountrySelectedAction, Location,
    SuggestionsActions, SuggestionsActionType, SuggestionsFailureAction,
    SuggestionsLookupAction, SuggestionsRetrievedAction
} from './types'

// CountrySelectedAction ---------------------------------------------------------------------------

export const countrySelectedAction: ActionCreator<CountrySelectedAction> = (country: Country) => ({
    payload: { country },
    type: SuggestionsActionType.COUNTRY_SELECTED
})

export const countrySelected = (country: Country) =>
    (dispatch: Dispatch<CountrySelectedAction>) => dispatch(countrySelectedAction(country))

// SuggestionsFailureAction ------------------------------------------------------------------------

const suggestionsFailure: ActionCreator<SuggestionsFailureAction> = () => ({
    type: SuggestionsActionType.SUGGESTIONS_FAILURE
})

// SuggestionsLookupAction -------------------------------------------------------------------------

const suggestionsLookup: ActionCreator<SuggestionsLookupAction> = () => ({
    type: SuggestionsActionType.SUGGESTIONS_LOOKUP
})

const lookupSuggestions = (country: Country, locationTerm: string) => {
    return async (dispatch: Dispatch<SuggestionsActions>) => {
        dispatch(suggestionsLookup())

        try {
            const url = `http://localhost:8088/geo/suggest/${country.code}/${locationTerm}`
            const response: AxiosResponse<Location[]> = await axios.get(url)
            response.data.forEach(location => location.country = country)
            dispatch(suggestionsRetrieved(response.data))
        } catch (error) {
            dispatch(suggestionsFailure())
        }
    }
}

export interface LookupSuggestionsDispatchProps {
    lookupSuggestions: typeof lookupSuggestions
}

export const mapLookupSuggestionDispatchToProps = {
    lookupSuggestions
}

// SuggestionsRetrievedAction ----------------------------------------------------------------------

const suggestionsRetrieved: ActionCreator<SuggestionsRetrievedAction> = (suggestions: Location[]) => ({
    payload: { suggestions },
    type: SuggestionsActionType.SUGGESTIONS_RETRIEVED
})
