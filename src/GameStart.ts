class GameStart extends ui.GameStartUI {
    constructor() {
        super();
        this.btn_start.visible = false;
        Laya.loader.load("res/atlas/gameRole.atlas",Handler.create(this, this.onComplete));
        this.once(Laya.Event.CLOSE, this, this.onClose);
    }

    private onClose(): void {
        this.removeSelf();
        this.destroy();
    }
    private onComplete(): void {
        this.loading.text = "资源加载完成，开始游戏吧...";
        this.btn_start.visible = true;
        Laya.Tween.from(this.btn_start, { y: this.btn_start.y + 20 }, 1000, Laya.Ease.elasticOut);
    }
    private onProgress(loadNum:number):void
    {
        this.loading.text="资源加载中，当前进度："+loadNum*100 + "%"
    }
}