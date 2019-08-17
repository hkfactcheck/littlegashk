import Button from '@material-ui/core/Button';

const References = ({ data }) => (
	<div style={{ paddingBottom: 10 }}>
		{
			data.map((ref, i) => (
				<a href={ref}>
					<Button variant="outlined">
						來源{i + 1}
					</Button>
				</a>
			))
		}
	</div>
)

export default References;