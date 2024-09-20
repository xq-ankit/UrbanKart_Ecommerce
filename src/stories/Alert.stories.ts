import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react-vite";
import Alert from "../Alert";

// Default export with meta information
export default {
  title: 'Components/Alert',
}as ComponentMeta<typeof Alert>;

// Create a template for the story
const Template :ComponentStory <typeof Alert>=(args)=><Alert {...args}/>;

// Define stories
export const SuccessAlert = Template.bind({});
SuccessAlert.args = {
  alert: {
    message: 'This is a success message!',
    type: 'success',
  },
  removeAlert: () => alert('Alert dismissed'),
};

export const ErrorAlert = Template.bind({});
ErrorAlert.args = {
  alert: {
    message: 'This is an error message!',
    type: 'error',
  },
  removeAlert: () => alert('Alert dismissed'),
};

export const AlreadyAlert = Template.bind({});
AlreadyAlert.args = {
  alert: {
    message: 'This user is already registered!',
    type: 'Already',
  },
  removeAlert: () => alert('Alert dismissed'),
};
