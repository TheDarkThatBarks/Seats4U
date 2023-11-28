import { Link } from 'react-router-dom';

export const ListShowsPage = () => {
	return (
		<div className="ListShows">
			<Link to="/CreateShowPage">
				<div className="btn">Create Show</div>
			</Link>
		</div>
	);
};