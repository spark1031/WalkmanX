import React from "react";
import { Link, NavLink } from "react-router-dom";
import LogoutButtonContainer from "../_button/logout_button_container";
import SearchIcon from "./search_icon";
import TotoroLogo from "../navigation/totoro_logo";

// sampleProps: {
//   sidebarItemInfos: [
//     {
//       to: "/search",
//       icon: component (SearchIcon),
//       displayText: string ("browse")
//     },
//     {
//       to: "/browse",
//       icon: component (HomeIcon),
//       displayText: string ("browse")
//     },
//     {
//       to: "/library",
//       icon: component (LibraryIcon),
//       displayText: string ("browse")
//     }
//   ]
// }

class Sidebar extends React.Component {
	render() {
		let links = this.props.sidebarItemInfos.map((item, i) => (
			<SidebarItem
				key={i}
				itemInfo={item}
				pathname={this.props.location.pathname}
			/>
		));

		return (
			<div className="sidebar-main">
				<div className="sidebar-main-links">
					<Link to="/browse/playlists" style={{ textDecoration: "none" }}>
						<div className="sidebar-main-logo">
							<TotoroLogo />
							<div className="sidebar-main-logo-name">Ghiblify</div>
						</div>
					</Link>
					{links}
					<div className="sidebar-spacer" />
					<div className="sidebar-current-user">
						<div className="user-icon">
							<i className="fas fa-paw" />
						</div>

						<div className="username">{this.props.currentUser.username}</div>
						{/* <div className="username">totoro</div> */}
					</div>
					<LogoutButtonContainer />
				</div>
			</div>
		);
	}
}

const SidebarItem = props => {
	const { itemInfo, pathname } = props;
	const { to, icon, displayText } = itemInfo;
	// let sidebarClass = "sidebar-item";
	// if (pathname.indexOf("library") && displayText.indexOf("Library") || pathname.indexOf("browse") && displayText.indexOf("Home") || pathname.indexOf("search") && displayText.indexOf("Search")) {
	// 	sidebarClass = "sidebar-item-highlighted"
	// }
	return (
		<NavLink
			className="sidebar-item-navlink"
			to={to}
			style={{ textDecoration: "none" }}
		>
			<div className="sidebar-item">
				{icon}
				<div className="sidebar-item-text">{displayText}</div>
			</div>
		</NavLink>
	);
};

export default Sidebar;
