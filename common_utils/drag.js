module.exports = function (t, a) {
    function n(t) {
        const custEvent = new CustomEvent("CustomEvent");
        return custEvent.initCustomEvent(t, !0, !0, null), custEvent.dataTransfer = {
            data: {}, setData: function (t, a) {
                this.data[t] = a
            }, getData: function (t) {
                return this.data[t]
            }
        }, custEvent
    }

    function r(t, a, n) {
        return t.dispatchEvent ? t.dispatchEvent(n) : t.fireEvent ? t.fireEvent("on" + a, n) : void 0
    }

    const e = {DRAG_END: "dragend", DRAG_START: "dragstart", DROP: "drop"};
    const d = n(e.DRAG_START);
    r(t, e.DRAG_START, d);
    const s = n(e.DROP);
    s.dataTransfer = d.dataTransfer, r(a, e.DROP, s);
    const i = n(e.DRAG_END);
    i.dataTransfer = d.dataTransfer, r(t, e.DRAG_END, i)
};