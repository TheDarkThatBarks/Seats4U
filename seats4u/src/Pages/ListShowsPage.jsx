import { Link } from 'react-router-dom';

const ListShows = () => {
	return (
		<div className="ListShows">
			<Link to="/CreateShowPage">
				<div className="btn">Create Show</div>
			</Link>
		</div>
	);
};

export default ListShows;