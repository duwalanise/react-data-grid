import React from 'react';
import { RowExpandToggleEvent, CellRendererProps } from './common/types';
import EventBus from './EventBus';
interface Props<R, SR> {
    height: number;
    row: unknown;
    cellRenderer?: React.ComponentType<CellRendererProps<R, SR>>;
    isSelected?: boolean;
    rowIdx: number;
    forceUpdate?: boolean;
    isRowHovered?: boolean;
    columnGroupDisplayName: string;
    columnGroupName: string;
    isExpanded: boolean;
    treeDepth?: number;
    name: string;
    renderer?: React.ComponentType;
    eventBus: EventBus;
    onRowExpandToggle?: (event: RowExpandToggleEvent) => void;
}
declare const _default: <R, SR>(props: Props<R, SR> & {
    ref?: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined;
}) => JSX.Element;
export default _default;
