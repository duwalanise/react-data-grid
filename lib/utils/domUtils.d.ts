export declare function getScrollbarSize(): number;
export declare function isPositionStickySupported(): boolean;
export declare function preventDefault(event: React.SyntheticEvent): void;
export declare function wrapEvent<E extends React.SyntheticEvent>(ourHandler: React.EventHandler<E>, theirHandler: React.EventHandler<E> | undefined): (event: E) => void;
