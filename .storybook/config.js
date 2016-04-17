import { configure } from '@kadira/storybook';
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

function loadStories() {
  require('../stories/main');
  // require as many stories as you need.
}

configure(loadStories, module);