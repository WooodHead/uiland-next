import React from 'react';
import styled from 'styled-components';
function EmptyState() {
	return (
		<EmptyContainer>
			<div>
				<img src='/assets/img/emptyicon.svg' />
			</div>
			<div>
				<b>Such Empty 	&#128534;</b>
			</div>
		</EmptyContainer>
	);
}

const EmptyContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	gap: 12px;
	flex-direction: column;
	b {
		font-size: 20px;
	}
`;

export default EmptyState;
