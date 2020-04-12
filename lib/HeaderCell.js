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
import React, { createElement } from 'react';
import classNames from 'classnames';
import SortableHeaderCell from './headerCells/SortableHeaderCell';
import ResizableHeaderCell from './headerCells/ResizableHeaderCell';
export default function HeaderCell(_a) {
    var height = _a.height, column = _a.column, allRowsSelected = _a.allRowsSelected, onAllRowsSelectionChange = _a.onAllRowsSelectionChange, scrollLeft = _a.scrollLeft, props = __rest(_a, ["height", "column", "allRowsSelected", "onAllRowsSelectionChange", "scrollLeft"]);
    function getCell() {
        if (!column.headerRenderer)
            return column.name;
        return createElement(column.headerRenderer, { column: column, allRowsSelected: allRowsSelected, onAllRowsSelectionChange: onAllRowsSelectionChange });
    }
    var cell = getCell();
    if (column.sortable) {
        cell = (React.createElement(SortableHeaderCell, { column: column, onSort: props.onSort, sortColumn: props.sortColumn, sortDirection: props.sortDirection }, cell));
    }
    var className = classNames('rdg-cell', column.headerCellClass, {
        'rdg-cell-frozen': column.frozen,
        'rdg-cell-frozen-last': column.idx === props.lastFrozenColumnIndex
    });
    var style = {
        width: column.width,
        left: column.left
    };
    if (typeof scrollLeft === 'number') {
        style.transform = "translateX(" + scrollLeft + "px)";
    }
    cell = (React.createElement("div", { className: className, style: style }, cell));
    if (column.resizable) {
        cell = (React.createElement(ResizableHeaderCell, { column: column, onResize: props.onResize }, cell));
    }
    var DraggableHeaderCell = props.draggableHeaderCell;
    if (column.draggable && DraggableHeaderCell) {
        return (React.createElement(DraggableHeaderCell, { column: column, onHeaderDrop: props.onHeaderDrop }, cell));
    }
    return cell;
}
//# sourceMappingURL=HeaderCell.js.map