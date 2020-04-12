var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from 'react';
var SimpleTextEditor = /** @class */ (function (_super) {
    __extends(SimpleTextEditor, _super);
    function SimpleTextEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.input = React.createRef();
        return _this;
    }
    SimpleTextEditor.prototype.getInputNode = function () {
        return this.input.current;
    };
    SimpleTextEditor.prototype.getValue = function () {
        var _a;
        return _a = {},
            _a[this.props.column.key] = this.input.current.value,
            _a;
    };
    SimpleTextEditor.prototype.render = function () {
        return (React.createElement("input", { className: "rdg-text-editor", ref: this.input, defaultValue: this.props.value, onBlur: this.props.onCommit }));
    };
    return SimpleTextEditor;
}(React.Component));
export default SimpleTextEditor;
//# sourceMappingURL=SimpleTextEditor.js.map