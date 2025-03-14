import '../src/index.css';
import { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};
const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.normal,
    },
  },
};

export default preview;