
var React = require('react-native');
var {
  StyleSheet,
  View,
  TouchableOpacity
} = React;

var YouTube = require('react-native-youtube');


var PlayerView = React.createClass({
  render: function() {
    return (
      <YouTube
        videoId={this.props.videoID}
        play={true}
        hidden={false}
        playsInline={true}
        onError={(e) => { alert(e.error) }}
        style={{alignSelf: 'stretch', height: 300, backgroundColor: 'black', marginVertical: 10}}
      />
    );
  }
});

module.exports = PlayerView;
