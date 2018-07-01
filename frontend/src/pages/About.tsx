import * as React from "react"

import styled from "styled-components"

const About = styled.div`
    color: #fff;
	margin: 60px auto;
    position: relative;
`

export default () => (
    <div className="aurora">
        <About>
            <div style={{ textAlign: "center" }}>
                <h2 style={{ color: "#fff" }}>Weather In The World</h2>
                <h4 style={{ color: "#fff" }}>Yet another weather React app...<br/>but on steroids</h4>

                <p style={{ margin: "1em auto" }}>
                    PoC project with <a href="https://spring.io/projects/spring-boot" target="_blank">Spring Boot 2</a>&nbsp;
                    (<a href="http://openjdk.java.net/projects/jdk/10/" target="_blank">Java 10</a>) as backend and&nbsp;
                    <a href="https://reactjs.org/" target="_blank">React</a>/<a href="https://redux.js.org/" target="_blank">Redux</a>&nbsp;
                    (<a href="https://www.typescriptlang.org/" target="_blank">Typescript 2.9</a>) as frontend.
                </p>

                <h2 style={{ color: "#fff", textAlign: "center" }}>Main Dependencies</h2>
            </div>

            <div>
                <table style={{ margin: "auto" }}>
                    <tbody>
                        <tr>
                            <td style={{ display: "block", paddingRight: 80 }}>
                                {dependencies(backend)}
                            </td>

                            <td>
                                {dependencies(frontend)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </About>
    </div>
)

const dependencies = (deps: Deps) => {
    const rows: JSX.Element[] = []

    Object.keys(deps).forEach(dep => {
        rows.push(
            <tr key={dep}>
                <td style={{ paddingRight: 18 }}>{dep}</td>
                <td>{deps[dep]}</td>
            </tr>
        )
    })

    return <table><tbody>{rows}</tbody></table>
}

interface Deps {
    [id: string]: string
}

const backend = {
    "ElasticSearch": "6.3.0",
    "ElasticSearch Java": "5.6.9",
    "Java (JDK)": "10.0.1",
    "Spring Boot": "2.0.2",
    "Undertow": "1.4.25"
}

const frontend = {
    "Ant Design": "3.6.4",
    "OpenLayers": "4.6.5",
    "React": "16.4.1",
    "React Infinite Scroller": "1.2.0",
    "React Redux": "5.0.7",
    "React Router (dom)": "4.3.1",
    "Redux": "4.0.0",
    "Redux Observable": "1.0.0",
    "Rxjs": "6.2.1",
    "Styled Components": "3.3.3",
    "Typescript": "2.9.2"
}
