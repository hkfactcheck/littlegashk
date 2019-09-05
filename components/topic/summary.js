import References from './references';

const Summary = ({ content }) => (
	<div>
		{
			content.map(references=>(
				<References key={references.name} data={references} />
			))
		}
	</div>
)

export default Summary;