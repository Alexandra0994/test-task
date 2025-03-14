import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "../baidge/Baidge.js"

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "red", "yellow", "green", "blue", "indigo", "purple", "pink", "gray", "orange"],
      description: "Defines the color scheme of the badge.",
    },
    radius: {
      control: "select",
      options: ["default", "md", "full"],
      description: "Set the border radius style.",
    },
    withDot: {
      control: "boolean",
      description: "Show a small colored dot based on the variant.",
    },
    withClose: {
      control: "boolean",
      description: "Show a close button on the badge (mutually exclusive with 'withDot').",
    },
    onClose: {
      action: "onClose",
      description: "Callback function triggered when the close icon is clicked.",
    },
    children: {
      control: "text",
      description: "The text content inside the badge.",
    },
  },
  args: {
    variant: "default",
    radius: "default",
    withDot: false,
    withClose: false,
    children: "Badge",
  },
}

export default meta
type Story = StoryObj<typeof Badge>
export const Default: Story = {}
export const WithDot: Story = {
  args: {
    withDot: true,
  },
}
export const WithCloseButton: Story = {
  args: {
    withClose: true,
    onClose: () => alert("Badge closed!"),
  },
}
export const RadiusVariants: Story = {
  args: {
    variant: "blue",
    radius: "default",
    children: "Customizable Badge",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "red", "yellow", "green", "blue", "indigo", "purple", "pink", "gray", "orange"],
    },
    radius: {
      control: "select",
      options: ["default", "md", "full"],
    },
  },
}
