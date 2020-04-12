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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import React, { useRef, useState, useImperativeHandle, useEffect, forwardRef } from 'react';
import EventBus from './EventBus';
import InteractionMasks from './masks/InteractionMasks';
import RowRenderer from './RowRenderer';
import SummaryRow from './SummaryRow';
import { getColumnScrollPosition, getScrollbarSize, isPositionStickySupported, getVerticalRangeToRender, assertIsValidKey } from './utils';
function Canvas(_a, ref) {
    var columnMetrics = _a.columnMetrics, viewportColumns = _a.viewportColumns, height = _a.height, scrollLeft = _a.scrollLeft, onScroll = _a.onScroll, rows = _a.rows, rowHeight = _a.rowHeight, rowKey = _a.rowKey, summaryRows = _a.summaryRows, selectedRows = _a.selectedRows, onSelectedRowsChange = _a.onSelectedRowsChange, props = __rest(_a, ["columnMetrics", "viewportColumns", "height", "scrollLeft", "onScroll", "rows", "rowHeight", "rowKey", "summaryRows", "selectedRows", "onSelectedRowsChange"]);
    var _b = __read(useState(function () { return new EventBus(); }), 1), eventBus = _b[0];
    var _c = __read(useState(0), 2), scrollTop = _c[0], setScrollTop = _c[1];
    var canvasRef = useRef(null);
    var summaryRef = useRef(null);
    var lastSelectedRowIdx = useRef(-1);
    var clientHeight = getClientHeight();
    var nonStickyScrollLeft = isPositionStickySupported() ? undefined : scrollLeft;
    var columns = columnMetrics.columns, lastFrozenColumnIndex = columnMetrics.lastFrozenColumnIndex;
    var _d = __read(getVerticalRangeToRender(clientHeight, rowHeight, scrollTop, rows.length), 2), rowOverscanStartIdx = _d[0], rowOverscanEndIdx = _d[1];
    function handleScroll(e) {
        var _a = e.currentTarget, scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop;
        setScrollTop(scrollTop);
        onScroll({ scrollLeft: scrollLeft, scrollTop: scrollTop });
        if (summaryRef.current) {
            summaryRef.current.scrollLeft = scrollLeft;
        }
    }
    function getClientHeight() {
        var scrollbarSize = columnMetrics.totalColumnWidth > columnMetrics.viewportWidth ? getScrollbarSize() : 0;
        return height - scrollbarSize;
    }
    function getFrozenColumnsWidth() {
        if (lastFrozenColumnIndex === -1)
            return 0;
        var lastFrozenCol = columns[lastFrozenColumnIndex];
        return lastFrozenCol.left + lastFrozenCol.width;
    }
    function scrollToCell(_a) {
        var idx = _a.idx, rowIdx = _a.rowIdx;
        var current = canvasRef.current;
        if (!current)
            return;
        var clientWidth = current.clientWidth, clientHeight = current.clientHeight, scrollLeft = current.scrollLeft, scrollTop = current.scrollTop;
        if (typeof idx === 'number' && idx > lastFrozenColumnIndex) {
            var _b = columns[idx], left = _b.left, width = _b.width;
            var isCellAtLeftBoundary = left < scrollLeft + width + getFrozenColumnsWidth();
            var isCellAtRightBoundary = left + width > clientWidth + scrollLeft;
            if (isCellAtLeftBoundary || isCellAtRightBoundary) {
                var newScrollLeft = getColumnScrollPosition(columns, idx, scrollLeft, clientWidth);
                current.scrollLeft = scrollLeft + newScrollLeft;
            }
        }
        if (typeof rowIdx === 'number') {
            if (rowIdx * rowHeight < scrollTop) {
                // at top boundary, scroll to the row's top
                current.scrollTop = rowIdx * rowHeight;
            }
            else if ((rowIdx + 1) * rowHeight > scrollTop + clientHeight) {
                // at bottom boundary, scroll the next row's top to the bottom of the viewport
                current.scrollTop = (rowIdx + 1) * rowHeight - clientHeight;
            }
        }
    }
    function scrollToColumn(idx) {
        scrollToCell({ idx: idx });
    }
    function scrollToRow(rowIdx) {
        var current = canvasRef.current;
        if (!current)
            return;
        current.scrollTop = rowIdx * rowHeight;
    }
    function selectCell(position, openEditor) {
        eventBus.dispatch('SELECT_CELL', position, openEditor);
    }
    function openCellEditor(rowIdx, idx) {
        selectCell({ rowIdx: rowIdx, idx: idx }, true);
    }
    useEffect(function () {
        if (!onSelectedRowsChange)
            return;
        var handleRowSelectionChange = function (_a) {
            var rowIdx = _a.rowIdx, checked = _a.checked, isShiftClick = _a.isShiftClick;
            assertIsValidKey(rowKey);
            var newSelectedRows = new Set(selectedRows);
            var rowId = rows[rowIdx][rowKey];
            if (checked) {
                newSelectedRows.add(rowId);
                var previousRowIdx = lastSelectedRowIdx.current;
                lastSelectedRowIdx.current = rowIdx;
                if (isShiftClick && previousRowIdx !== -1 && previousRowIdx !== rowIdx) {
                    var step = Math.sign(rowIdx - previousRowIdx);
                    for (var i = previousRowIdx + step; i !== rowIdx; i += step) {
                        newSelectedRows.add(rows[i][rowKey]);
                    }
                }
            }
            else {
                newSelectedRows.delete(rowId);
                lastSelectedRowIdx.current = -1;
            }
            onSelectedRowsChange(newSelectedRows);
        };
        return eventBus.subscribe('SELECT_ROW', handleRowSelectionChange);
    }, [eventBus, onSelectedRowsChange, rows, rowKey, selectedRows]);
    useImperativeHandle(ref, function () { return ({
        scrollToColumn: scrollToColumn,
        scrollToRow: scrollToRow,
        selectCell: selectCell,
        openCellEditor: openCellEditor
    }); });
    function getViewportRows() {
        var _a;
        var rowElements = [];
        for (var rowIdx = rowOverscanStartIdx; rowIdx <= rowOverscanEndIdx; rowIdx++) {
            var row = rows[rowIdx];
            var key = rowIdx;
            var isRowSelected = false;
            if (rowKey !== undefined) {
                var rowId = row[rowKey];
                isRowSelected = (_a = selectedRows === null || selectedRows === void 0 ? void 0 : selectedRows.has(rowId)) !== null && _a !== void 0 ? _a : false;
                if (typeof rowId === 'string' || typeof rowId === 'number') {
                    key = rowId;
                }
            }
            rowElements.push(React.createElement(RowRenderer, { key: key, rowIdx: rowIdx, row: row, columnMetrics: columnMetrics, viewportColumns: viewportColumns, eventBus: eventBus, rowGroupRenderer: props.rowGroupRenderer, rowHeight: rowHeight, rowRenderer: props.rowRenderer, scrollLeft: nonStickyScrollLeft, isRowSelected: isRowSelected, onRowClick: props.onRowClick, onRowExpandToggle: props.onRowExpandToggle, enableCellRangeSelection: typeof props.onSelectedCellRangeChange === 'function' }));
        }
        return rowElements;
    }
    var summary = summaryRows && summaryRows.length > 0 && (React.createElement("div", { ref: summaryRef, className: "rdg-summary" }, summaryRows.map(function (row, rowIdx) { return (React.createElement(SummaryRow, { key: rowIdx, rowIdx: rowIdx, row: row, width: columnMetrics.totalColumnWidth + getScrollbarSize(), height: rowHeight, viewportColumns: viewportColumns, lastFrozenColumnIndex: columnMetrics.lastFrozenColumnIndex, scrollLeft: nonStickyScrollLeft })); })));
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "rdg-viewport", style: { height: height - 2 - (summaryRows ? summaryRows.length * rowHeight + 2 : 0) }, ref: canvasRef, onScroll: handleScroll },
            React.createElement(InteractionMasks, { rows: rows, rowHeight: rowHeight, columns: columns, height: clientHeight, enableCellAutoFocus: props.enableCellAutoFocus, enableCellCopyPaste: props.enableCellCopyPaste, enableCellDragAndDrop: props.enableCellDragAndDrop, cellNavigationMode: props.cellNavigationMode, eventBus: eventBus, canvasRef: canvasRef, scrollLeft: scrollLeft, scrollTop: scrollTop, scrollToCell: scrollToCell, editorPortalTarget: props.editorPortalTarget, onCheckCellIsEditable: props.onCheckCellIsEditable, onRowsUpdate: props.onRowsUpdate, onSelectedCellChange: props.onSelectedCellChange, onSelectedCellRangeChange: props.onSelectedCellRangeChange }),
            React.createElement("div", { className: "rdg-grid", style: {
                    width: columnMetrics.totalColumnWidth,
                    paddingTop: rowOverscanStartIdx * rowHeight,
                    paddingBottom: (rows.length - 1 - rowOverscanEndIdx) * rowHeight
                } }, getViewportRows())),
        summary));
}
export default forwardRef(Canvas);
//# sourceMappingURL=Canvas.js.map