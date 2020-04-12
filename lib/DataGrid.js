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
import React, { forwardRef, useState, useRef, useLayoutEffect, useMemo, createElement } from 'react';
import HeaderRow from './HeaderRow';
import FilterRow from './FilterRow';
import Canvas from './Canvas';
import { ValueFormatter } from './formatters';
import { getColumnMetrics, getHorizontalRangeToRender, isPositionStickySupported, getViewportColumns, getScrollbarSize } from './utils';
import { CellNavigationMode } from './common/enums';
/**
 * Main API Component to render a data grid of rows and columns
 *
 * @example
 *
 * <DataGrid columns={columns} rows={rows} />
*/
function DataGrid(_a, ref) {
    var rowKey = _a.rowKey, _b = _a.rowHeight, rowHeight = _b === void 0 ? 35 : _b, _c = _a.headerRowHeight, headerRowHeight = _c === void 0 ? rowHeight : _c, _d = _a.headerFiltersHeight, headerFiltersHeight = _d === void 0 ? 45 : _d, _e = _a.minColumnWidth, minColumnWidth = _e === void 0 ? 80 : _e, _f = _a.height, height = _f === void 0 ? 350 : _f, width = _a.width, _g = _a.enableCellAutoFocus, enableCellAutoFocus = _g === void 0 ? true : _g, _h = _a.enableFilters, enableFilters = _h === void 0 ? false : _h, _j = _a.enableCellCopyPaste, enableCellCopyPaste = _j === void 0 ? false : _j, _k = _a.enableCellDragAndDrop, enableCellDragAndDrop = _k === void 0 ? false : _k, _l = _a.cellNavigationMode, cellNavigationMode = _l === void 0 ? CellNavigationMode.NONE : _l, _m = _a.editorPortalTarget, editorPortalTarget = _m === void 0 ? document.body : _m, _o = _a.defaultFormatter, defaultFormatter = _o === void 0 ? ValueFormatter : _o, columns = _a.columns, rows = _a.rows, selectedRows = _a.selectedRows, onSelectedRowsChange = _a.onSelectedRowsChange, props = __rest(_a, ["rowKey", "rowHeight", "headerRowHeight", "headerFiltersHeight", "minColumnWidth", "height", "width", "enableCellAutoFocus", "enableFilters", "enableCellCopyPaste", "enableCellDragAndDrop", "cellNavigationMode", "editorPortalTarget", "defaultFormatter", "columns", "rows", "selectedRows", "onSelectedRowsChange"]);
    var _p = __read(useState(function () { return new Map(); }), 2), columnWidths = _p[0], setColumnWidths = _p[1];
    var _q = __read(useState(0), 2), scrollLeft = _q[0], setScrollLeft = _q[1];
    var _r = __read(useState(0), 2), gridWidth = _r[0], setGridWidth = _r[1];
    var gridRef = useRef(null);
    var headerRef = useRef(null);
    var viewportWidth = (width || gridWidth) - 2; // 2 for border width;
    var nonStickyScrollLeft = isPositionStickySupported() ? undefined : scrollLeft;
    var columnMetrics = useMemo(function () {
        if (viewportWidth <= 0)
            return null;
        return getColumnMetrics({
            columns: columns,
            minColumnWidth: minColumnWidth,
            viewportWidth: viewportWidth,
            columnWidths: columnWidths,
            defaultFormatter: defaultFormatter
        });
    }, [columnWidths, columns, defaultFormatter, minColumnWidth, viewportWidth]);
    var _s = __read(useMemo(function () {
        if (!columnMetrics) {
            return [0, 0];
        }
        return getHorizontalRangeToRender({
            columnMetrics: columnMetrics,
            scrollLeft: scrollLeft
        });
    }, [columnMetrics, scrollLeft]), 2), colOverscanStartIdx = _s[0], colOverscanEndIdx = _s[1];
    var viewportColumns = useMemo(function () {
        if (!columnMetrics)
            return [];
        return getViewportColumns(columnMetrics.columns, colOverscanStartIdx, colOverscanEndIdx);
    }, [colOverscanEndIdx, colOverscanStartIdx, columnMetrics]);
    useLayoutEffect(function () {
        // Do not calculate the width if width is provided
        if (width)
            return;
        function onResize() {
            // Immediately re-render when the component is mounted to get valid columnMetrics.
            setGridWidth(gridRef.current.getBoundingClientRect().width);
        }
        onResize();
        window.addEventListener('resize', onResize);
        return function () {
            window.removeEventListener('resize', onResize);
        };
    }, [width]);
    function handleColumnResize(column, width) {
        var _a;
        var newColumnWidths = new Map(columnWidths);
        newColumnWidths.set(column.key, width);
        setColumnWidths(newColumnWidths);
        (_a = props.onColumnResize) === null || _a === void 0 ? void 0 : _a.call(props, column.idx, width);
    }
    function handleScroll(scrollPosition) {
        var _a;
        if (headerRef.current) {
            headerRef.current.scrollLeft = scrollPosition.scrollLeft;
        }
        setScrollLeft(scrollPosition.scrollLeft);
        (_a = props.onScroll) === null || _a === void 0 ? void 0 : _a.call(props, scrollPosition);
    }
    function handleRowUpdate(event) {
        var _a;
        (_a = props.onRowsUpdate) === null || _a === void 0 ? void 0 : _a.call(props, event);
    }
    var rowOffsetHeight = headerRowHeight + (enableFilters ? headerFiltersHeight : 0);
    return (React.createElement("div", { className: "rdg-root", style: { width: width, lineHeight: rowHeight + "px" }, ref: gridRef }, columnMetrics && (React.createElement(React.Fragment, null,
        React.createElement("div", { ref: headerRef, className: "rdg-header" },
            React.createElement(HeaderRow, { rowKey: rowKey, rows: rows, height: headerRowHeight, width: columnMetrics.totalColumnWidth + getScrollbarSize(), columns: viewportColumns, onColumnResize: handleColumnResize, lastFrozenColumnIndex: columnMetrics.lastFrozenColumnIndex, draggableHeaderCell: props.draggableHeaderCell, onHeaderDrop: props.onHeaderDrop, allRowsSelected: (selectedRows === null || selectedRows === void 0 ? void 0 : selectedRows.size) === rows.length, onSelectedRowsChange: onSelectedRowsChange, sortColumn: props.sortColumn, sortDirection: props.sortDirection, onSort: props.onSort, scrollLeft: nonStickyScrollLeft }),
            enableFilters && (React.createElement(FilterRow, { height: headerFiltersHeight, width: columnMetrics.totalColumnWidth + getScrollbarSize(), lastFrozenColumnIndex: columnMetrics.lastFrozenColumnIndex, columns: viewportColumns, scrollLeft: nonStickyScrollLeft, filters: props.filters, onFiltersChange: props.onFiltersChange }))),
        rows.length === 0 && props.emptyRowsView ? createElement(props.emptyRowsView) : (React.createElement(Canvas, { ref: ref, rowKey: rowKey, rowHeight: rowHeight, rowRenderer: props.rowRenderer, rows: rows, selectedRows: selectedRows, onSelectedRowsChange: onSelectedRowsChange, columnMetrics: columnMetrics, viewportColumns: viewportColumns, onScroll: handleScroll, height: height - rowOffsetHeight, rowGroupRenderer: props.rowGroupRenderer, enableCellAutoFocus: enableCellAutoFocus, enableCellCopyPaste: enableCellCopyPaste, enableCellDragAndDrop: enableCellDragAndDrop, cellNavigationMode: cellNavigationMode, scrollLeft: scrollLeft, editorPortalTarget: editorPortalTarget, summaryRows: props.summaryRows, onCheckCellIsEditable: props.onCheckCellIsEditable, onRowsUpdate: handleRowUpdate, onSelectedCellChange: props.onSelectedCellChange, onSelectedCellRangeChange: props.onSelectedCellRangeChange, onRowClick: props.onRowClick, onRowExpandToggle: props.onRowExpandToggle }))))));
}
export default forwardRef(DataGrid);
//# sourceMappingURL=DataGrid.js.map