import { RowRendererProps } from './common/types';
declare type SharedRowRendererProps<R, SR> = Pick<RowRendererProps<R, SR>, 'height' | 'width' | 'viewportColumns' | 'rowIdx' | 'lastFrozenColumnIndex' | 'scrollLeft'>;
interface SummaryRowProps<R, SR> extends SharedRowRendererProps<R, SR> {
    row: SR;
}
declare const _default: <R, SR>(props: SummaryRowProps<R, SR>) => JSX.Element;
export default _default;
