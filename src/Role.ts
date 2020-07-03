class Role extends Laya.Sprite {
    /***角色的类型   “hero”:玩家飞机，“enemy”：敌人飞机、“bullet”：子弹、"bomb":道具****/
    private type: string;
    private hp: number = 0;
    private speed: number = 0;
    //角色的动画
    private roleAni: Laya.Animation;
    //当前动画动作
    private action: string;
    constructor() {
        super();
        this.roleAni = new Laya.Animation();
        //加载IDE编辑的动画文件
        this.roleAni.loadAnimation("GameRole.ani");
    }
    init(type: string, hp: number, speed: number): void {
        this.type = type;
        this.hp = hp;
        this.speed = speed;
        this.addChild(this.roleAni);
        //播放默认飞行动画
        this.playAction("fly");
    }
    playAction(action: string): void  {
        this.action = action;
        this.roleAni.play(0, true, this.type + "_" + action);
    }
    update(): void  {
        if (this.type == "hero")  {
            if (this.x < this.roleAni.width / 2)  {
                this.x = this.roleAni.width / 2;
            }
            else if (this.x > 720 - this.roleAni.width / 2)  {
                this.x = 720 - this.roleAni.width / 2;
            }
            if (this.y < this.roleAni.height / 2)  {
                this.y = this.roleAni.height / 2;
            }
            else if (this.y > 1280 - this.roleAni.height / 2)  {
                this.y = 1280 - this.roleAni.height / 2;
            }
        }
    }
}