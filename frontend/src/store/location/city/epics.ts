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

// Not checking yet, at this stage in our CSR app, if these properties are set or not.
// In a future SSR rendering feature branch we can also consider to implement logging
// to the server-side RT.
const url =
    `${process.env.REACT_APP_SERVICE_URL}${process.env.REACT_APP_LOOKUP_SUGGESTIONS_PATH}/`

const lookupSuggestions: Epic<CityActions> = action$ =>
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

export default lookupSuggestions