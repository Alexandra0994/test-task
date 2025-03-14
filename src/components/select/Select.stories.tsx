import type { Meta, StoryObj } from "@storybook/react"
import { Select } from "./Select.js"
import { SelectOption } from "./Select.js"

const options: SelectOption[] = [
  { value: "pikachu", label: "Pikachu" },
  { value: "bulbasaur", label: "Bulbasaur" },
  { value: "charmander", label: "Charmander" },
  { value: "squirtle", label: "Squirtle" },
  { value: "jigglypuff", label: "Jigglypuff" },
  { value: "mewtwo", label: "Mewtwo" },
]

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  argTypes: {
    label: { control: "text", description: "Label for the Select" },
    placeholder: { control: "text", description: "Placeholder text" },
    helpText: { control: "text", description: "Help text for guidance" },
    optional: { control: "boolean", description: "Marks the field as optional" },
    disabled: { control: "boolean", description: "Disables the Select" },
    multiple: { control: "boolean", description: "Allows multiple selections" },
    badgeVariant: {
      control: "select",
      options: ["default", "red", "yellow", "green", "blue", "indigo", "purple", "pink", "gray", "orange"],
      description: "Badge color variants",
    },
    badgeWithDot: { control: "boolean", description: "Adds a dot in badges" },
    badgeWithClose: { control: "boolean", description: "Adds a close button in badges" },
    value: { control: "object", description: "Selected value(s)" },
    onChange: { action: "onChange", description: "Handles the change of selected values" },
  },
  args: {
    label: "Pokemon Select",
    options: options,
    placeholder: "Choose Pokémon...",
    helpText: "Select up to 4 Pokémon.",
    optional: true,
    disabled: false,
    multiple: true,
    badgeVariant: "default",
    badgeWithDot: false,
    badgeWithClose: true,
    value: [],
  },
}

export default meta
type Story = StoryObj<typeof Select>
export const Default: Story = {}
export const MultipleSelection: Story = {
  args: {
    multiple: true,
    value: ["pikachu", "charmander"],
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: ["pikachu"],
  },
}
export const WithDifferentBadgeVariants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Select {...args} badgeVariant="red" />
      <Select {...args} badgeVariant="green" />
      <Select {...args} badgeVariant="blue" />
      <Select {...args} badgeVariant="purple" />
      <Select {...args} badgeVariant="orange" />
    </div>
  ),
  args: {
    multiple: true,
    value: ["pikachu", "bulbasaur"],
  },
}

export const WithBadgeDot: Story = {
  args: {
    multiple: true,
    badgeWithDot: true,
    value: ["pikachu", "bulbasaur"],
  },
}

export const WithClearAllButton: Story = {
  args: {
    multiple: true,
    value: ["pikachu", "bulbasaur", "squirtle"],
  },
}

export const WithoutBadgeCloseButton: Story = {
  args: {
    multiple: true,
    badgeWithClose: false,
    value: ["pikachu", "bulbasaur"],
  },
}
