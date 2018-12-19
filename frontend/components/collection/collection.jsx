// collectionItemInfos: [
//   {
//     primaryTo: string path
//     secondaryTo: string path(optional)
//     imageUrl: string link
//     title: string
//     subTitle: string(optional)
//   },
//   {
//     primaryTo: string path
//     secondaryTo: string path(optional)
//     imageUrl: string link
//     title: string
//     subTitle: string(optional)
//   }
// ]

import React from "react";
import CollectionItem from "./collection_item";

class Collection extends React.Component {
	render() {
		let { title, collectionItemInfos, updateTrackList, songId } = this.props;
		let collectionTitle;
		if (title) {
			collectionTitle = <div className="title">{title}</div>;
		} else {
			collectionTitle = null;
		}

		let items = collectionItemInfos.map((itemInfo, i) => (
			//itemInfo now includes "tracks" for specific collection item
			<CollectionItem key={i} {...itemInfo} updateTrackList={updateTrackList} />
		));
		return (
			<div className="collection">
				{collectionTitle}
				<div className="collection-items-wrapper">
					<div className="item-grid">{items}</div>
				</div>
			</div>
		);
	}
}

export default Collection;
