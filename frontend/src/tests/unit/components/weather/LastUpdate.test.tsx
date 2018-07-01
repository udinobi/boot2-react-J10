import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import React from "react"

import { none } from "ts-option"

import LastUpdate, { Data } from "../../../../components/weather/LastUpdate"

describe("--> Snapshot for Components > weather > 'LastUpdate'", () => {
    let props: Data

    beforeEach(() => {
        props = {
            lastUpdate: none
        }
    })

    it("matches", () => {
        const wrapper = shallow(<LastUpdate {...props}/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})
