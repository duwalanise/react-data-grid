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
import React, { memo } from 'react';
import Row from './Row';
import RowGroup from './RowGroup';
function RowRenderer(_a) {
    var columnMetrics = _a.columnMetrics, viewportColumns = _a.viewportColumns, eventBus = _a.eventBus, rowIdx = _a.rowIdx, row = _a.row, rowGroupRenderer = _a.rowGroupRenderer, rowHeight = _a.rowHeight, rowRenderer = _a.rowRenderer, scrollLeft = _a.scrollLeft, props = __rest(_a, ["columnMetrics", "viewportColumns", "eventBus", "rowIdx", "row", "rowGroupRenderer", "rowHeight", "rowRenderer", "scrollLeft"]);
    var __metaData = row.__metaData;
    var rendererProps = {
        rowIdx: rowIdx,
        row: row,
        width: columnMetrics.totalColumnWidth,
        height: rowHeight,
        viewportColumns: viewportColumns,
        isRowSelected: props.isRowSelected,
        lastFrozenColumnIndex: columnMetrics.lastFrozenColumnIndex,
        scrollLeft: scrollLeft,
        eventBus: eventBus,
        onRowClick: props.onRowClick,
        enableCellRangeSelection: props.enableCellRangeSelection
    };
    if (__metaData) {
        if (__metaData.getRowRenderer) {
            return __metaData.getRowRenderer(rendererProps, rowIdx);
        }
        if (__metaData.isGroup) {
            return (React.createElement(RowGroup, __assign({}, rendererProps, __metaData, { name: row.name, eventBus: eventBus, renderer: rowGroupRenderer, onRowExpandToggle: props.onRowExpandToggle })));
        }
    }
    return React.createElement(rowRenderer || Row, rendererProps);
}
export default memo(RowRenderer);
//# sourceMappingURL=RowRenderer.js.map