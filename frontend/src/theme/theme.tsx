import { injectGlobal } from "styled-components"

export default injectGlobal`

    @import url("https://fonts.googleapis.com/css?family=Raleway");

    body {
        border: 0;
        font-family: Raleway, sans-serif;
        font-size: 1.1rem;
        margin: 0;
        padding: 0;
    }

    .ant-select-selection--single {
        height: 36px;
    }

    .grid-overflow {
        overflow: hidden;
    }

    .section {
        background-color: #eee;
        border-radius: 14px;
        padding: 2%;
    }

    .title-border {
        border-bottom: 1px solid #ccc;
        margin: 0 auto 40px auto;
        padding-bottom: 6px;
    }

    .title {
        font-size: 1rem;

        @media (min-width: 1200px) {
            font-size: 1.4rem;
        }

        margin: 0 4px;
        text-align: right;
    }
`
