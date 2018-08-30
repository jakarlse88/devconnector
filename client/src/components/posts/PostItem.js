import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  addLike,
  deletePost,
  removeLike
} from '../../actions/postActions';

class PostItem extends Component {
  onDeleteClick = postID => {
    this.props.deletePost(postID);
  };

  onLikeClick = postID => {
    this.props.addLike(postID);
  };

  onUnlikeClick = postID => {
    this.props.removeLike(postID);
  };

  findUserLike = likes => {
    const { auth } = this.props;

    if (
      likes.filter(like => like.user === auth.user.id).length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { auth, post, showActions } = this.props;

    return (
      <div className="posts">
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-md-2">
              <a href="profile.html">
                <img
                  className="rounded-circle d-none d-md-block"
                  src={post.avatar}
                  alt="user avatar"
                />
              </a>
              <br />
              <p className="text-center">{post.name}</p>
            </div>
            <div className="col-md-10">
              <p className="lead">{post.text}</p>
              {showActions ? (
                <span>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={this.onLikeClick.bind(
                      this,
                      post._id
                    )}>
                    <i
                      className={classnames('fas fa-thumbs-up', {
                        'text-info': this.findUserLike(
                          post.likes
                        )
                      })}
                    />
                    <span className="badge badge-light">
                      {post.likes.length}
                    </span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={this.onUnlikeClick.bind(
                      this,
                      post._id
                    )}>
                    <i className="text-secondary fas fa-thumbs-down" />
                  </button>
                  <Link
                    to={`/post/${post._id}`}
                    className="btn btn-info mr-1">
                    Comments
                  </Link>
                  {post.user === auth.user.id ? (
                    <button
                      onClick={this.onDeleteClick.bind(
                        this,
                        post._id
                      )}
                      className="btn btn-danger mr-1"
                      type="button">
                      <i className="fas fa-times" />
                    </button>
                  ) : null}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  addLike: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  removeLike: PropTypes.func.isRequired,
  showActions: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, deletePost, removeLike }
)(PostItem);
