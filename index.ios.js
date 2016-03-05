'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Navigator
} = React;

var VideoListView = require('./components/VideoListView');
var PlayerView = require('./components/PlayerView');


var App = React.createClass({
  renderScene: function(route, nav) {
    if (route.name == 'list') {
      return <VideoListView navigator={nav} playlistID="PLF76F25F55798FDBC" />;
    } else {
      return <PlayerView navigator={nav} videoID={route.videoID} />;
    }
  },
  render: function() {
    return (
      <Navigator
        style={{flex: 1, backgroundColor: 'black'}}
        initialRoute={{name: 'list'}}
        renderScene={this.renderScene}
      />
    );
  }
});

AppRegistry.registerComponent('App', () => App);
