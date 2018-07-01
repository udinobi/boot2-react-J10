import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import React from "react"

import Sunset, { Data } from "../../../../components/weather/Sunset"

describe("--> Snapshot for Components > weather > 'Sunset'", () => {
    let props: Data

    beforeEach(() => {
        props = {
            sunset: ""
        }
    })

    it("matches", () => {
        const wrapper = shallow(<Sunset {...props}/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})
