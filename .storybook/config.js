import { configure, addDecorator } from '@kadira/storybook';
import backgroundColor from 'react-storybook-decorator-background';

addDecorator(backgroundColor(['#2b3947', '#ffffff']));


function loadStories() {
  require('../stories');
}

configure(loadStories, module);
