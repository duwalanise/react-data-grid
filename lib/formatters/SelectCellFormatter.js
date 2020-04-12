import React from 'react';
import classNames from 'classnames';
export function SelectCellFormatter(_a) {
    var value = _a.value, _b = _a.disabled, disabled = _b === void 0 ? false : _b, onChange = _a.onChange;
    function handleChange(e) {
        onChange(e.target.checked, e.nativeEvent.shiftKey);
    }
    return (React.createElement("label", { className: classNames('rdg-checkbox-label', { 'rdg-checkbox-label-disabled': disabled }) },
        React.createElement("input", { type: "checkbox", className: "rdg-checkbox-input", disabled: disabled, onChange: handleChange, checked: value }),
        React.createElement("div", { className: "rdg-checkbox" })));
}
//# sourceMappingURL=SelectCellFormatter.js.map