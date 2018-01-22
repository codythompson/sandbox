import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './Button'
import Search from './Search.js'
import Table from './Table.js'

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  setSearchTopStories(result) {
    const {hits,page} = result;

    const oldHits = page !== 0
      ? this.state.result.hits
      : [];

    this.setState({
      result: {...result, hits: [...oldHits, ...hits]}
    });
  }
  
  fetchSearchTopStories(searchTerm, page = 0) {
    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;
    fetch(url)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => e);
  }
  
  componentDidMount() {
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  onDismiss(id) {
    const updatedHits = this.state.result.hits.filter(item => item.objectID !== id );
    this.setState({
      result: {...this.state.result, hits: updatedHits}
    });
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  onSearchSubmit(e) {
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm);
    e.preventDefault();
  }

  render() {
    const {searchTerm, result} = this.state;
    // if result exists and result.page isn't 0, set page to result.page, otherwise set page to 0
    const page = (result && result.page) || 0;
    result && console.log(result);

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            <div>
              Searchinnn
            </div>
          </Search>
          <img src={logo} className="App-logo" alt="yeah" />
          { result
            ? <Table
              list={result.hits}
              onDismiss={this.onDismiss}
            />
            : null
          }
          <div className="interactions">
            <Button
              onClick={()=>this.fetchSearchTopStories(searchTerm, page + 1)}
            >
              Moar
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
