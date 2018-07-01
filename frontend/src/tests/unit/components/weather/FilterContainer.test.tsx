import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import React from "react"

import { none } from "ts-option"

import FilterContainer from "../../../../components/weather/FilterContainer"

import { WeatherState } from "../../../../store/weather/types"

describe("--> Snapshot for Components > weather > 'FilterContainer'", () => {
    let props: WeatherState

    beforeEach(() => {
        props = {
            askingWeatherDataToOWM: false,
            lastUpdate: none,
            location: none,
            weatherData: none
        }
    })

    it("matches", () => {
        const wrapper = shallow(<FilterContainer {...props}/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})
