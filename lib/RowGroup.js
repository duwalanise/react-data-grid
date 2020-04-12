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
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from 'react';
export default forwardRef(function RowGroup(props, ref) {
    function onRowExpandToggle(expand) {
        var onRowExpandToggle = props.onRowExpandToggle;
        if (onRowExpandToggle) {
            var shouldExpand = expand == null ? !props.isExpanded : expand;
            onRowExpandToggle({ rowIdx: props.rowIdx, shouldExpand: shouldExpand, columnGroupName: props.columnGroupName, name: props.name });
        }
    }
    function onRowExpandClick() {
        onRowExpandToggle(!props.isExpanded);
    }
    function onClick() {
        props.eventBus.dispatch('SELECT_CELL', { rowIdx: props.rowIdx, idx: 0 });
    }
    var Renderer = props.renderer || DefaultBase;
    return (React.createElement("div", { className: "rdg-row-group", onClick: onClick },
        React.createElement(Renderer, __assign({}, props, { ref: ref, onRowExpandClick: onRowExpandClick, onRowExpandToggle: onRowExpandToggle }))));
});
var DefaultBase = forwardRef(function DefaultBase(props, ref) {
    function onKeyDown(_a) {
        var key = _a.key;
        var onRowExpandToggle = props.onRowExpandToggle;
        if (key === 'ArrowLeft') {
            onRowExpandToggle(false);
        }
        if (key === 'ArrowRight') {
            onRowExpandToggle(true);
        }
        if (key === 'Enter') {
            onRowExpandToggle(!props.isExpanded);
        }
    }
    var _a = props.treeDepth, treeDepth = _a === void 0 ? 0 : _a, height = props.height, onRowExpandClick = props.onRowExpandClick, isExpanded = props.isExpanded, columnGroupDisplayName = props.columnGroupDisplayName, name = props.name;
    var marginLeft = treeDepth * 20;
    return (React.createElement("div", { className: "rdg-row-default-group", style: { height: height }, onKeyDown: onKeyDown, tabIndex: 0, ref: ref },
        React.createElement("span", { className: "rdg-row-expand-icon", style: { marginLeft: marginLeft }, onClick: onRowExpandClick }, isExpanded ? String.fromCharCode(9660) : String.fromCharCode(9658)),
        React.createElement("strong", null,
            columnGroupDisplayName,
            ": ",
            name)));
});
//# sourceMappingURL=RowGroup.js.map