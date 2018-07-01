import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import React from "react"

import Sunrise, { Data } from "../../../../components/weather/Sunrise"

describe("--> Snapshot for Components > weather > 'Sunrise'", () => {
    let props: Data

    beforeEach(() => {
        props = {
            sunrise: ""
        }
    })

    it("matches", () => {
        const wrapper = shallow(<Sunrise {...props}/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})
