
var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} = React;

var YouTube = require('react-native-youtube');


var PlayerView = React.createClass({
  render: function() {
    return (
      <View>
        <YouTube
          videoId={this.props.videoID}
          play={true}
          hidden={false}
          playsInline={true}
          onError={(e) => { alert(e.error) }}
          style={{alignSelf: 'stretch', height: 300, backgroundColor: 'black', marginVertical: 10}}
        />
        <TouchableOpacity onPress={() => this.props.navigator.pop()}>
          <Text style={{ color: 'yellow' }}>Close this video</Text>
        </TouchableOpacity>
      </View>
    );
  }
});

module.exports = PlayerView;
