import React from "react"
import * as Renderer from 'react-test-renderer'

import  { Countries } from "../../../../containers/location/Countries"

import { CountriesProps } from "../../../../store/location/country/actions"

describe("--> Snapshot for Components > location > 'Countries'", () => {
    let props: CountriesProps

    beforeEach(() => {
        props = {
            countries: [],
            countrySelected: jest.fn(),
            loadCountries: jest.fn
        }
    })

    it("matches", () => {
        const component = Renderer.create(
            <Countries {...props} />    
        )

        const tree = component.toJSON()
        expect(tree).toMatchSnapshot();
    });
})


/*
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])
*/

/*
const wait =   [
    { "code": "KH", "name": "Cambodia" },
    { "code": "EC", "name": "Ecuador" },
    { "code": "IT", "name": "Italy" },
    { "code": "LA", "name": "Laos" },
    { "code": "SG", "name": "Singapore" },
    { "code": "TH", "name": "Thailand" }
]
*/
