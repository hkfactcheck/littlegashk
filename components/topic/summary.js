import References from './references';

const Summary = ({ content }) => (
	<div>
		{
			content.map(references=>(
				<References data={references} />
			))
		}
	</div>
)

export default Summary;