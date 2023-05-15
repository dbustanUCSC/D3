class Intro extends Phaser.Scene {
    constructor(){
        super('intro');
    }
    preload(){
        this.load.image('Intro Scene','./Intro Scene.png')
        this.load.audio('Menu Song','./Menu song.wav')
    }
    create(){
       let IntroScene = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'Intro Scene');
       let song = this.sound.add('Menu Song');
       song.play({
            volume: 0.3,
            loop: true
       });
       IntroScene.setScale(0.75);
       this.input.once('pointerdown',() =>{
        this.tweens.add({
            targets: song,
            volume: 0,
            duration: 1000,
            onComplete: () => {
              song.stop();
            }
          });
        this.cameras.main.fadeOut(1000);
        
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('level1');
        });
       });
    }
}

class Level1 extends Phaser.Scene {
    constructor(){
        super('level1');
    }
    preload(){
        this.load.image('Scene 1', './Scene 1.png');
        this.load.image('Dandy', './Main Character.png');
    }
    create(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.fadeIn(1000);
        
        // Create the background image centered on the screen
        let Background = this.add.image(0, 0, 'Scene 1');
        Background.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);

        // Create the Dandy sprite centered on the screen
        this.Dandy = this.physics.add.sprite(0, 0, 'Dandy');
        this.Dandy.setScale(0.3);
        this.Dandy.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);

        // Set the world bounds and enable collision with the world bounds
        this.physics.world.setBounds(0, 0, this.cameras.main.centerX+2560/2,  this.cameras.main.centerY + 1440/2);
        this.Dandy.setCollideWorldBounds(true);
        this.cameras.main.setZoom(4);
        this.cameras.main.setBounds(0, 0, 2560, 1440);
        
        // Start the camera following the Dandy sprite, centered on the screen
        this.cameras.main.startFollow(this.Dandy, true, 0.05, 0.05, 0, 0, 2560, 1440);
        
    }
    update(){
        this.Dandy.setMaxVelocity(200);
        this.Dandy.setDrag(700);
        if (this.cursors.left.isDown)
        {
            this.Dandy.setAccelerationX(-100);
        }
        else if (this.cursors.right.isDown)
        {
            this.Dandy.setAccelerationX(100);
        } else {
            this.Dandy.setAccelerationX(0);
        }

        if (this.cursors.up.isDown)
        {
            this.Dandy.setAccelerationY(-50);
        }
        else if (this.cursors.down.isDown)
        {
            this.Dandy.setAccelerationY(50);
        } else {
            this.Dandy.setAccelerationY(0);
        }
      
    }
}
new Phaser.Game({
    width: 2560,
    height: 1440,
    scene: [Intro],

    loader: {
        baseURL: 'assets/'
    },

    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH.CENTER_BOTH,
        width: 2560,
        height: 1440
    },
    scene: [Intro, Level1],
    title: "Dandy Game",
});