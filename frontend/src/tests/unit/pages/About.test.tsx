import React from "react"
import * as Renderer from 'react-test-renderer';

import About from "../../../pages/About"


describe("--> Snapshot for 'About'", () => {
    it("matches", () => {
        const component = Renderer.create(<About />)
        const tree = component.toJSON()
        expect(tree).toMatchSnapshot();
    });
})