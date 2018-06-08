import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/**
 * Stateless component that contains options to move a book
 * between shelfs.
 */
function Header(props) {
  const path = props.location.pathname;

  const headerClass = path === '/' ? 'without-back-button' : null;

  return (
    <header className={headerClass}>
      {path !== '/' && <Link className="ico back-button" to="/" />}
      <h1>Booklet</h1>
    </header>
  );
}

Header.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(Header);
