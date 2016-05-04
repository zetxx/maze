import { configure } from '@kadira/storybook'
var injectTapEventPlugin = require('react-tap-event-plugin')
injectTapEventPlugin()

function loadStories() {
  require('./main')
}

configure(loadStories, module)
