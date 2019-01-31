import React, { Component } from 'react';
import { Pagination } from 'semantic-ui-react';

class PaginationMenu extends Component {
  state = {
    numItems: this.props.numItems,
    itemsPerPage: this.props.itemsPerPage
  };

  onPageChange = e => {
    e.preventDefault();

    const targetPageNum = parseInt(e.target.getAttribute('value'));

    this.props.handlePageChange(targetPageNum);
  };

  render() {
    return (
      <Pagination
        pointing
        secondary
        color="red"
        boundaryRange={0}
        defaultActivePage={1}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        totalPages={Math.ceil(this.state.numItems / this.state.itemsPerPage)}
        onPageChange={this.onPageChange}
        className="pagination"
      />
    );
  }
}

export default PaginationMenu;
