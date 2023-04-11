import CategoryTabBar from '../CategoryTab';
import ScreensInCategory from '../ScreensInCategory';
import SearchTabBar from '../SearchTabBar';

const ScreensTab = ({ screens }) => {
	return (
		<>
			<SearchTabBar />
			<CategoryTabBar />
			<ScreensInCategory screens={screens} />
		</>
	);
};

export default ScreensTab;
