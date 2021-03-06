import { injectGlobal } from "styled-components"

import bgi from "../assets/aurora.jpg"

export default injectGlobal`

    @import url("https://fonts.googleapis.com/css?family=Raleway");
    @import url("http://fonts.googleapis.com/css?family=Roboto");

    html, body {
        border: 0;
        font-family: Raleway, sans-serif;
        font-size: 1.1rem;
        height: 100%
        margin: 0;
        padding: 0;
    }

    .ant-list-item {
        font-size: 1.1rem;
    }

    .ant-select-selection--single,
    .ant-select-auto-complete.ant-select .ant-input,
    .ant-select-auto-complete.ant-select .ant-select-selection__rendered {
        font-size: 1.1rem;
        height: 36px;
        line-height: 36px;
    }

    .aurora {
        background-image: url(${bgi});
        background-position: center;
        background-repeat: round;
        background-size: contain;
        height: 100vh;
        position: fixed;
        width: 100vw;
    }

    .aurora a {
        color: #FFE329;
        font-weight: bold;
    }

    .day-under-5-icon-color  { color: #0093DC; }
    .day-under-12-icon-color { color: #3A8183; }
    .day-under-22-icon-color { color: #E9BD15; }
    .day-under-32-icon-color { color: #EE671E; }
    .day-from-32-icon-color  { color: #F21822; }

    .grid-overflow {
        overflow: hidden;
    }

    .ant-layout-header nav a {
        display: inline-block;
        padding: 0 1em;
        color: #fff;
    }

    .ant-layout-header nav a:hover {
        background-color: #eee;
        color: #555;
    }

    .ant-layout-header nav a.active {
        background-color: #1890FF;
        color: #fff;
    }

    .history-location-wrapper {
        margin-top: -2px;
        opacity: 0;
        width: 64px;
    }

    .history-location-item:hover .history-location-wrapper {
        opacity: 1;
    }

    .night-icon-color {
        color: #00008B; /* darkblue */
    }

    .title-border {
        border-bottom: 1px solid #ccc;
        margin: 0 auto 16px auto;
        padding-bottom: 4px;
    }

    .title-border.map {
        margin-bottom: 6px;
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
