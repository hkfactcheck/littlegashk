import checkNull from '../../utils/checkNull';

const Related = ({ files = [], topics = [] }) => (
	<div>
		<div>
			{
				checkNull(files, []).map(f => f)
			}
		</div>
		<div>
			{
				checkNull(topics, []).map(f => f)
			}
		</div>
	</div>
)

export default Related;