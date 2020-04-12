import { KeyboardEvent } from 'react';
import { CalculatedColumn, CommitEvent, Dimension, Omit } from '../common/types';
import { InteractionMasksProps } from '../masks/InteractionMasks';
declare type SharedInteractionMasksProps<R, SR> = Pick<InteractionMasksProps<R, SR>, 'scrollLeft' | 'scrollTop'>;
export interface EditorContainerProps<R, SR> extends SharedInteractionMasksProps<R, SR>, Omit<Dimension, 'zIndex'> {
    rowIdx: number;
    row: R;
    column: CalculatedColumn<R, SR>;
    onGridKeyDown?: (e: KeyboardEvent) => void;
    onCommit: (e: CommitEvent) => void;
    onCommitCancel: () => void;
    firstEditorKeyPress: string | null;
}
export default function EditorContainer<R, SR>({ rowIdx, column, row, width, height, left, top, onCommit, onCommitCancel, scrollLeft, scrollTop, firstEditorKeyPress: key }: EditorContainerProps<R, SR>): JSX.Element;
export {};
