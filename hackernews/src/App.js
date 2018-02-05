import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'

import logo from './logo.svg'
import './App.css'
import Button from './Button'
import Search from './Search.js'
import Table from './Table.js'
import AppLoading from './AppLoading.js'
import withLoading from './withLoading'

const DEFAULT_QUERY = 'mmk';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

const ButtonWithLoading = withLoading(Button);

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.filterSearchList = this.filterSearchList.bind(this);
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
  }
  
  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  setSearchTopStories(result) {
    const {hits,page} = result;
    const {searchKey,results} = this.state;

    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: [...oldHits, ...hits], page }
      },
      isLoading: false
    });
  }
  
  fetchSearchTopStories(searchTerm, page = 0) {
    this.setState({isLoading: true});
    
    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;
    fetch(url)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => this.setState({error: e}));
  }
  
  componentDidMount() {
    const {searchTerm} = this.state;
    this.setState({searchKey: searchTerm});
    this.fetchSearchTopStories(searchTerm);
  }

  onDismiss(id) {
    const {searchKey, results} = this.state;
    const {hits, page} = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({
      results: {
        ...results,
        [searchKey]: {hits: updatedHits, page}
      }
    });
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  onSearchSubmit(e) {
    const {searchTerm} = this.state;
    this.setState({searchKey: searchTerm});
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    e.preventDefault();
  }

  // WARNING - not from book
  filterSearchList (searchList) {
    return searchList.filter(item => typeof item.title === 'string'
      && item.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()));
  }

  render() {
    const {
      searchTerm,
      results,
      searchKey,
      error,
      isLoading
    } = this.state;

    // if result exists and result.page isn't 0, set page to result.page, otherwise set page to 0
    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || [];

    const list = (
      results &&
      results[searchKey] &&
      this.filterSearchList(results[searchKey].hits)
    ) || [];

    return (
      <div className="page">
        <div className="interactions">
          {!isLoading
            ?
              <Search
                value={searchTerm}
                onChange={this.onSearchChange}
                onSubmit={this.onSearchSubmit}
              >
                <div>
                  Searchinnn
                </div>
              </Search>
            :
              <AppLoading/>
          }
          { !error
          ?
          <div className="interactions">
            <img src={logo} className="App-logo" alt="yeah" />
            <Table
              list={list}
              onDismiss={this.onDismiss}
            />
            <ButtonWithLoading
              isLoading={isLoading}
              onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
            >
              Moar
            </ButtonWithLoading>
          </div>
          : <p>
            Somethign went wrongo.
            </p>
          }
        </div>
      </div>
    );
  }
}

export default App;
