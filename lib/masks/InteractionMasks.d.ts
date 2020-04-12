import React from 'react';
import EventBus from '../EventBus';
import { Position, ColumnMetrics } from '../common/types';
import { CanvasProps } from '../Canvas';
declare type SharedCanvasProps<R, SR> = Pick<CanvasProps<R, never, SR>, 'rows' | 'rowHeight' | 'enableCellAutoFocus' | 'enableCellCopyPaste' | 'enableCellDragAndDrop' | 'cellNavigationMode' | 'editorPortalTarget' | 'onCheckCellIsEditable' | 'onSelectedCellChange' | 'onSelectedCellRangeChange' | 'onRowsUpdate'> & Pick<ColumnMetrics<R, SR>, 'columns'>;
export interface InteractionMasksProps<R, SR> extends SharedCanvasProps<R, SR> {
    height: number;
    canvasRef: React.RefObject<HTMLDivElement>;
    scrollLeft: number;
    scrollTop: number;
    eventBus: EventBus;
    scrollToCell: (cell: Position) => void;
}
export default function InteractionMasks<R, SR>({ columns, rows, rowHeight, eventBus, enableCellAutoFocus, enableCellCopyPaste, enableCellDragAndDrop, editorPortalTarget, cellNavigationMode, canvasRef, scrollLeft, scrollTop, onSelectedCellChange, onCheckCellIsEditable, onRowsUpdate, scrollToCell }: InteractionMasksProps<R, SR>): JSX.Element;
export {};
