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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { getScrollbarSize } from './domUtils';
export function getColumnMetrics(metrics) {
    var e_1, _a;
    var left = 0;
    var totalWidth = 0;
    var allocatedWidths = 0;
    var unassignedColumnsCount = 0;
    var lastFrozenColumnIndex = -1;
    var columns = [];
    try {
        for (var _b = __values(metrics.columns), _c = _b.next(); !_c.done; _c = _b.next()) {
            var metricsColumn = _c.value;
            var width = getSpecifiedWidth(metricsColumn, metrics.columnWidths, metrics.viewportWidth);
            if (width === undefined) {
                unassignedColumnsCount++;
            }
            else {
                width = clampColumnWidth(width, metricsColumn, metrics.minColumnWidth);
                allocatedWidths += width;
            }
            var column = __assign(__assign({}, metricsColumn), { width: width });
            if (column.frozen) {
                lastFrozenColumnIndex++;
                columns.splice(lastFrozenColumnIndex, 0, column);
            }
            else {
                columns.push(column);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var unallocatedWidth = metrics.viewportWidth - allocatedWidths - getScrollbarSize();
    var unallocatedColumnWidth = Math.max(Math.floor(unallocatedWidth / unassignedColumnsCount), metrics.minColumnWidth);
    var calculatedColumns = columns.map(function (column, idx) {
        var _a, _b;
        // Every column should have a valid width as this stage
        var width = (_a = column.width) !== null && _a !== void 0 ? _a : clampColumnWidth(unallocatedColumnWidth, column, metrics.minColumnWidth);
        var newColumn = __assign(__assign({}, column), { idx: idx,
            width: width,
            left: left, formatter: (_b = column.formatter) !== null && _b !== void 0 ? _b : metrics.defaultFormatter });
        totalWidth += width;
        left += width;
        return newColumn;
    });
    return {
        columns: calculatedColumns,
        lastFrozenColumnIndex: lastFrozenColumnIndex,
        totalColumnWidth: totalWidth,
        viewportWidth: metrics.viewportWidth
    };
}
function getSpecifiedWidth(_a, columnWidths, viewportWidth) {
    var key = _a.key, width = _a.width;
    if (columnWidths.has(key)) {
        // Use the resized width if available
        return columnWidths.get(key);
    }
    if (typeof width === 'number') {
        return width;
    }
    if (typeof width === 'string' && /^\d+%$/.test(width)) {
        return Math.floor(viewportWidth * parseInt(width, 10) / 100);
    }
    return undefined;
}
function clampColumnWidth(width, _a, minColumnWidth) {
    var minWidth = _a.minWidth, maxWidth = _a.maxWidth;
    width = Math.max(width, minWidth !== null && minWidth !== void 0 ? minWidth : minColumnWidth);
    if (typeof maxWidth === 'number') {
        return Math.min(width, maxWidth);
    }
    return width;
}
// Logic extented to allow for functions to be passed down in column.editable
// this allows us to decide whether we can be editing from a cell level
export function canEdit(column, row) {
    if (typeof column.editable === 'function') {
        return column.editable(row);
    }
    return Boolean(column.editor || column.editable);
}
export function getColumnScrollPosition(columns, idx, currentScrollLeft, currentClientWidth) {
    var left = 0;
    var frozen = 0;
    for (var i = 0; i < idx; i++) {
        var column = columns[i];
        if (column) {
            if (column.width) {
                left += column.width;
            }
            if (column.frozen) {
                frozen += column.width;
            }
        }
    }
    var selectedColumn = columns[idx];
    if (selectedColumn) {
        var scrollLeft = left - frozen - currentScrollLeft;
        var scrollRight = left + selectedColumn.width - currentScrollLeft;
        if (scrollLeft < 0) {
            return scrollLeft;
        }
        if (scrollRight > currentClientWidth) {
            return scrollRight - currentClientWidth;
        }
    }
    return 0;
}
//# sourceMappingURL=columnUtils.js.map