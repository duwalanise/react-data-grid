import { CalculatedColumn, ColumnMetrics } from '../common/types';
export declare function getVerticalRangeToRender(height: number, rowHeight: number, scrollTop: number, rowsCount: number): readonly [number, number];
export interface HorizontalRangeToRenderParams<R, SR> {
    columnMetrics: ColumnMetrics<R, SR>;
    scrollLeft: number;
}
export declare function getHorizontalRangeToRender<R, SR>({ columnMetrics, scrollLeft }: HorizontalRangeToRenderParams<R, SR>): [number, number];
export declare function getViewportColumns<R, SR>(columns: readonly CalculatedColumn<R, SR>[], colOverscanStartIdx: number, colOverscanEndIdx: number): CalculatedColumn<R, SR>[];
