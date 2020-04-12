import React from 'react';
export function SimpleCellFormatter(_a) {
    var row = _a.row, column = _a.column;
    var value = row[column.key];
    return React.createElement("span", { title: String(value) }, value);
}
//# sourceMappingURL=SimpleCellFormatter.js.map