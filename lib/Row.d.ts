import { RowRendererProps } from './common/types';
export default function Row<R, SR = unknown>({ cellRenderer: CellRenderer, className, enableCellRangeSelection, eventBus, height, rowIdx, isRowSelected, lastFrozenColumnIndex, onRowClick, row, scrollLeft, viewportColumns, width, onDragEnter, onDragOver, onDrop, ...props }: RowRendererProps<R, SR>): JSX.Element;
