import React from "react"
import * as Renderer from 'react-test-renderer'

import { ReloadCountries } from "../../../../components/location/ReloadCountries"

import { CountriesProps } from "../../../../store/location/country/actions"

describe("--> Snapshot for Components > location > 'ReloadCountries'", () => {
    let props: CountriesProps

    beforeEach(() => {
        props = {
            countries: [],
            countrySelected: jest.fn(),
            loadCountries: jest.fn
        }
    })

    it("matches", () => {
        const component = Renderer.create(<ReloadCountries {...props} />)
        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})
