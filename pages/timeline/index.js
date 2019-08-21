import fetch from 'isomorphic-unfetch'
import Layout from '../../components/layout';
import List from '../../components/list';

const TimelineHome = ({ data = [] , d}) => {
	return (
		<Layout>
			<List data={data} header={'Timeline ' + d}/>
		</Layout>
	);
}

// TimelineHome.formatTwoDigits = (digit) => ("0" + digit).slice(-2);

TimelineHome.formatDate = (date) => {
    var d = date,
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

		console.log('date = ', d);
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

TimelineHome.getInitialProps = async () => {
	const tempDate = new Date();
	const date = TimelineHome.formatDate(tempDate);
	console.log(date);
	const res = await fetch(process.env.API + 'topics/date/' + date);
	try {
		const json = await res.json()
		console.log(json);
		return { data: json , d:date}
	} catch (e) {
		return { data: null }
	}
}

export default TimelineHome;
