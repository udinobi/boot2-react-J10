export interface Response {
    config?: any,
    data?: any,
    headers?: any,
    status: number
}

let delay = 1
let error: string
let response: Response = {
  config: {},
  data: {},
  headers: {},
  status: 200
};

const axiosMock = jest.fn((url) =>
    new Promise((resolve, reject) =>
        setTimeout(() => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        }, delay)
    ))

export default {
    completeRequest: () => { jest.runOnlyPendingTimers() },
    delete: axiosMock,
    get: axiosMock,
    pos: axiosMock,
    put: axiosMock,
    setDelay: (_: number) => { delay = _ },
    setError: (_: string) => { error = _ },
    setResponse: (_: Response) => { response = _ }
}
