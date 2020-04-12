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
import { useState, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
export default function EditorPortal(_a) {
    var target = _a.target, children = _a.children;
    // Keep track of when the modal element is added to the DOM
    var _b = __read(useState(false), 2), isMounted = _b[0], setIsMounted = _b[1];
    useLayoutEffect(function () {
        setIsMounted(true);
    }, []);
    // Don't render the portal until the component has mounted,
    // So the portal can safely access the DOM.
    if (!isMounted) {
        return null;
    }
    return ReactDOM.createPortal(children, target);
}
//# sourceMappingURL=EditorPortal.js.map