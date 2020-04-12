import { CalculatedColumn } from './common/types';
import { HeaderRowProps } from './HeaderRow';
declare type SharedHeaderRowProps<R, SR> = Pick<HeaderRowProps<R, never, SR>, 'sortColumn' | 'sortDirection' | 'onSort' | 'height' | 'onHeaderDrop' | 'allRowsSelected' | 'draggableHeaderCell'>;
export interface HeaderCellProps<R, SR> extends SharedHeaderRowProps<R, SR> {
    column: CalculatedColumn<R, SR>;
    lastFrozenColumnIndex: number;
    scrollLeft: number | undefined;
    onResize: (column: CalculatedColumn<R, SR>, width: number) => void;
    onAllRowsSelectionChange: (checked: boolean) => void;
}
export default function HeaderCell<R, SR>({ height, column, allRowsSelected, onAllRowsSelectionChange, scrollLeft, ...props }: HeaderCellProps<R, SR>): JSX.Element;
export {};
