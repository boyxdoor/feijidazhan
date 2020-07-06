class GamePlay extends ui.GamePlayUI {
    constructor() {
        super();
        this.btn_pause.on(Laya.Event.MOUSE_DOWN, this, this.onPause);
        this.pauseBox.visible=false;
    }
    private onPause() {
        this.pauseBox.visible = true;
        this.btn_continue.once(Laya.Event.MOUSE_DOWN, this, this.onContinue);
        Laya.timer.scale = 0;
    }
    private onContinue() {
        this.pauseBox.visible = false;
        Laya.timer.scale = 1;
    }
    /**
     * 更新游戏数值
     */
    update(hp:number,level:number,score:number):void
    {
        this.hp.text = hp.toString();
        this.level.text = level.toString();
        this.score.text = score.toString();
    }
}