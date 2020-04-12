import classNames from 'classnames';
import React, { memo } from 'react';
import SummaryCell from './SummaryCell';
function SummaryRow(_a) {
    var height = _a.height, rowIdx = _a.rowIdx, lastFrozenColumnIndex = _a.lastFrozenColumnIndex, row = _a.row, scrollLeft = _a.scrollLeft, viewportColumns = _a.viewportColumns, width = _a.width;
    return (React.createElement("div", { className: classNames('rdg-row', "rdg-row-" + (rowIdx % 2 === 0 ? 'even' : 'odd'), 'rdg-summary-row'), style: { width: width, height: height } }, viewportColumns.map(function (column) { return (React.createElement(SummaryCell, { key: column.key, column: column, lastFrozenColumnIndex: lastFrozenColumnIndex, row: row, scrollLeft: column.frozen && typeof scrollLeft === 'number' ? scrollLeft : undefined })); })));
}
export default memo(SummaryRow);
//# sourceMappingURL=SummaryRow.js.map