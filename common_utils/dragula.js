module.exports = function (e, n) {
    function t(e, n, t) {
        const o = t || {}, c = document.createEvent("Event");
        c.initEvent(n, !0, !0), Object.keys(o).forEach(function (e) {
            c[e] = o[e]
        }), e.dispatchEvent(c), e.addEventListener(n, console.log("Did a " + n))
    }

    t(e, "mousedown", {which: 1}), t(e, "mousemove", {which: 1})
};;