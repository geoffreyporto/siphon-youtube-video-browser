'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Navigator
} = React;

var VideoListView = require('./components/VideoListView');


var App = React.createClass({
  render: function() {
    return (
      <VideoListView />
    );
  }
});

AppRegistry.registerComponent('App', () => App);
