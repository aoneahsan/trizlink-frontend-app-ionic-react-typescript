import STYLED_COMPONENT from 'styled-components';

export const ZTable = STYLED_COMPONENT.table`
  width: 100%;
  background-color: #fff;
`;

export const ZTableTHead = STYLED_COMPONENT.thead`
`;

export const ZTableTBody = STYLED_COMPONENT.tbody`
`;

export const ZTableTFoot = STYLED_COMPONENT.tfoot`
`;

export const ZTableRow = STYLED_COMPONENT.tr`
border-bottom: 1px solid #0000001f;

`;

export const ZTableHeadCol = STYLED_COMPONENT.th`
padding: .5rem 1rem;
font-size: 14px;
color: #686d7a;

`;

interface IZTableRowColProps {
	large?: boolean;
}

export const ZTableRowCol = STYLED_COMPONENT.td<IZTableRowColProps>`
padding: ${(props) => (props.large ? '1rem 1rem' : '.1rem 1rem')};  
font-size: 14px;
color: #686d7a;
`;
