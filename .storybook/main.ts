import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: ["@storybook/addon-essentials"],
    framework: {
        name: "@storybook/react-vite",
        options: {}
    },
    viteFinal: (config) => {
        return {
            ...config,
            resolve: {
                alias: {
                    "@assets": "/src/assets/",
                },
            },
        };
    },
};

export default config;
