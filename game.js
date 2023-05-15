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
        this.load.image('coin', './Coint.png');
    }
    create(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.fadeIn(1000);
        this.cameras.main.setBounds(0, 0, 2560 * 2, 1440 * 2);
        this.physics.world.setBounds(0, 0, 2560 * 2, 1440 * 2);
        // Create the background image centered on the screen
        let Background = this.add.image(0, 0, 'Scene 1');
        Background.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
        this.add.image(0, 0, 'Scene 1').setOrigin(0);
        this.add.image(2560, 0, 'Scene 1').setOrigin(0).setFlipX(true);
        this.add.image(0, 1440, 'Scene 1').setOrigin(0).setFlipY(true);
        this.add.image(2560, 1440, 'Scene 1').setOrigin(0).setFlipX(true).setFlipY(true);
        // Create the Dandy sprite centered on the screen
        this.Dandy = this.physics.add.sprite(0, 0, 'Dandy');
        this.Dandy.setScale(0.3);
        this.Dandy.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);

        // Set the world bounds and enable collision with the world bounds
        this.Dandy.setCollideWorldBounds(true);
        this.cameras.main.setZoom(4);
        //this.cameras.main.setBounds(0, 0, 2560, 1440);
        
        // Start the camera following the Dandy sprite, centered on the screen
        this.cameras.main.startFollow(this.Dandy, true, 0.05, 0.05, 0, 0, 2560, 1440);
        
        for (let i = 0; i < 20; i++) {
            let x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
            let y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
            let element = this.add.image(x, y, 'coin');
            element.setScale(0.2);
            // Set the origin to the center of the element for better positioning
            element.setOrigin(0.5);
        }
    }
    update(){
        this.Dandy.setMaxVelocity(200);
        this.Dandy.setDrag(500);
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
        width: 2560 * 2,
        height: 1440 * 2
    },
    scene: [Intro, Level1],
    title: "Dandy Game",
});