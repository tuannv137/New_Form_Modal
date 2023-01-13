/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { header, demo } from "wix-storybook-utils/Sections";
import { CATEGORY } from "./storiesHierarchy";
import App from "../src/App";

export default {
  category: CATEGORY.COMPONENTS,
  storyName: "Demo Storybook 2",

  sections: [
    header({ title: "Demo" }),

    demo({
      title: "Demo 2",
      component: <App openModal={false} />,
    }),

    // demo({
    //   title: "Demo 3",
    //   component: <App openModal={false} />,
    // }),
  ],
};
