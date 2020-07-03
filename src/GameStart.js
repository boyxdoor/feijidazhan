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
var GameStart = /** @class */ (function (_super) {
    __extends(GameStart, _super);
    function GameStart() {
        var _this = _super.call(this) || this;
        _this.btn_start.visible = false;
        Laya.loader.load("res/atlas/gameRole.atlas", Handler.create(_this, _this.onComplete));
        _this.once(Laya.Event.CLOSE, _this, _this.onClose);
        return _this;
    }
    GameStart.prototype.onClose = function () {
        this.removeSelf();
        this.destroy();
    };
    GameStart.prototype.onComplete = function () {
        this.loading.text = "资源加载完成，开始游戏吧...";
        this.btn_start.visible = true;
        Laya.Tween.from(this.btn_start, { y: this.btn_start.y + 20 }, 1000, Laya.Ease.elasticOut);
    };
    GameStart.prototype.onProgress = function (loadNum) {
        this.loading.text = "资源加载中，当前进度：" + loadNum * 100 + "%";
    };
    return GameStart;
}(ui.GameStartUI));
//# sourceMappingURL=GameStart.js.map