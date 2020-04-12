import React from 'react';
import { SelectCellFormatter } from './formatters';
// TODO: fix type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export var SelectColumn = {
    key: 'select-row',
    name: '',
    width: 35,
    maxWidth: 35,
    frozen: true,
    headerRenderer: function (props) {
        return (React.createElement(SelectCellFormatter, { value: props.allRowsSelected, onChange: props.onAllRowsSelectionChange }));
    },
    formatter: function (props) {
        return (React.createElement(SelectCellFormatter, { value: props.isRowSelected, onChange: props.onRowSelectionChange }));
    }
};
//# sourceMappingURL=Columns.js.map