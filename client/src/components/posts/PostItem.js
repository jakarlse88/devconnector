import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class PostItem extends Component {
  onDeleteClick = postID => {
    console.log(postID);
  };

  render() {
    const { auth, post } = this.props;

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
              <p className="text-center">John Doe</p>
            </div>
            <div className="col-md-10">
              <p className="lead">{post.text}</p>
              <button
                type="button"
                className="btn btn-light mr-1">
                <i className="text-info fas fa-thumbs-up" />
                <span className="badge badge-light">
                  {post.likes.length}
                </span>
              </button>
              <button
                type="button"
                className="btn btn-light mr-1">
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
                  )} // If this arrow func doesn't work, use function w/ .bind(this, post._id) instead
                  className="btn btn-danger mr-1"
                  type="button">
                  <i className="fas fa-times" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PostItem);
