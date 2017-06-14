import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
  }

  handleFilterTextChange(event) {
    this.props.handleFilterTextChange(event.target.value)
  }

  render() {
    return (
      <form className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search for user"
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
      </form>
    )
  }
}

export default SearchBar

SearchBar.propTypes = {
  handleFilterTextChange: PropTypes.func.isRequired,
  filterText: PropTypes.string.isRequired,
}
