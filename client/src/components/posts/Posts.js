import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import PostFeed from './PostFeed';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';

import { getPostArr } from '../../actions/postActions';

class Posts extends Component {
  componentDidMount = () => {
    this.props.getPostArr();
  };

  render() {
    const { loading, postArr } = this.props.post;
    let postContent;

    if (postArr === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={postArr} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPostArr: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPostArr }
)(Posts);
