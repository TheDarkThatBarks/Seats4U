import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div className="Home">
			<Link to="/CreateVenuePage">
				<div className="btn">Create Venue</div>
			</Link>
			<Link to="/ListShowsPage">
				<div className="btn">Insert Venue Name here somehow</div>
			</Link>
		</div>
	);
};

export default Home;