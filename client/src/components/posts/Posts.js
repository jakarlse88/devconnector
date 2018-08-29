import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import PostForm from './PostForm';
import Spinner from '../common/Spinner';

class Posts extends Component {
  render() {
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
