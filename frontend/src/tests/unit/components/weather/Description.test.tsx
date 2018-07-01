import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import React from "react"

import Description, { Data } from "../../../../components/weather/Description"

describe("--> Snapshot for Components > weather > 'Description'", () => {
    let props: Data

    beforeEach(() => {
        props = {
            weather: []
        }
    })

    it("matches", () => {
        const wrapper = shallow(<Description {...props}/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})
