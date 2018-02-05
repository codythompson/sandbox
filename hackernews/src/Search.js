import React, {Component} from 'react';

class Search extends Component {
  constructor () {
    super();
    this.canSelect = this.canSelect.bind(this);
    this.select = this.select.bind(this);
  }

  componentDidMount () {
    if (this.input) {
      this.input.focus();
    }
  }
  
  canSelect () {
    return this.input && typeof this.input.select === 'function';
  }

  select () {
    this.canSelect() && this.input.select();
  }

  render () {
    const {
      value,
      onChange,
      onSubmit,
      children
    } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          onFocus={this.select}
          ref={(node) => {this.input = node; }}
        />
        <button type="submit">
          {children}
        </button>
      </form>
    );
  }
};
export default Search;