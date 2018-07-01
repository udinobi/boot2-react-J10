
export const num2Text = (val: number, precision: number) => {
    let result = val.toPrecision(precision)
    if (result.indexOf('.') > 0) {
        result = trimZeroes(result)
        const len = result.length
        if (len > 0 && result.charAt(len - 1) === '.') {
            return result.substr(0, len - 1)
        }
    }

    return result
}

export const trimChar = (s: string, c: string) => {
    let len = s.length
    for (let ix = len; ix > 0;) {
        if (s.charAt(--ix) === c) {
            len--
        } else {
            break
        }
    }

    return s.substr(0, len)
}

export const trimBlanks = (s: string) => trimChar(s, ' ')

export const trimZeroes = (s: string) => trimChar(s, '0')
