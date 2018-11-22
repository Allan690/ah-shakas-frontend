import React, { Component } from 'react';
import PropTypes from 'proptypes';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  ProgressBar,
} from 'react-materialize';
import Navbar from '../Navbar';
import UserArticlesContainer from '../../containers/Users/UserArticlesContainer';
import FavouriteArticlesContainer from '../../containers/Users/FavouriteArticlesContainer';

class ProfileComponent extends Component {
  state = {
    activeTab: 'articles',
  };

  componentDidMount() {
    const { loadProfile, match } = this.props;
    const { username } = match.params;
    loadProfile(username);
  }

  setActive = (activeTab) => {
    this.setState({
      activeTab,
    });
  }

  userInfo = () => {
    const { activeTab } = this.state;
    const { loading, profile } = this.props;
    if (loading) {
      return (
        <div className="loader-element" id="progress-bar">
          <Row>
            <Col s={12}>
              <ProgressBar />
            </Col>
          </Row>
        </div>
      );
    }
    return (
      <div>
        <Navbar username={profile.username} />
        <div className="profile container">
          <div className="user-data">
            <div className="UserImage">
              <img
                className="Avatar"
                src={profile.image_url === 'image-url' ? 'https://res.cloudinary.com/dbk8ky24f/image/upload/v1542099331/ezdrqhphpprculkmpc6g.png' : profile.image_url}
                alt={profile.username}
              />
            </div>
            <div className="edit-button">
              <Link to={`/profiles/update-info/${profile.username}`} className="waves-effect waves-light btn">Edit Profile</Link>
            </div>
          </div>
          <div className="UserInfo">
            <div id="username" className="Username">
              {profile.username}
            </div>
            <div id="bio" className="User-bio">
              {profile.bio}
            </div>
          </div>
          <div className="menu">
            <div className="row">
              <div className="col s12">
                <ul className="tabs">
                  <li className="tab">
                    { /* eslint-disable-next-line */ }
                    <a
                      className={activeTab === 'articles' ? 'active' : ''}
                      onClick={() => this.setActive('articles')}
                    >
                      Profile
                    </a>
                  </li>
                  <li className="tab">
                    { /* eslint-disable-next-line */ }
                    <a
                      className={activeTab === 'favourites' ? 'active' : ''}
                      onClick={() => this.setActive('favourites')}
                    >
                      Favorites
                    </a>
                  </li>
                  <li className="tab">
                    <Link className={activeTab === 'followers' ? 'active' : ''} to="/favourite-articles">Followers</Link>
                  </li>
                  <li className="tab">
                    <Link className={activeTab === 'following' ? 'active' : ''} to="/favourite-articles">Following</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { activeTab } = this.state;
    return (
      <div>
        {this.userInfo()}
        {activeTab === 'articles'
         && <UserArticlesContainer {...this.props} />
        }
        {activeTab === 'favourites'
         && <FavouriteArticlesContainer {...this.props} />
        }
      </div>
    );
  }
}

ProfileComponent.propTypes = {
  loadProfile: PropTypes.func.isRequired,
  profile: PropTypes.shape({}),
  loading: PropTypes.bool.isRequired,
  match: PropTypes.shape({}),
};

ProfileComponent.defaultProps = {
  profile: {},
  match: { params: { username: '' } },
};

export default ProfileComponent;