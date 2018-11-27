import React, { Component } from 'react';
import PropTypes from 'proptypes';
import { Col, Row, Button } from 'react-materialize';
import authUser from '../../utils/authUser.util';

class FollowingComponent extends Component {
  componentDidMount() {
    const { followersAction, match } = this.props;
    const { params } = match;
    followersAction(params.username);
  }

  render() {
    const { followers, followUser } = this.props;
    return (
      <div>
        {followers.length !== 0
          ? (
            <div className="container">
              <div id="stories-title">
                <p>Followers</p>
              </div>
              <Row>
                {followers.map(user => (
                  <Col m={4} s={12}>
                    <ul className="collection">
                      <li className="collection-item avatar">
                        <div className="user-data">
                          <div>
                            <img src={user.image_url === 'image-url' ? 'https://res.cloudinary.com/dbk8ky24f/image/upload/v1542099331/ezdrqhphpprculkmpc6g.png' : user.image_url} alt={user.username} className="circle" />
                            <a href={`/profiles/${user.username}`} className="username"><strong>{user.username}</strong></a>
                            <p>
                              {user.bio}
                            </p>
                          </div>
                          {user.username !== authUser.username
                            ? (
                              <div>
                                {user.follow_status
                                  && <Button id="following-button" onClick={() => followUser(user.username, user.follow_status)}>Following</Button>
                                }
                                {!user.follow_status
                                  && <Button id="follow-button" onClick={() => followUser(user.username, user.follow_status)}>Follow</Button>
                                }
                              </div>
                            ) : ''
                          }
                        </div>
                      </li>
                    </ul>
                  </Col>
                ))}
              </Row>
            </div>
          ) : <div className="bookmark-msg container"><p>There are no followers to be displayed.</p></div>
      }
      </div>
    );
  }
}

FollowingComponent.propTypes = {
  followUser: PropTypes.func.isRequired,
  followersAction: PropTypes.func.isRequired,
  followers: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.shape({}).isRequired,
};

FollowingComponent.defaultProps = {
  followers: [],
};

export default FollowingComponent;
