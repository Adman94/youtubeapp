//Create a new component. This component will produce
// some HTML
import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyAi9ZOfYUkTlHMfVJxE_Rdh0zCDumN7X_w';

//Create a new component. This component should produce
//some HTML

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null
		};

		this.videoSearch('surfboards');
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({ 
				videos: videos,
				selectedVideo: videos[0]
			});
			//this.setState({videos: videos });
		});
	}

	render() {
		const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);
  return (
      <div>
			<img src="https://cdn.havecamerawilltravel.com/photographer/files/2020/01/youtube-logo-new-1068x510.jpg" alt="" />
      	<SearchBar onSearchTermChange={videoSearch} />
      	<VideoDetail video={this.state.selectedVideo} />
      	<VideoList 
      	 onVideoSelect={selectedVideo => this.setState({selectedVideo})}
      	videos={this.state.videos} />
      </div>
  	);
  }
}

//Take this component's generated HTML and put it
// on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
