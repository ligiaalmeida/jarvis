import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { BottomToTop } from './index';

export default {
  title: 'Component/BottomToTop',
  component: BottomToTop,
  argTypes: {
    active: {
      control: { type: 'number' },
    },
    idItem: {
      control: { type: 'number' },
    },
    classes: {
      control: { type: 'string' },
    },
    children: { if: {({ arg: 'active' }) === ({ arg: 'idItem' })} },
  },
} as unknown as ComponentMeta<typeof BottomToTop>;

const Template: ComponentStory<typeof BottomToTop> = (args) => (
  <BottomToTop {...args} />
);

export const Children = Template.bind({});

// Children.args = {
//   children:
//     Children.argTypes?.active === Children.argTypes?.idItem ? (
//       <div>Iguais</div>
//     ) : null,
// };
