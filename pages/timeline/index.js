import fetch from 'isomorphic-unfetch'
import Layout from '../../components/layout';
import List from '../../components/timeline';

const TimelineHome = ({ data = [] , d, lastItemDate}) => {
	// console.log('return = ', data);

	return (
		<Layout>
			<List data={data} header={'Timeline'} lastItemDate={lastItemDate} />
		</Layout>
	);
}

// format Date to 'YYYY-MM-DD'
TimelineHome.formatDate = (date) => {
    var d = date,
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

TimelineHome.getInitialProps = async () => {
	var tempDate = new Date();

	try {
		// get Data
		var date = tempDate;
		const result = [];
		var lastItemDate = '';
	
		for (var i = 0 ; i < 10; i++) {
			date.setDate(date.getDate() - 1);
			const dateString = TimelineHome.formatDate(date);
			const res = await fetch(process.env.API + 'topics/date/' + dateString);
			const json = await res.json();
			result.push(json);

			lastItemDate = dateString;
		}

		return { data: result , d: tempDate, lastItemDate: lastItemDate}
	} catch (e) {
		return { data: null, d:e}
	}
}

export default TimelineHome;
