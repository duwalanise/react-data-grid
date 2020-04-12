import React, { memo } from 'react';
import classNames from 'classnames';
function SummaryCell(_a) {
    var column = _a.column, lastFrozenColumnIndex = _a.lastFrozenColumnIndex, row = _a.row, scrollLeft = _a.scrollLeft;
    var SummaryFormatter = column.summaryFormatter, width = column.width, left = column.left, summaryCellClass = column.summaryCellClass;
    var className = classNames('rdg-cell', {
        'rdg-cell-frozen': column.frozen,
        'rdg-cell-frozen-last': column.idx === lastFrozenColumnIndex
    }, typeof summaryCellClass === 'function' ? summaryCellClass(row) : summaryCellClass);
    var style = { width: width, left: left };
    if (scrollLeft !== undefined) {
        style.transform = "translateX(" + scrollLeft + "px)";
    }
    return (React.createElement("div", { className: className, style: style }, SummaryFormatter && React.createElement(SummaryFormatter, { column: column, row: row })));
}
export default memo(SummaryCell);
//# sourceMappingURL=SummaryCell.js.map