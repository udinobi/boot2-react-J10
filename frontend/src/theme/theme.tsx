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

    .ant-select-selection--single,
    .ant-select-auto-complete.ant-select .ant-input,
    .ant-select-auto-complete.ant-select .ant-select-selection__rendered {
        height: 36px;
        line-height: 36px;
    }

    .grid-overflow {
        overflow: hidden;
    }

    .history-location-wrapper {
        margin-top: -2px;
        opacity: 0;
        width: 64px;
    }

    .history-location-item:hover .history-location-wrapper {
        opacity: 1;
    }

    .title-border {
        border-bottom: 1px solid #ccc;
        margin: 0 auto 32px auto;
        padding-bottom: 6px;
    }

    .title {
        font-size: 1.2rem;

        @media (min-width: 1200px) {
            font-size: 1.4rem;
        }

        margin: 0 4px;
        text-align: right;
    }
`
