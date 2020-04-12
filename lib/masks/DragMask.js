var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import CellMask from './CellMask';
export default function DragMask(_a) {
    var draggedPosition = _a.draggedPosition, getSelectedDimensions = _a.getSelectedDimensions;
    var overRowIdx = draggedPosition.overRowIdx, idx = draggedPosition.idx, rowIdx = draggedPosition.rowIdx;
    if (rowIdx === overRowIdx)
        return null;
    var isDraggedOverDown = rowIdx < overRowIdx;
    var startRowIdx = isDraggedOverDown ? rowIdx + 1 : overRowIdx;
    var endRowIdx = isDraggedOverDown ? overRowIdx : rowIdx - 1;
    var className = isDraggedOverDown ? 'react-grid-cell-dragged-over-down' : 'react-grid-cell-dragged-over-up';
    var dimensions = getSelectedDimensions({ idx: idx, rowIdx: startRowIdx });
    for (var currentRowIdx = startRowIdx + 1; currentRowIdx <= endRowIdx; currentRowIdx++) {
        var height = getSelectedDimensions({ idx: idx, rowIdx: currentRowIdx }).height;
        dimensions.height += height;
    }
    return (React.createElement(CellMask, __assign({}, dimensions, { className: className })));
}
//# sourceMappingURL=DragMask.js.map