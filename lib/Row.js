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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import classNames from 'classnames';
import React from 'react';
import Cell from './Cell';
import { preventDefault, wrapEvent } from './utils';
export default function Row(_a) {
    var _b = _a.cellRenderer, CellRenderer = _b === void 0 ? Cell : _b, className = _a.className, enableCellRangeSelection = _a.enableCellRangeSelection, eventBus = _a.eventBus, height = _a.height, rowIdx = _a.rowIdx, isRowSelected = _a.isRowSelected, lastFrozenColumnIndex = _a.lastFrozenColumnIndex, onRowClick = _a.onRowClick, row = _a.row, scrollLeft = _a.scrollLeft, viewportColumns = _a.viewportColumns, width = _a.width, onDragEnter = _a.onDragEnter, onDragOver = _a.onDragOver, onDrop = _a.onDrop, props = __rest(_a, ["cellRenderer", "className", "enableCellRangeSelection", "eventBus", "height", "rowIdx", "isRowSelected", "lastFrozenColumnIndex", "onRowClick", "row", "scrollLeft", "viewportColumns", "width", "onDragEnter", "onDragOver", "onDrop"]);
    function handleDragEnter(event) {
        // Prevent default to allow drop
        event.preventDefault();
        eventBus.dispatch('DRAG_ENTER', rowIdx);
    }
    function handleDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }
    function getCells() {
        return viewportColumns.map(function (column) {
            return (React.createElement(CellRenderer, { key: column.key, rowIdx: rowIdx, column: column, lastFrozenColumnIndex: lastFrozenColumnIndex, row: row, scrollLeft: column.frozen && typeof scrollLeft === 'number' ? scrollLeft : undefined, isRowSelected: isRowSelected, eventBus: eventBus, onRowClick: onRowClick, enableCellRangeSelection: enableCellRangeSelection }));
        });
    }
    className = classNames('rdg-row', "rdg-row-" + (rowIdx % 2 === 0 ? 'even' : 'odd'), { 'rdg-row-selected': isRowSelected }, className);
    // Regarding onDrop: the default in Firefox is to treat data in dataTransfer as a URL,
    // and perform navigation on it, even if the data type used is 'text'.
    // To bypass this, we need to capture and prevent the drop event.
    return (React.createElement("div", __assign({ className: className, style: { width: width, height: height }, onDragEnter: wrapEvent(handleDragEnter, onDragEnter), onDragOver: wrapEvent(handleDragOver, onDragOver), onDrop: wrapEvent(preventDefault, onDrop) }, props), getCells()));
}
//# sourceMappingURL=Row.js.map