import React from 'react';
import { ColumnMetrics, Position, ScrollPosition, CalculatedColumn } from './common/types';
import { DataGridProps } from './DataGrid';
declare type SharedDataGridProps<R, K extends keyof R, SR> = Pick<DataGridProps<R, K, SR>, 'rows' | 'rowRenderer' | 'rowGroupRenderer' | 'selectedRows' | 'summaryRows' | 'onCheckCellIsEditable' | 'onSelectedCellChange' | 'onSelectedCellRangeChange' | 'onRowClick' | 'onRowExpandToggle' | 'onSelectedRowsChange' | 'rowKey'> & Required<Pick<DataGridProps<R, K, SR>, 'enableCellAutoFocus' | 'enableCellCopyPaste' | 'enableCellDragAndDrop' | 'rowHeight' | 'cellNavigationMode' | 'editorPortalTarget' | 'onRowsUpdate'>>;
export interface CanvasProps<R, K extends keyof R, SR> extends SharedDataGridProps<R, K, SR> {
    columnMetrics: ColumnMetrics<R, SR>;
    viewportColumns: readonly CalculatedColumn<R, SR>[];
    height: number;
    scrollLeft: number;
    onScroll: (position: ScrollPosition) => void;
}
export interface CanvasHandle {
    scrollToColumn: (colIdx: number) => void;
    scrollToRow: (rowIdx: number) => void;
    selectCell: (position: Position, openEditor?: boolean) => void;
    openCellEditor: (rowIdx: number, colIdx: number) => void;
}
declare const _default: <R, K extends keyof R, SR>(props: CanvasProps<R, K, SR> & {
    ref?: ((instance: CanvasHandle | null) => void) | React.RefObject<CanvasHandle> | null | undefined;
}) => JSX.Element;
export default _default;
