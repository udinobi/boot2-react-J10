import * as utils from "../../../lib/utils"

describe("Utility functions > ", () => {
    it("trimChar > trims in a string a specific trailing character", () => {
        expect(utils.trimChar("qwerty---------", '-')).toMatch("qwerty")
    })

    it("trimBlanks > trims in a string all trailing blanks", () => {
        expect(utils.trimBlanks("qwerty         ")).toMatch("qwerty")
    })

    it("trimZeroes > trims in a string all trailing zeroes", () => {
        expect(utils.trimZeroes("qwerty000000000")).toMatch("qwerty")
    })

    it("num2text > converts float to text trimming trailing zeroes", () => {
        expect(utils.num2Text(123.456000000, 10)).toMatch("123.456")
    })

    it("num2text > converts float to text trimming trailing zeroes and comma", () => {
        expect(utils.num2Text(123.000000000, 10)).toMatch("123")
    })
})
