import { Position, SelectRowEvent } from './common/types';
interface EventMap {
    SELECT_CELL: (position: Position, enableEditor?: boolean) => void;
    SELECT_ROW: (event: SelectRowEvent) => void;
    SELECT_START: (position: Position) => void;
    SELECT_UPDATE: (position: Position, isFromKeyboard?: boolean, callback?: () => void) => void;
    SELECT_END: () => void;
    DRAG_ENTER: (overRowIdx: number) => void;
}
declare type EventName = keyof EventMap;
export default class EventBus {
    private readonly subscribers;
    subscribe<T extends EventName>(type: T, handler: EventMap[T]): () => void;
    dispatch<T extends EventName>(type: T, ...args: Parameters<EventMap[T]>): void;
}
export {};
