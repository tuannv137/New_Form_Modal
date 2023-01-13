/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { header, demo } from "wix-storybook-utils/Sections";
import { CATEGORY } from "./storiesHierarchy";
import App from "../src/App";

export default {
    category: CATEGORY.COMPONENTS,
    storyName: "Demo Storybook 1",

    sections: [
        header({ title: "Demo" }),

        demo({
            title: "Default",
            component: <App />,
        }),
    ],
};
