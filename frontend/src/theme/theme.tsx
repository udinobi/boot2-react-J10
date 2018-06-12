import { injectGlobal } from "styled-components"

export default injectGlobal`

    @import url("https://fonts.googleapis.com/css?family=Raleway");

    body {
        border: 0;
        font-family: Raleway, sans-serif;
        font-size: 1rem;
        margin: 0;
        padding: 0;
    }

    .title {
        font-size: 1rem;

        @media (min-width: 1200px) {
            font-size: 1.4rem;
        }

        margin-right: 12px;
        margin-top: 12px;
        text-align: right;
    }
`
