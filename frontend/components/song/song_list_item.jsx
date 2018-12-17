import React from "react";
import { Popover, OverlayTrigger } from "react-bootstrap";

// props: {
//   song: { songObject }
//   addSongToPlaylist: { addSongToPlaylist }
//   removeSongFromPlaylist: { removeSongFromPlaylist }
//   addToLibrary: (later)
//   removeFromLibrary: (later)
// }

class SongListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isHovering: false,
			isDropDownOpen: false
		};
	}

	toggleHover(isHovering) {
		return () => {
			this.setState({ isHovering });
		};
	}

	showDropDown() {
		return e => {
			e.preventDefault();
			console.log(this.state.isDropDownOpen);
			this.setState({ isDropDownOpen: true });
			// document.addEventListener("click", this.hideDropDown());
		};
	}

	hideDropDown() {
		return e => {
			e.preventDefault();
			this.setState({ isDropDownOpen: false });
			// document.removeEventListener("click", this.hideDropDown());
		};
	}

	handleAddToPlaylist() {
		return e => {
			let songId = this.props.song.id;
			this.props.openModal("addToPlaylist", { songId });
		};
	}

	render() {
		const { song, removeSongFromPlaylist } = this.props;

		const songDropdown = (
			<div className="song-dropdown">
				<div onClick={this.handleAddToPlaylist()} className="dropdown">
					Add to Playlist
				</div>

				{this.props.playlist &&
				this.props.currentUser.id === this.props.playlist.creator_id ? (
					<div onClick={e => this.removeFromPlaylist(e)} className="dropdown">
						Remove from this Playlist
					</div>
				) : (
					""
				)}
			</div>
		);

		let dropdownMenu = <div className="dropdown-menu">{songDropdown}</div>;
		if (!this.state.isDropDownOpen) dropdownMenu = null;

		const moreButton = this.state.isHovering ? (
			<div className="song-dropdown-wrapper">
				<div className="dropdown-handler" onClick={this.showDropDown()}>
					•••
				</div>
				{dropdownMenu}
			</div>
		) : null;

		const minutes = Math.floor(song.duration / 60);
		let seconds = song.duration % 60;
		if (seconds < 10) {
			seconds = `0${seconds}`;
		}
		const duration = `${minutes}:${seconds}`;
		return (
			<div
				className="song-list-item"
				onMouseEnter={this.toggleHover(true)}
				onMouseLeave={this.toggleHover(false)}
			>
				<div className="icon-title">
					<div className="musical-note-icon">
						<i className="fas fa-music" />
					</div>
					<div className="title">{song.title}</div>
				</div>

				<div className="duration" onMouseLeave={this.hideDropDown()}>
					{moreButton}
					{duration}
				</div>
			</div>
		);
	}
}

export default SongListItem;