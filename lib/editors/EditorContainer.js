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
import React, { useRef, useState, useLayoutEffect, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { Clear } from '@material-ui/icons';
import SimpleTextEditor from './SimpleTextEditor';
import ClickOutside from './ClickOutside';
import { preventDefault } from '../utils';
export default function EditorContainer(_a) {
    var rowIdx = _a.rowIdx, column = _a.column, row = _a.row, width = _a.width, height = _a.height, left = _a.left, top = _a.top, onCommit = _a.onCommit, onCommitCancel = _a.onCommitCancel, scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop, key = _a.firstEditorKeyPress;
    var editorRef = useRef(null);
    var changeCommitted = useRef(false);
    var changeCanceled = useRef(false);
    var _b = __read(useState(true), 2), isValid = _b[0], setValid = _b[1];
    var prevScrollLeft = useRef(scrollLeft);
    var prevScrollTop = useRef(scrollTop);
    var isUnmounting = useRef(false);
    var getInputNode = useCallback(function () { var _a; return (_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.getInputNode(); }, []);
    var commitCancel = useCallback(function () {
        changeCanceled.current = true;
        onCommitCancel();
    }, [onCommitCancel]);
    useLayoutEffect(function () {
        var inputNode = getInputNode();
        if (inputNode instanceof HTMLElement) {
            inputNode.focus();
        }
        if (inputNode instanceof HTMLInputElement) {
            inputNode.select();
        }
    }, [getInputNode]);
    // close editor when scrolling
    useEffect(function () {
        if (scrollLeft !== prevScrollLeft.current || scrollTop !== prevScrollTop.current) {
            commitCancel();
        }
    }, [commitCancel, scrollLeft, scrollTop]);
    useEffect(function () { return function () {
        isUnmounting.current = true;
    }; }, []);
    // commit changes when editor is closed
    useEffect(function () { return function () {
        if (isUnmounting.current && !changeCommitted.current && !changeCanceled.current) {
            commit();
        }
    }; });
    function getInitialValue() {
        var value = row[column.key];
        if (key === 'Delete' || key === 'Backspace') {
            return '';
        }
        if (key === 'Enter') {
            return value;
        }
        return key || value;
    }
    function isCaretAtBeginningOfInput() {
        var inputNode = getInputNode();
        return inputNode instanceof HTMLInputElement
            && inputNode.selectionEnd === 0;
    }
    function isCaretAtEndOfInput() {
        var inputNode = getInputNode();
        return inputNode instanceof HTMLInputElement
            && inputNode.selectionStart === inputNode.value.length;
    }
    function editorHasResults() {
        var _a, _b, _c;
        return (_c = (_b = (_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.hasResults) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : false;
    }
    function editorIsSelectOpen() {
        var _a, _b, _c;
        return (_c = (_b = (_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.isSelectOpen) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : false;
    }
    function isNewValueValid(value) {
        var _a, _b;
        var isValid = (_b = (_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.validate) === null || _b === void 0 ? void 0 : _b.call(_a, value);
        if (typeof isValid === 'boolean') {
            setValid(isValid);
            return isValid;
        }
        return true;
    }
    function preventDefaultNavigation(key) {
        return (key === 'ArrowLeft' && !isCaretAtBeginningOfInput())
            || (key === 'ArrowRight' && !isCaretAtEndOfInput())
            || (key === 'Escape' && editorIsSelectOpen())
            || (['ArrowUp', 'ArrowDown'].includes(key) && editorHasResults());
    }
    function commit() {
        if (!editorRef.current)
            return;
        var updated = editorRef.current.getValue();
        if (isNewValueValid(updated)) {
            changeCommitted.current = true;
            var cellKey = column.key;
            onCommit({ cellKey: cellKey, rowIdx: rowIdx, updated: updated });
        }
    }
    function onKeyDown(e) {
        if (preventDefaultNavigation(e.key)) {
            e.stopPropagation();
        }
        else if (['Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            commit();
        }
        else if (e.key === 'Escape') {
            commitCancel();
        }
    }
    function createEditor() {
        // return custom column editor or SimpleEditor if none specified
        if (column.editor) {
            return (React.createElement(column.editor, { ref: editorRef, column: column, value: getInitialValue(), row: row, height: height, onCommit: commit, onCommitCancel: commitCancel, onOverrideKeyDown: onKeyDown }));
        }
        return (React.createElement(SimpleTextEditor, { ref: editorRef, column: column, value: getInitialValue(), onCommit: commit }));
    }
    var className = classNames('rdg-editor-container', {
        'has-error': !isValid
    });
    return (React.createElement(ClickOutside, { onClickOutside: commit },
        React.createElement("div", { className: className, style: { height: height, width: width, left: left, top: top }, onKeyDown: onKeyDown, onContextMenu: preventDefault },
            createEditor(),
            !isValid && React.createElement(Clear, null))));
}
//# sourceMappingURL=EditorContainer.js.map