import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: ["@storybook/addon-essentials", "@chromatic-com/storybook"],

    framework: {
        name: "@storybook/react-vite",
        options: {}
    },
    staticDirs: ['../public'],

    docs: {
        autodocs: true
    },

    typescript: {
        reactDocgen: "react-docgen-typescript"
    }
};

export default config;
