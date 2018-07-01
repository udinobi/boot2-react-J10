import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import React from "react"

import  { MapContainer } from "../../../../containers/map/Map"

/*
 * Skipped for the time being... createElement is undefined in jsdom.
 * Still looking for an explanation.
 */

describe("--> Snapshot for Containers > map > 'Map'", () => {

    xit("matches", () => {
        const jsdom = require("jsdom");
        const { JSDOM } = jsdom;
        const { document } = (new JSDOM("<!DOCTYPE html><div>Hello</div>")).window;
        console.log(`Document(${JSON.stringify(document)})`)
        const Canvas = document.createElement('canvas');

        require("../../lib/canvas-mock")(Canvas)

        const wrapper = shallow(<MapContainer />)
        expect(toJson(wrapper)).toMatchSnapshot();
    });
})
