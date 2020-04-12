function getTotalFrozenColumnWidth(columns, lastFrozenColumnIndex) {
    if (lastFrozenColumnIndex === -1) {
        return 0;
    }
    var lastFrozenColumn = columns[lastFrozenColumnIndex];
    return lastFrozenColumn.left + lastFrozenColumn.width;
}
var RENDER_BACTCH_SIZE = 8;
export function getVerticalRangeToRender(height, rowHeight, scrollTop, rowsCount) {
    var overscanThreshold = 4;
    var rowVisibleStartIdx = Math.floor(scrollTop / rowHeight);
    var rowVisibleEndIdx = Math.min(rowsCount - 1, Math.floor((scrollTop + height) / rowHeight));
    var rowOverscanStartIdx = Math.max(0, Math.floor((rowVisibleStartIdx - overscanThreshold) / RENDER_BACTCH_SIZE) * RENDER_BACTCH_SIZE);
    var rowOverscanEndIdx = Math.min(rowsCount - 1, Math.ceil((rowVisibleEndIdx + overscanThreshold) / RENDER_BACTCH_SIZE) * RENDER_BACTCH_SIZE);
    return [rowOverscanStartIdx, rowOverscanEndIdx];
}
export function getHorizontalRangeToRender(_a) {
    var columnMetrics = _a.columnMetrics, scrollLeft = _a.scrollLeft;
    var columns = columnMetrics.columns, lastFrozenColumnIndex = columnMetrics.lastFrozenColumnIndex, viewportWidth = columnMetrics.viewportWidth;
    // get the viewport's left side and right side positions for non-frozen columns
    var totalFrozenColumnWidth = getTotalFrozenColumnWidth(columns, lastFrozenColumnIndex);
    var viewportLeft = scrollLeft + totalFrozenColumnWidth;
    var viewportRight = scrollLeft + viewportWidth;
    // get first and last non-frozen column indexes
    var lastColIdx = columns.length - 1;
    var firstUnfrozenColumnIdx = Math.min(lastFrozenColumnIndex + 1, lastColIdx);
    // skip rendering non-frozen columns if the frozen columns cover the entire viewport
    if (viewportLeft >= viewportRight) {
        return [firstUnfrozenColumnIdx, firstUnfrozenColumnIdx];
    }
    // get the first visible non-frozen column index
    var colVisibleStartIdx = firstUnfrozenColumnIdx;
    while (colVisibleStartIdx < lastColIdx) {
        var _b = columns[colVisibleStartIdx], left = _b.left, width = _b.width;
        // if the right side of the columnn is beyond the left side of the available viewport,
        // then it is the first column that's at least partially visible
        if (left + width > viewportLeft) {
            break;
        }
        colVisibleStartIdx++;
    }
    // get the last visible non-frozen column index
    var colVisibleEndIdx = colVisibleStartIdx;
    while (colVisibleEndIdx < lastColIdx) {
        var _c = columns[colVisibleEndIdx], left = _c.left, width = _c.width;
        // if the right side of the column is beyond or equal to the right side of the available viewport,
        // then it the last column that's at least partially visible, as the previous column's right side is not beyond the viewport.
        if (left + width >= viewportRight) {
            break;
        }
        colVisibleEndIdx++;
    }
    var colOverscanStartIdx = Math.max(firstUnfrozenColumnIdx, colVisibleStartIdx - 1);
    var colOverscanEndIdx = Math.min(lastColIdx, colVisibleEndIdx + 1);
    return [colOverscanStartIdx, colOverscanEndIdx];
}
export function getViewportColumns(columns, colOverscanStartIdx, colOverscanEndIdx) {
    var viewportColumns = [];
    for (var colIdx = 0; colIdx <= colOverscanEndIdx; colIdx++) {
        var column = columns[colIdx];
        if (colIdx < colOverscanStartIdx && !column.frozen)
            continue;
        viewportColumns.push(column);
    }
    return viewportColumns;
}
//# sourceMappingURL=viewportUtils.js.map