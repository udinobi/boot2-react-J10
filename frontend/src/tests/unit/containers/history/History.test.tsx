import React from "react"
import * as Renderer from 'react-test-renderer'

import  { History } from "../../../../containers/history/History"

import { HistoryProps } from "../../../../store/history/actions"

describe("--> Snapshot for Containers > history > 'History'", () => {
    let props: HistoryProps

    beforeEach(() => {
        props = {
            reloadLocation: jest.fn(),
            removeLocation: jest.fn()
        }
    })

    it("matches", () => {
        const component = Renderer.create(
            <History {...props} />    
        )

        const tree = component.toJSON()
        expect(tree).toMatchSnapshot();
    });
})
