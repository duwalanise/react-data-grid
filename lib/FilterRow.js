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
import React, { createElement } from 'react';
import classNames from 'classnames';
export default function FilterRow(_a) {
    var height = _a.height, width = _a.width, columns = _a.columns, lastFrozenColumnIndex = _a.lastFrozenColumnIndex, scrollLeft = _a.scrollLeft, filters = _a.filters, onFiltersChange = _a.onFiltersChange;
    function onChange(key, value) {
        var newFilters = __assign({}, filters);
        newFilters[key] = value;
        onFiltersChange === null || onFiltersChange === void 0 ? void 0 : onFiltersChange(newFilters);
    }
    return (React.createElement("div", { className: "rdg-header-row", style: { width: width, height: height, lineHeight: height + "px" } }, columns.map(function (column) {
        var key = column.key;
        var className = classNames('rdg-cell', {
            'rdg-cell-frozen': column.frozen,
            'rdg-cell-frozen-last': column.idx === lastFrozenColumnIndex
        });
        var style = {
            width: column.width,
            left: column.left
        };
        if (column.frozen && typeof scrollLeft === 'number') {
            style.transform = "translateX(" + scrollLeft + "px)";
        }
        return (React.createElement("div", { key: key, style: style, className: className }, column.filterRenderer && createElement(column.filterRenderer, {
            column: column,
            value: filters === null || filters === void 0 ? void 0 : filters[column.key],
            onChange: function (value) { return onChange(key, value); }
        })));
    })));
}
//# sourceMappingURL=FilterRow.js.map