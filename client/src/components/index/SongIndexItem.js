import React from 'react';

class SongIndexItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showMenu: false
    };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  render() {
    const { song, idx, onHover, offHover, toggleSong, songLength } = this.props;
    
    return (
      <li key={song._id} onMouseOver={() => { onHover(song._id, idx) }}
        onMouseOut={() => { offHover(song._id, idx) }}
      >
        <div className="playicon-songname">
          <span className="playicon-container" onClick={e => toggleSong(e, idx, song._id)}>
            <img id={song._id} className="playicon" src={require('../../resources/music_note_icon.png')}
              alt=""
            />
          </span>
          <span id="1"> {song.title}</span>
        </div>
        <div className="menu-songlength">
          <span className="menu">
            <button className="menu-button" onClick={e => this.showMenu(e)}>
              <img className="menu-icon" src={require('../../resources/menu_icon.png')} alt="" />
              {this.state.showMenu ? (
                <ul className="nav-menu-list">
                  <li id="nav-menu-username">Save to your Favorite Songs</li>
                  <div id="nav-menu-divider"></div>
                  <li onClick={this.props.logOut}><div>Add to Playlist</div></li>
                </ul>)
                :
                (null)}
            </button>
          </span>
          <span> {songLength}</span>
        </div>
      </li>
    )
  }
}

export default SongIndexItem;