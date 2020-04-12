import { CalculatedColumn } from './common/types';
import { DataGridProps } from './DataGrid';
declare type SharedDataGridProps<R, K extends keyof R, SR> = Pick<DataGridProps<R, K, SR>, 'draggableHeaderCell' | 'rows' | 'onHeaderDrop' | 'onSelectedRowsChange' | 'sortColumn' | 'sortDirection' | 'onSort' | 'rowKey'>;
export interface HeaderRowProps<R, K extends keyof R, SR> extends SharedDataGridProps<R, K, SR> {
    height: number;
    width: number;
    lastFrozenColumnIndex: number;
    columns: readonly CalculatedColumn<R, SR>[];
    allRowsSelected: boolean;
    scrollLeft: number | undefined;
    onColumnResize: (column: CalculatedColumn<R, SR>, width: number) => void;
}
export default function HeaderRow<R, K extends keyof R, SR>({ height, width, onSelectedRowsChange, rowKey, rows, ...props }: HeaderRowProps<R, K, SR>): JSX.Element;
export {};
