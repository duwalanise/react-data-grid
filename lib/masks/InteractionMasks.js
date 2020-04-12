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
import React, { useState, useRef, useEffect, useCallback } from 'react';
// Components
import CellMask from './CellMask';
import DragMask from './DragMask';
import EditorContainer from '../editors/EditorContainer';
import EditorPortal from '../editors/EditorPortal';
import { legacyCellInput } from '../editors/CellInputHandlers';
// Utils
import { isCtrlKeyHeldDown, getSelectedDimensions as getDimensions, getNextSelectedCellPosition, canExitGrid, isSelectedCellEditable } from '../utils';
import { UpdateActions, CellNavigationMode } from '../common/enums';
export default function InteractionMasks(_a) {
    var columns = _a.columns, rows = _a.rows, rowHeight = _a.rowHeight, eventBus = _a.eventBus, enableCellAutoFocus = _a.enableCellAutoFocus, enableCellCopyPaste = _a.enableCellCopyPaste, enableCellDragAndDrop = _a.enableCellDragAndDrop, editorPortalTarget = _a.editorPortalTarget, cellNavigationMode = _a.cellNavigationMode, canvasRef = _a.canvasRef, scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop, onSelectedCellChange = _a.onSelectedCellChange, onCheckCellIsEditable = _a.onCheckCellIsEditable, onRowsUpdate = _a.onRowsUpdate, scrollToCell = _a.scrollToCell;
    var _b = __read(useState(function () {
        if (enableCellAutoFocus && document.activeElement === document.body && columns.length > 0 && rows.length > 0) {
            return { idx: 0, rowIdx: 0, status: 'SELECT' };
        }
        return { idx: -1, rowIdx: -1, status: 'SELECT' };
    }), 2), selectedPosition = _b[0], setSelectedPosition = _b[1];
    var _c = __read(useState(null), 2), copiedPosition = _c[0], setCopiedPosition = _c[1];
    var _d = __read(useState(null), 2), draggedPosition = _d[0], setDraggedPosition = _d[1];
    var selectionMaskRef = useRef(null);
    // Focus on the selection mask when the selected position is changed or the editor is closed
    useEffect(function () {
        var _a;
        if (selectedPosition.rowIdx === -1 || selectedPosition.idx === -1 || selectedPosition.status === 'EDIT')
            return;
        (_a = selectionMaskRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, [selectedPosition]);
    useEffect(function () {
        return eventBus.subscribe('SELECT_CELL', selectCell);
    });
    useEffect(function () {
        if (draggedPosition === null)
            return;
        var handleDragEnter = function (overRowIdx) {
            setDraggedPosition(__assign(__assign({}, draggedPosition), { overRowIdx: overRowIdx }));
        };
        return eventBus.subscribe('DRAG_ENTER', handleDragEnter);
    }, [draggedPosition, eventBus]);
    var closeEditor = useCallback(function () {
        setSelectedPosition(function (_a) {
            var idx = _a.idx, rowIdx = _a.rowIdx;
            return ({ idx: idx, rowIdx: rowIdx, status: 'SELECT' });
        });
    }, []);
    // Reset the positions if the current values are no longer valid. This can happen if a column or row is removed
    if (selectedPosition.idx > columns.length || selectedPosition.rowIdx > rows.length) {
        setSelectedPosition({ idx: -1, rowIdx: -1, status: 'SELECT' });
        setCopiedPosition(null);
        setDraggedPosition(null);
    }
    function getEditorPosition() {
        if (!canvasRef.current)
            return null;
        var _a = canvasRef.current.getBoundingClientRect(), left = _a.left, top = _a.top;
        var _b = document.scrollingElement || document.documentElement, docTop = _b.scrollTop, docLeft = _b.scrollLeft;
        var column = columns[selectedPosition.idx];
        return {
            left: left + docLeft + column.left - (column.frozen ? 0 : scrollLeft),
            top: top + docTop + selectedPosition.rowIdx * rowHeight - scrollTop
        };
    }
    function getNextPosition(key, mode, shiftKey) {
        if (mode === void 0) { mode = cellNavigationMode; }
        if (shiftKey === void 0) { shiftKey = false; }
        var idx = selectedPosition.idx, rowIdx = selectedPosition.rowIdx;
        var nextPosition;
        switch (key) {
            case 'ArrowUp':
                nextPosition = { idx: idx, rowIdx: rowIdx - 1 };
                break;
            case 'ArrowDown':
                nextPosition = { idx: idx, rowIdx: rowIdx + 1 };
                break;
            case 'ArrowLeft':
                nextPosition = { idx: idx - 1, rowIdx: rowIdx };
                break;
            case 'ArrowRight':
                nextPosition = { idx: idx + 1, rowIdx: rowIdx };
                break;
            case 'Tab':
                nextPosition = { idx: idx + (shiftKey ? -1 : 1), rowIdx: rowIdx };
                break;
            default:
                nextPosition = { idx: idx, rowIdx: rowIdx };
                break;
        }
        return getNextSelectedCellPosition({
            columns: columns,
            rowsCount: rows.length,
            cellNavigationMode: mode,
            nextPosition: nextPosition
        });
    }
    function onKeyDown(event) {
        var _a;
        var column = columns[selectedPosition.idx];
        var row = rows[selectedPosition.rowIdx];
        var isActivatedByUser = ((_a = column.unsafe_onCellInput) !== null && _a !== void 0 ? _a : legacyCellInput)(event, row) === true;
        var key = event.key;
        if (enableCellCopyPaste && isCtrlKeyHeldDown(event)) {
            // event.key may be uppercase `C` or `V`
            var lowerCaseKey = event.key.toLowerCase();
            if (lowerCaseKey === 'c')
                return handleCopy();
            if (lowerCaseKey === 'v')
                return handlePaste();
        }
        var canOpenEditor = selectedPosition.status === 'SELECT' && isCellEditable(selectedPosition);
        switch (key) {
            case 'Enter':
                if (canOpenEditor) {
                    setSelectedPosition(function (_a) {
                        var idx = _a.idx, rowIdx = _a.rowIdx;
                        return ({ idx: idx, rowIdx: rowIdx, status: 'EDIT', key: 'Enter' });
                    });
                }
                else if (selectedPosition.status === 'EDIT') {
                    setSelectedPosition(function (_a) {
                        var idx = _a.idx, rowIdx = _a.rowIdx;
                        return ({ idx: idx, rowIdx: rowIdx, status: 'SELECT' });
                    });
                }
                break;
            case 'Escape':
                closeEditor();
                setCopiedPosition(null);
                break;
            case 'Tab':
                onPressTab(event);
                break;
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight':
                event.preventDefault();
                selectCell(getNextPosition(key));
                break;
            default:
                if (canOpenEditor && isActivatedByUser) {
                    setSelectedPosition(function (_a) {
                        var idx = _a.idx, rowIdx = _a.rowIdx;
                        return ({ idx: idx, rowIdx: rowIdx, status: 'EDIT', key: key });
                    });
                }
                break;
        }
    }
    function onPressTab(e) {
        // If we are in a position to leave the grid, stop editing but stay in that cell
        if (canExitGrid(e, { cellNavigationMode: cellNavigationMode, columns: columns, rowsCount: rows.length, selectedPosition: selectedPosition })) {
            if (selectedPosition.status === 'EDIT') {
                closeEditor();
                return;
            }
            // Reset the selected position before exiting
            setSelectedPosition({ idx: -1, rowIdx: -1, status: 'SELECT' });
            return;
        }
        e.preventDefault();
        var tabCellNavigationMode = cellNavigationMode === CellNavigationMode.NONE
            ? CellNavigationMode.CHANGE_ROW
            : cellNavigationMode;
        var nextPosition = getNextPosition('Tab', tabCellNavigationMode, e.shiftKey);
        selectCell(nextPosition);
    }
    function handleCopy() {
        var idx = selectedPosition.idx, rowIdx = selectedPosition.rowIdx;
        var value = rows[rowIdx][columns[idx].key];
        setCopiedPosition({ idx: idx, rowIdx: rowIdx, value: value });
    }
    function handlePaste() {
        var _a;
        if (copiedPosition === null || !isCellEditable(selectedPosition)) {
            return;
        }
        var toRow = selectedPosition.rowIdx;
        var cellKey = columns[selectedPosition.idx].key;
        var fromRow = copiedPosition.rowIdx, idx = copiedPosition.idx, value = copiedPosition.value;
        var fromCellKey = columns[idx].key;
        onRowsUpdate({
            cellKey: cellKey,
            fromRow: fromRow,
            toRow: toRow,
            updated: (_a = {}, _a[cellKey] = value, _a),
            action: UpdateActions.COPY_PASTE,
            fromCellKey: fromCellKey
        });
    }
    function isCellWithinBounds(_a) {
        var idx = _a.idx, rowIdx = _a.rowIdx;
        return rowIdx >= 0 && rowIdx < rows.length && idx >= 0 && idx < columns.length;
    }
    function isCellEditable(position) {
        return isCellWithinBounds(position)
            && isSelectedCellEditable({ columns: columns, rows: rows, selectedPosition: position, onCheckCellIsEditable: onCheckCellIsEditable });
    }
    function selectCell(position, enableEditor) {
        if (enableEditor === void 0) { enableEditor = false; }
        if (!isCellWithinBounds(position))
            return;
        if (enableEditor && isCellEditable(position)) {
            setSelectedPosition(__assign(__assign({}, position), { status: 'EDIT', key: null }));
        }
        else {
            setSelectedPosition(__assign(__assign({}, position), { status: 'SELECT' }));
        }
        scrollToCell(position);
        onSelectedCellChange === null || onSelectedCellChange === void 0 ? void 0 : onSelectedCellChange(__assign({}, position));
    }
    function isDragEnabled() {
        return enableCellDragAndDrop && isCellEditable(selectedPosition);
    }
    function handleDragStart(e) {
        e.dataTransfer.effectAllowed = 'copy';
        // Setting data is required to make an element draggable in FF
        var transferData = JSON.stringify(selectedPosition);
        try {
            e.dataTransfer.setData('text/plain', transferData);
        }
        catch (ex) {
            // IE only supports 'text' and 'URL' for the 'type' argument
            e.dataTransfer.setData('text', transferData);
        }
        setDraggedPosition(__assign(__assign({}, selectedPosition), { overRowIdx: selectedPosition.rowIdx }));
    }
    function handleDragEnd() {
        var _a;
        if (draggedPosition === null)
            return;
        var rowIdx = draggedPosition.rowIdx, overRowIdx = draggedPosition.overRowIdx;
        var column = columns[draggedPosition.idx];
        var cellKey = column.key;
        var value = rows[rowIdx][cellKey];
        onRowsUpdate({
            cellKey: cellKey,
            fromRow: rowIdx,
            toRow: overRowIdx,
            updated: (_a = {}, _a[cellKey] = value, _a),
            action: UpdateActions.CELL_DRAG
        });
        setDraggedPosition(null);
    }
    function onDragHandleDoubleClick() {
        var _a;
        var column = columns[selectedPosition.idx];
        var cellKey = column.key;
        var value = rows[selectedPosition.rowIdx][cellKey];
        onRowsUpdate({
            cellKey: cellKey,
            fromRow: selectedPosition.rowIdx,
            toRow: rows.length - 1,
            updated: (_a = {}, _a[cellKey] = value, _a),
            action: UpdateActions.COLUMN_FILL
        });
    }
    function onCommit(_a) {
        var cellKey = _a.cellKey, rowIdx = _a.rowIdx, updated = _a.updated;
        onRowsUpdate({
            cellKey: cellKey,
            fromRow: rowIdx,
            toRow: rowIdx,
            updated: updated,
            action: UpdateActions.CELL_UPDATE
        });
        closeEditor();
    }
    function getSelectedDimensions(selectedPosition) {
        var top = rowHeight * selectedPosition.rowIdx;
        var dimension = getDimensions({ selectedPosition: selectedPosition, columns: columns, scrollLeft: scrollLeft, rowHeight: rowHeight });
        dimension.top = top;
        return dimension;
    }
    return (React.createElement("div", { onKeyDown: onKeyDown },
        copiedPosition && isCellWithinBounds(copiedPosition) && (React.createElement(CellMask, __assign({ className: "rdg-cell-copied" }, getSelectedDimensions(copiedPosition)))),
        draggedPosition && isCellWithinBounds(draggedPosition) && (React.createElement(DragMask, { draggedPosition: draggedPosition, getSelectedDimensions: getSelectedDimensions })),
        selectedPosition.status === 'SELECT' && isCellWithinBounds(selectedPosition) && (React.createElement(CellMask, __assign({ className: "rdg-selected", tabIndex: 0, ref: selectionMaskRef }, getSelectedDimensions(selectedPosition)), isDragEnabled() && (React.createElement("div", { className: "drag-handle", draggable: true, onDragStart: handleDragStart, onDragEnd: handleDragEnd, onDoubleClick: onDragHandleDoubleClick })))),
        selectedPosition.status === 'EDIT' && isCellWithinBounds(selectedPosition) && (React.createElement(EditorPortal, { target: editorPortalTarget },
            React.createElement(EditorContainer, __assign({ firstEditorKeyPress: selectedPosition.key, onCommit: onCommit, onCommitCancel: closeEditor, rowIdx: selectedPosition.rowIdx, row: rows[selectedPosition.rowIdx], column: columns[selectedPosition.idx], scrollLeft: scrollLeft, scrollTop: scrollTop }, getSelectedDimensions(selectedPosition), getEditorPosition()))))));
}
//# sourceMappingURL=InteractionMasks.js.map