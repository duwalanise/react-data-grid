import { CalculatedColumn } from './common/types';
import { DataGridProps } from './DataGrid';
declare type SharedDataGridProps<R, SR> = Pick<DataGridProps<R, never, SR>, 'filters' | 'onFiltersChange'>;
export interface FilterRowProps<R, SR> extends SharedDataGridProps<R, SR> {
    height: number;
    width: number;
    lastFrozenColumnIndex: number;
    columns: readonly CalculatedColumn<R, SR>[];
    scrollLeft: number | undefined;
}
export default function FilterRow<R, SR>({ height, width, columns, lastFrozenColumnIndex, scrollLeft, filters, onFiltersChange }: FilterRowProps<R, SR>): JSX.Element;
export {};
