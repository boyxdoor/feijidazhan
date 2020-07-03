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
var GamePlay = /** @class */ (function (_super) {
    __extends(GamePlay, _super);
    function GamePlay() {
        var _this = _super.call(this) || this;
        _this.btn_pause.on(Laya.Event.MOUSE_DOWN, _this, _this.onPause);
        _this.pauseBox.visible = false;
        return _this;
    }
    GamePlay.prototype.onPause = function () {
        this.pauseBox.visible = true;
        this.btn_continue.once(Laya.Event.MOUSE_DOWN, this, this.onContinue);
        Laya.timer.scale = 0;
    };
    GamePlay.prototype.onContinue = function () {
        this.pauseBox.visible = false;
        Laya.timer.scale = 1;
    };
    GamePlay.prototype.update = function (hp, level, score) {
        this.hp.text = hp.toString();
        this.level.text = level.toString();
        this.score.text = score.toString();
    };
    return GamePlay;
}(ui.GamePlayUI));
//# sourceMappingURL=GamePlay.js.map