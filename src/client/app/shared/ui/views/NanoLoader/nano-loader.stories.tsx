import { Story, Meta } from '@storybook/react'

import { NanoLoader, TNanoLoaderProps } from './nano-loader'

export default {
  title: 'Design System/Molecules/NanoLoader',
  component: NanoLoader,
  argTypes: {},
} as Meta

const Template: Story<TNanoLoaderProps> = (args) => (
  <div style={{ width: '100%', backgroundColor: '#eee', padding: '10vw' }}>
    <NanoLoader {...args}>
      <div style={{ width: '100%', height: '200px', backgroundColor: '#1ea7fd' }} />
    </NanoLoader>
  </div>
)

export const Default = Template.bind({})
Default.args = {
  isLoading: true,
}
