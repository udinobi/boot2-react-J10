import React from "react"
import * as Renderer from 'react-test-renderer'

import  { WeatherComponent } from "../../../../containers/weather/Weather"

import { WeatherProps } from "../../../../store/weather/actions";

describe("--> Snapshot for Containers > weather > 'WeatherComponent'", () => {
    let props: WeatherProps

    beforeEach(() => {
        props = {
            weatherDataRetrieve:  jest.fn()
        }
    })
    it("matches", () => {
        const component = Renderer.create(
            <WeatherComponent {...props} />    
        )

        const tree = component.toJSON()
        expect(tree).toMatchSnapshot();
    });
})
