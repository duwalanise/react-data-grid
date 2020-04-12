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
import React, { forwardRef, memo, createElement } from 'react';
import classNames from 'classnames';
import { preventDefault, wrapEvent } from './utils';
function Cell(_a, ref) {
    var children = _a.children, className = _a.className, column = _a.column, isRowSelected = _a.isRowSelected, lastFrozenColumnIndex = _a.lastFrozenColumnIndex, row = _a.row, rowIdx = _a.rowIdx, scrollLeft = _a.scrollLeft, eventBus = _a.eventBus, onRowClick = _a.onRowClick, enableCellRangeSelection = _a.enableCellRangeSelection, onClick = _a.onClick, onDoubleClick = _a.onDoubleClick, onContextMenu = _a.onContextMenu, onDragOver = _a.onDragOver, onMouseDown = _a.onMouseDown, onMouseEnter = _a.onMouseEnter, props = __rest(_a, ["children", "className", "column", "isRowSelected", "lastFrozenColumnIndex", "row", "rowIdx", "scrollLeft", "eventBus", "onRowClick", "enableCellRangeSelection", "onClick", "onDoubleClick", "onContextMenu", "onDragOver", "onMouseDown", "onMouseEnter"]);
    function selectCell(openEditor) {
        eventBus.dispatch('SELECT_CELL', { idx: column.idx, rowIdx: rowIdx }, openEditor);
    }
    function handleCellClick() {
        selectCell();
        onRowClick === null || onRowClick === void 0 ? void 0 : onRowClick(rowIdx, row, column);
    }
    function handleCellMouseDown() {
        eventBus.dispatch('SELECT_START', { idx: column.idx, rowIdx: rowIdx });
        function handleWindowMouseUp() {
            eventBus.dispatch('SELECT_END');
            window.removeEventListener('mouseup', handleWindowMouseUp);
        }
        window.addEventListener('mouseup', handleWindowMouseUp);
    }
    function handleCellMouseEnter() {
        eventBus.dispatch('SELECT_UPDATE', { idx: column.idx, rowIdx: rowIdx });
    }
    function handleCellContextMenu() {
        selectCell();
    }
    function handleCellDoubleClick() {
        selectCell(true);
    }
    function onRowSelectionChange(checked, isShiftClick) {
        eventBus.dispatch('SELECT_ROW', { rowIdx: rowIdx, checked: checked, isShiftClick: isShiftClick });
    }
    var cellClass = column.cellClass;
    className = classNames('rdg-cell', {
        'rdg-cell-frozen': column.frozen,
        'rdg-cell-frozen-last': column.idx === lastFrozenColumnIndex
    }, typeof cellClass === 'function' ? cellClass(row) : cellClass, className);
    var style = {
        width: column.width,
        left: column.left
    };
    if (scrollLeft !== undefined) {
        style.transform = "translateX(" + scrollLeft + "px)";
    }
    // TODO: Check if the children prop is required or not. These are most likely set by custom cell renderer
    if (!children) {
        children = createElement(column.formatter, {
            column: column,
            rowIdx: rowIdx,
            row: row,
            isRowSelected: isRowSelected,
            onRowSelectionChange: onRowSelectionChange
        });
    }
    return (React.createElement("div", __assign({ ref: ref, className: className, style: style, onClick: wrapEvent(handleCellClick, onClick), onDoubleClick: wrapEvent(handleCellDoubleClick, onDoubleClick), onContextMenu: wrapEvent(handleCellContextMenu, onContextMenu), onDragOver: wrapEvent(preventDefault, onDragOver), onMouseDown: !enableCellRangeSelection ? onMouseDown : wrapEvent(handleCellMouseDown, onMouseDown), onMouseEnter: !enableCellRangeSelection ? onMouseEnter : wrapEvent(handleCellMouseEnter, onMouseEnter) }, props), children));
}
export default memo(forwardRef(Cell));
//# sourceMappingURL=Cell.js.map