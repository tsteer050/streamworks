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
    debugger
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
    return (
      <li key={song._id} onMouseOver={() => { this.onHover(song._id, idx) }}
        onMouseOut={() => { this.offHover(song._id, idx) }}
      >
        <div className="playicon-songname">
          <span className="playicon-container" onClick={e => this.toggleSong(e, idx, song._id)}>
            <img id={song._id} className="playicon" src={require('../resources/music_note_icon.png')}
              alt=""
            />
          </span>
          <span id="1"> {song.title}</span>
        </div>
        <div className="menu-songlength">
          <span className="menu">
            <button className="menu-icon" onClick={e => this.showMenu(e)}>
              {/* <img className="menu-icon" src={require('../resources/menu_icon.png')} alt="" /> */}
              {this.state.showMenu ? (
                <ul className="nav-menu-list">
                  <li id="nav-menu-username">{this.props.username}</li>
                  <div id="nav-menu-divider"></div>
                  <li onClick={this.props.logOut}><div>log out</div></li>
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


