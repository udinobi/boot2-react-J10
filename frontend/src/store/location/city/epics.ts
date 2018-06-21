
import { Epic, ofType } from "redux-observable"
import { of } from "rxjs"
import { ajax } from "rxjs/ajax"
import { catchError, debounceTime, map, switchMap, takeUntil } from "rxjs/operators"

import { suggestionsFailure, suggestionsRetrieved } from "./actions"

import {
    CityActions, CityActionType, Location,
    SuggestionsLookupAction, SuggestionsRetrievedAction
} from "./types"

import { CountryActionType } from "../country/types"


const url = `${process.env.REACT_APP_SERVICE_URL}${process.env.REACT_APP_LOOKUP_SUGGESTIONS_PATH}/`

export const lookupSuggestions: Epic<CityActions> = action$ =>
    action$.pipe(
        ofType(CityActionType.SUGGESTIONS_LOOKUP),
        debounceTime(400),
        switchMap<SuggestionsLookupAction, SuggestionsRetrievedAction>(action =>
            ajax.getJSON<Location[]>(
                encodeURI(`${url}${action.payload.country.code}/${action.payload.locationTerm}`),
                { crossDomain: true }
            ).pipe(
                map(suggestions => suggestionsRetrieved(action.payload.country, suggestions)),
                takeUntil(action$.pipe(
                    ofType(CityActionType.SUGGESTIONS_RESET),
                    ofType(CountryActionType.COUNTRY_SELECTED)
                )),
                catchError(error => of(suggestionsFailure()))
            )
        )
    )
