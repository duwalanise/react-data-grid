import { CanvasProps } from './Canvas';
import EventBus from './EventBus';
declare type SharedCanvasProps<R, SR> = Pick<CanvasProps<R, never, SR>, 'columnMetrics' | 'viewportColumns' | 'rowGroupRenderer' | 'rowHeight' | 'rowRenderer' | 'onRowClick' | 'onRowExpandToggle'>;
interface IRowRendererProps<R, SR> extends SharedCanvasProps<R, SR> {
    rowIdx: number;
    row: R;
    scrollLeft: number | undefined;
    enableCellRangeSelection?: boolean;
    eventBus: EventBus;
    isRowSelected: boolean;
}
declare const _default: <R, SR>(props: IRowRendererProps<R, SR>) => JSX.Element;
export default _default;
