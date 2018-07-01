import React from "react"
import * as Renderer from 'react-test-renderer'

import  { Countries } from "../../../../containers/location/Countries"

import { CountriesProps } from "../../../../store/location/country/actions"

describe("--> Snapshot for Containers > location > 'Countries'", () => {
    let props: CountriesProps

    beforeEach(() => {
        props = {
            countries: [],
            countrySelected: jest.fn(),
            loadCountries:  jest.fn()
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
