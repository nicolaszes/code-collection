/**
 * 双向绑定
 */
Object.defineProperty(CustomHTMLElement.prototype, "html", {
    enumerable: false,
    configurable: true,
    get: function() {
        return this.element.innerHTML;
    },
    set: function(value) {
        this.element.innerHTML = value;
    }
});
