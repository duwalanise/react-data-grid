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
import React, { useCallback } from 'react';
import HeaderCell from './HeaderCell';
import { assertIsValidKey } from './utils';
export default function HeaderRow(_a) {
    var height = _a.height, width = _a.width, onSelectedRowsChange = _a.onSelectedRowsChange, rowKey = _a.rowKey, rows = _a.rows, props = __rest(_a, ["height", "width", "onSelectedRowsChange", "rowKey", "rows"]);
    var handleAllRowsSelectionChange = useCallback(function (checked) {
        var e_1, _a;
        if (!onSelectedRowsChange)
            return;
        assertIsValidKey(rowKey);
        var newSelectedRows = new Set();
        if (checked) {
            try {
                for (var rows_1 = __values(rows), rows_1_1 = rows_1.next(); !rows_1_1.done; rows_1_1 = rows_1.next()) {
                    var row = rows_1_1.value;
                    newSelectedRows.add(row[rowKey]);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (rows_1_1 && !rows_1_1.done && (_a = rows_1.return)) _a.call(rows_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        onSelectedRowsChange(newSelectedRows);
    }, [onSelectedRowsChange, rows, rowKey]);
    return (React.createElement("div", { className: "rdg-header-row", style: { width: width, height: height, lineHeight: height + "px" } }, props.columns.map(function (column) {
        return (React.createElement(HeaderCell, { key: column.key, column: column, lastFrozenColumnIndex: props.lastFrozenColumnIndex, height: height, onResize: props.onColumnResize, onHeaderDrop: props.onHeaderDrop, allRowsSelected: props.allRowsSelected, onAllRowsSelectionChange: handleAllRowsSelectionChange, draggableHeaderCell: props.draggableHeaderCell, onSort: props.onSort, sortColumn: props.sortColumn, sortDirection: props.sortDirection, scrollLeft: column.frozen ? props.scrollLeft : undefined }));
    })));
}
//# sourceMappingURL=HeaderRow.js.map