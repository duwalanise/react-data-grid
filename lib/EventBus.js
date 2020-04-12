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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var EventBus = /** @class */ (function () {
    function EventBus() {
        this.subscribers = new Map();
    }
    EventBus.prototype.subscribe = function (type, handler) {
        if (!this.subscribers.has(type)) {
            this.subscribers.set(type, new Set());
        }
        var handlers = this.subscribers.get(type);
        handlers.add(handler);
        return function () {
            handlers.delete(handler);
        };
    };
    EventBus.prototype.dispatch = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var handlers = this.subscribers.get(type);
        if (handlers) {
            // handler needed a type assertion to fix type bug
            handlers.forEach(function (handler) { return handler.apply(void 0, __spread(args)); });
        }
    };
    return EventBus;
}());
export default EventBus;
//# sourceMappingURL=EventBus.js.map