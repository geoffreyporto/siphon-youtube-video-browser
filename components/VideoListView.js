
var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity
} = React;

var DOMParser = require('xmldom').DOMParser;

var FEED_URL = 'https://www.youtube.com/feeds/videos.xml?playlist_id=PL8B03F998924DA45B';

// TODO: pass feed URL as a prop

var VideoListView = React.createClass({
  getInitialState: function() {
    return {
      videos: []
    }
  },
  parseVideos: function(s) {
    console.log('Parsing the feed...');
    var doc = new DOMParser().parseFromString(s, 'text/xml');
    var objs = [];
    var videos = doc.getElementsByTagName('yt:videoId');
    var thumbs = doc.getElementsByTagName('media:thumbnail');
    try {
      for (var i=0; i < videos.length; i++) {
        objs.push({
          id: videos[i].textContent,
          thumbnail: thumbs[i].getAttribute('url')
        })
      }
      this.setState({videos: objs});
    } catch(error) {
      // TODO: remove this
      console.log('Error parsing the feed: ', error);
    }
  },
  fetchVideos: function() {
    console.log('Fetching video feed...');
    fetch(FEED_URL)
      .then((response) => response.text())
      .then((responseText) => {
        this.parseVideos(responseText);
      })
      .catch((error) => {
        console.log('Error fetching the feed: ', error);
      });
  },
  componentDidMount: function() {
    this.fetchVideos();
  },
  onPressVideo: function(videoID) {
    console.log('Pressed video: ', videoID);
    this.props.navigator.push({name: 'player', videoID: videoID});
  },
  render: function() {
    return (
      <ScrollView>
        {
          this.state.videos.map(video => {
            return (
              <TouchableOpacity onPress={() => this.onPressVideo(video.id)}>
                <Image
                  source={{uri: video.thumbnail}}
                  style={{width: 200, height: 200}}
                  resizeMode={Image.resizeMode.cover}
                />
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    );
  }
});

module.exports = VideoListView;
