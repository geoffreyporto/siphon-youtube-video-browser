
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
    for (var i=0; i < videos.length; i++) {
      objs.push({
        id: videos[i].textContent,
        thumbnail: thumbs[i].getAttribute('url')
      })
    }
    this.setState({videos: objs});
  },
  fetchVideos: function() {
    console.log('Fetching video feed...');
    var url = "https://www.youtube.com/feeds/videos.xml?playlist_id=" +
      this.props.playlistID;
    fetch(url)
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
          this.state.videos.map((video, i) => {
            return (
              <TouchableOpacity onPress={() => this.onPressVideo(video.id)}
                key={i.toString()}>
                <Image
                  source={{uri: video.thumbnail}}
                  style={{height: 280}}
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
