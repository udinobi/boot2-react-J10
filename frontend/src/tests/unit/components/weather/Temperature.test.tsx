import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import React from "react"

import { none } from "ts-option"

import Temperature, { Data } from "../../../../components/weather/Temperature"

describe("--> Snapshot for Components > weather > 'Temperature'", () => {
    let props: Data

    beforeEach(() => {
        props = {
            weatherData: none
        }
    })

    it("matches", () => {
        const wrapper = shallow(<Temperature {...props}/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})
