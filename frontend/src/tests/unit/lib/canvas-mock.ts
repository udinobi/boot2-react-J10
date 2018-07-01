/*
 * Not used for the time being... createElement is undefined.
 * Still looking for an explanation.
 */

/**
 * Set up mock 2D context, for usage in unit tests.
 *
 * Adapted from: https://github.com/Cristy94/canvas-mock
 */

/* tslint:disable:no-empty */
function replaceCanvasContext(el: any) {
    el.getContext = () => ({
        arc: () => {},
        beginPath: () => {},
        clearRect: () => {},
        closePath: () => {},
        createImageData: () => [],
        drawImage: () => {},
        fill: () => {},
        fillRect: () => {},
        fillText: () => {},
        getImageData: (x: number, y: number, width: number, height: number) => ({
            data: new Array(width * height * 4)
        }),
        lineTo: () => {},
        moveTo: () => {},
        putImageData: () => {},
        restore: () => {},
        rotate: () => {},
        save: () => {},
        scale: () => {},
        setTransform: () => {},
        stroke: () => {},
        translate: () => {},

        //
        // Following added for vis.js unit tests
        //

        measureText: (text: string) => ({
            height: 14,
            width: 12*text.length,
        })
    })
}

// Use one canvas instance for all calls to createElement("canvas")
let canvasMock: any

/**
 * Overrides document.createElement(), in order to supply a custom canvas element.
 *
 * In the canvas element, getContext() is overridden in order to supply a simple 
 * mock object for the 2D context. For all other elements, the call functions unchanged.
 *
 * The override is only done if there is no 2D context already present.
 * This allows for normal running in a browser, and for node.js the usage of "canvas".
 *
 * @param {object} the current global window object. This can possible come from module "jsdom",
 *                 when running under node.js.
 */
function mockify(window: any) {
    const doc = window.document

    // Check if 2D context already present. That happens either when running
    // in a browser, or this is node.js with "canvas" installed. 
    const context = doc.createElement("canvas").getContext("2d")
    if (context !== null && context !== undefined) {
        // 2D context is present, no need to override
        return
    }

    const fun = window.document.createElement

    window.document.createElement = (param: any) => {
        if (param === "canvas") {
            if (canvasMock === undefined) {
                canvasMock = fun.call(doc, "canvas")
                replaceCanvasContext(canvasMock)
            }

            return canvasMock
        }

        return fun.call(doc, param)
    }
}

export default mockify
