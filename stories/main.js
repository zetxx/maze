import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import RaisedButton from 'material-ui/lib/raised-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import GridList from 'material-ui/lib/grid-list/grid-list';

storiesOf('Button', module)
  .add('with a text', () => (
    <GridList cellHeight={100} cols={2}>
      <Toolbar>
        <ToolbarGroup float="right">
          <ToolbarTitle text="Options"/>
          <ToolbarSeparator />
          <ToolbarTitle text="Options"/>
        </ToolbarGroup>
      </Toolbar>
      <Toolbar>
        <ToolbarGroup float="right">
          <ToolbarTitle text="Options"/>
          <ToolbarSeparator />
          <ToolbarTitle text="Options"/>
        </ToolbarGroup>
      </Toolbar>
      <Toolbar>
        <ToolbarGroup float="right">
          <ToolbarTitle text="Options"/>
          <ToolbarSeparator />
          <ToolbarTitle text="Options"/>
        </ToolbarGroup>
      </Toolbar>
      <Toolbar>
        <ToolbarGroup float="right">
          <ToolbarTitle text="Options"/>
          <ToolbarSeparator />
          <ToolbarTitle text="Options"/>
        </ToolbarGroup>
      </Toolbar>
    </GridList>
  ))
  .add('with no text', () => (
    <button></button>
  ));