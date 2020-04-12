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
import React, { cloneElement } from 'react';
export default function ResizableHeaderCell(_a) {
    var children = _a.children, column = _a.column, props = __rest(_a, ["children", "column"]);
    function onMouseDown(event) {
        if (event.button !== 0) {
            return;
        }
        var currentTarget = event.currentTarget;
        var right = currentTarget.getBoundingClientRect().right;
        var offset = right - event.clientX;
        if (offset > 11) { // +1px to account for the border size
            return;
        }
        var onMouseMove = function (event) {
            onResize(event.clientX + offset, currentTarget);
        };
        var onMouseUp = function () {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
        event.preventDefault();
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }
    function onTouchStart(event) {
        var touch = event.changedTouches[0];
        var identifier = touch.identifier;
        var currentTarget = event.currentTarget;
        var right = currentTarget.getBoundingClientRect().right;
        var offset = right - touch.clientX;
        if (offset > 11) { // +1px to account for the border size
            return;
        }
        function getTouch(event) {
            var e_1, _a;
            try {
                for (var _b = __values(event.changedTouches), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var touch_1 = _c.value;
                    if (touch_1.identifier === identifier)
                        return touch_1;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return null;
        }
        var onTouchMove = function (event) {
            var touch = getTouch(event);
            if (touch) {
                onResize(touch.clientX + offset, currentTarget);
            }
        };
        var onTouchEnd = function (event) {
            var touch = getTouch(event);
            if (!touch)
                return;
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
        };
        window.addEventListener('touchmove', onTouchMove);
        window.addEventListener('touchend', onTouchEnd);
    }
    function onResize(x, target) {
        var width = x - target.getBoundingClientRect().left;
        if (width > 0) {
            props.onResize(column, width);
        }
    }
    return cloneElement(children, {
        onMouseDown: onMouseDown,
        onTouchStart: onTouchStart,
        children: (React.createElement(React.Fragment, null,
            children.props.children,
            React.createElement("div", { className: "rdg-header-cell-resizer" })))
    });
}
//# sourceMappingURL=ResizableHeaderCell.js.map