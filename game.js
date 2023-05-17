class Intro extends Phaser.Scene {
    constructor(){
        super('intro');
    }
    preload(){
        this.load.image('Intro Scene','./assets/Intro Scene.png')
        this.load.audio('Menu Song','./assets/Menu song.wav')
    }
    create(){
       let IntroScene = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'Intro Scene');
       let song = this.sound.add('Menu Song');
       song.play({
            volume: 0.05,
            loop: true
       });
       IntroScene.setScale(2);
       this.input.once('pointerdown',() =>{
        this.tweens.add({
            targets: song,
            volume: 0,
            duration: 900,
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
        this.song = null;
        this.count = 0;
    }
    
    preload(){
        this.load.image('Scene 1', './assets/Scene 1.png');
        this.load.audio('Xiu Xiu','./assets/Normal Love.mp3');
        this.load.image('Dandy', './assets/Maincharacter.png');
        this.load.image('coin', './assets/Coint.png');
    }
    create(){
        this.song = this.sound.add('Xiu Xiu');
        this.song.play({
            volume: 0.05,
            loop: true
        });
        this.cameras.main.fadeIn(1000);
        this.cameras.main.setBounds(0, 0, 2560 * 2, 1440 * 2);
        this.physics.world.setBounds(0, 0, 2560 * 2, 1440 * 2);
        this.cursors = this.input.keyboard.createCursorKeys();
        let Background = this.add.image(0, 0, 'Scene 1');
        Background.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
        this.Dandy =  this.physics.add.sprite(this.cameras.main.centerX,this.cameras.main.centerY, 'Dandy');
        this.Dandy.setScale(0.3);
        this.Dandy.setDepth(4);
        //this.container = this.add.container(this.cameras.main.centerX, this.cameras.main.centerY);
        //this.container.add(this.Dandy);
        this.add.image(0, 0, 'Scene 1').setOrigin(0);
        this.add.image(2560, 0, 'Scene 1').setOrigin(0).setFlipX(true);
        this.add.image(0, 1440, 'Scene 1').setOrigin(0).setFlipY(true);
        this.add.image(2560, 1440, 'Scene 1').setOrigin(0).setFlipX(true).setFlipY(true);
        this.Dandy.setCollideWorldBounds(true);
        this.scoreText = this.add.text(0, 0, 'Score: 0/20', { fontSize: '32px', fill: '#000000' });
        //this.container.add(this.scoreText);
        this.cameras.main.setZoom(4);
        this.cameras.main.startFollow(this.Dandy, true, 0.05, 0.05, 0, 0, 2560 *2, 1440*2);
        /*this.Dandy = this.physics.add.sprite(0, 0, 'Dandy');
        this.Dandy.setDepth(1);
        //let container = this.add.container(this.cameras.main.centerX, this.cameras.main.centerY)
        //container.add(this.Dandy);
        this.Dandy.setScale(0.3);
        //this.Dandy.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
        // Set the world bounds and enable collision with the world bounds
        this.Dandy.setCollideWorldBounds(true);
        this.cameras.main.setZoom(4);
        //this.cameras.main.setBounds(0, 0, 2560, 1440);
        
        // Start the camera following the Dandy sprite, centered on the screen
        this.cameras.main.startFollow(this.Dandy, true, 0.05, 0.05, 0, 0, 2560, 1440);
        this.count = 0;
        this.scoreText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Score: 0/20', { fontSize: '32px', fill: '#000000' });
        this.scoreText.setDepth(1);*/
        for (let i = 0; i < 20; i++) {
            let x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
            let y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
            let element = this.physics.add.image(x, y, 'coin');
            element.setScale(0.2);
            // Set the origin to the center of the element for better positioning
            element.setOrigin(0.5);
            this.physics.add.overlap(this.Dandy, element, this.handleInteraction, null, this);
        }
    }
    handleInteraction(dandy, element) {
        element.destroy(); 
        this.count++;
        this.scoreText.setText('Score: ' + this.count + '/20');
        if (this.count == 10){
            this.transitiontext = this.add.text(this.Dandy.x, this.Dandy.y, 'Press Space to End Level.').setFontSize(30).setColor('0x000000').setFontStyle('bold');
            
        } else if (this.count == 20){
            this.cameras.main.fadeOut(1000);
            this.tweens.add({
                targets: this.song,
                volume: 0,
                duration: 1000,
                onComplete: () => {
                  this.song.stop();
                }
              }); 
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('EndScene1', {count: this.count}); 
            });
        }
    }
    update(){
        
        this.scoreText.x = this.Dandy.x - 100;
        this.scoreText.y = this.Dandy.y - 100;
        this.Dandy.setMaxVelocity(200);
        this.Dandy.setDrag(500);
        if (this.cursors.left.isDown)
        {
            this.Dandy.setAccelerationX(-100);
        } else if (this.cursors.right.isDown)
        {
            this.Dandy.setAccelerationX(100);
        } else {
            this.Dandy.setAccelerationX(0);
        }

        if (this.cursors.up.isDown)
        {
            this.Dandy.setAccelerationY(-100);
        } else if (this.cursors.down.isDown)
        {
            this.Dandy.setAccelerationY(100);
        } else {
            this.Dandy.setAccelerationY(0);
        }
        //change this
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)) && this.count >= 10){
            this.cameras.main.fadeOut(1000); 
            this.tweens.add({
                targets: this.song,
                volume: 0,
                duration: 900,
                onComplete: () => {
                  this.song.stop();
                }
              });
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('EndScene1', {count: this.count}); 
            });
        }
    }
}

class LevelEnd1 extends Phaser.Scene {
    constructor(){
        super('EndScene1');
    }
    preload(){
        this.load.image('completescreen','./assets/Complete Screen.png')
    }
    create(){
        const count = this.scene.settings.data.count;
        this.add.image(0, 0, 'completescreen').setOrigin(0).setScale(2);
        this.EndScore = this.add.text(this.cameras.main.centerX+200, this.cameras.main.centerY + 100 , count).setFontSize(300)
        this.Msg = this.add.text(this.cameras.main.centerX - 2300, this.cameras.main.centerY + 700, "Press Space to go to next level!").setFontSize(250)
    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))){
            this.cameras.main.fadeOut(1000); 
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('level2');
            });
        }
    }
}

class Level2 extends Phaser.Scene{
    constructor(){
        super('level2')
        this.count = 0;
        this.song = null;
    }
    preload(){
        this.load.audio('level2song','./assets/level2.mp3');
        this.load.image('Scene 2', './assets/Scene 2.png');
        this.load.image('Cookie', './assets/Cookie.png');
    }
    create(){
        this.song = this.sound.add('level2song');
        this.song.play({
            volume: 0.05,
            loop: true
        });
        this.cameras.main.fadeIn(1000);
        this.cameras.main.setBounds(0, 0, 2560 * 2, 1440 * 2);
        this.physics.world.setBounds(0, 0, 2560 * 2, 1440 * 2);
        this.cursors = this.input.keyboard.createCursorKeys();
        let Background = this.add.image(0, 0, 'Scene 2');
        Background.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
        this.Dandy =  this.physics.add.sprite(this.cameras.main.centerX,this.cameras.main.centerY, 'Dandy');
        this.Dandy.setScale(0.3);
        this.Dandy.setDepth(4);
        //this.container = this.add.container(this.cameras.main.centerX, this.cameras.main.centerY);
        //this.container.add(this.Dandy);
        this.add.image(0, 0, 'Scene 2').setOrigin(0);
        this.add.image(2560, 0, 'Scene 2').setOrigin(0).setFlipX(true);
        this.add.image(0, 1440, 'Scene 2').setOrigin(0).setFlipY(true);
        this.add.image(2560, 1440, 'Scene 2').setOrigin(0).setFlipX(true).setFlipY(true);
        this.Dandy.setCollideWorldBounds(true);
        this.scoreText = this.add.text(0, 0, 'Score: 0/20', { fontSize: '32px', fill: '#000000' });
        //this.container.add(this.scoreText);
        this.cameras.main.setZoom(4);
        this.cameras.main.startFollow(this.Dandy, true, 0.05, 0.05, 0, 0, 2560 *2, 1440*2);
        /*this.Dandy = this.physics.add.sprite(0, 0, 'Dandy');
        this.Dandy.setDepth(1);
        //let container = this.add.container(this.cameras.main.centerX, this.cameras.main.centerY)
        //container.add(this.Dandy);
        this.Dandy.setScale(0.3);
        //this.Dandy.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
        // Set the world bounds and enable collision with the world bounds
        this.Dandy.setCollideWorldBounds(true);
        this.cameras.main.setZoom(4);
        //this.cameras.main.setBounds(0, 0, 2560, 1440);
        
        // Start the camera following the Dandy sprite, centered on the screen
        this.cameras.main.startFollow(this.Dandy, true, 0.05, 0.05, 0, 0, 2560, 1440);
        this.count = 0;
        this.scoreText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Score: 0/20', { fontSize: '32px', fill: '#000000' });
        this.scoreText.setDepth(1);*/
        for (let i = 0; i < 20; i++) {
            let x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
            let y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
            let element = this.physics.add.image(x, y, 'Cookie');
            element.setScale(0.2);
            // Set the origin to the center of the element for better positioning
            element.setOrigin(0.5);
            this.physics.add.overlap(this.Dandy, element, this.handleInteraction, null, this);
        }
    }
    handleInteraction(dandy, element) {
        element.destroy(); 
        this.count++;
        this.scoreText.setText('Score: ' + this.count + '/20');
        if (this.count == 10){
            this.transitiontext = this.add.text(this.Dandy.x, this.Dandy.y, 'Press Space to End Level.').setFontSize(30).setColor('#FFFFFF').setFontStyle('bold');
            
        } else if (this.count == 20){
            this.cameras.main.fadeOut(1000); 
            this.tweens.add({
                targets: this.song,
                volume: 0,
                duration: 1000,
                onComplete: () => {
                  this.song.stop();
                }
              });
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('EndScene2', {count: this.count}); 
            });
        }
    }
    update(){
        
        this.scoreText.x = this.Dandy.x - 100;
        this.scoreText.y = this.Dandy.y - 100;
        this.Dandy.setMaxVelocity(200);
        this.Dandy.setDrag(500);
        if (this.cursors.left.isDown)
        {
            this.Dandy.setAccelerationX(-100);
        } else if (this.cursors.right.isDown)
        {
            this.Dandy.setAccelerationX(100);
        } else {
            this.Dandy.setAccelerationX(0);
        }

        if (this.cursors.up.isDown)
        {
            this.Dandy.setAccelerationY(-100);
        } else if (this.cursors.down.isDown)
        {
            this.Dandy.setAccelerationY(100);
        } else {
            this.Dandy.setAccelerationY(0);
        }
        //change this
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)) && this.count >= 10){
            this.cameras.main.fadeOut(1000); 
            this.tweens.add({
                targets: this.song,
                volume: 0,
                duration: 900,
                onComplete: () => {
                  this.song.stop();
                }
              });
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('EndScene2', {count: this.count}); 
            });
        }
    }

}

class LevelEnd2 extends Phaser.Scene {
    constructor(){
        super('EndScene2');
    }
    create(){
        const count = this.scene.settings.data.count;
        this.add.image(0, 0, 'completescreen').setOrigin(0).setScale(2);
        this.EndScore = this.add.text(this.cameras.main.centerX+200, this.cameras.main.centerY + 100 , count).setFontSize(300)
        this.Msg = this.add.text(this.cameras.main.centerX - 2300, this.cameras.main.centerY + 700, "Press Space to go to next level!").setFontSize(250)
    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))){
            this.cameras.main.fadeOut(1000); 
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('level3');
            });
        }
    }
}

class Level3 extends Phaser.Scene{
    constructor(){
        super('level3')
        this.count = 0;
        this.song = null;
    }
    preload(){
        this.load.audio('level3song','./assets/level3.mp3');
        this.load.image('Scene 3', './assets/Scene 3.png');
        this.load.image('Note', './assets/Music Note.png');
    }
    create(){
        this.song = this.sound.add('level3song');
        this.song.play({
            volume: 0.05,
            loop: true
        });
        this.cameras.main.fadeIn(1000);
        this.cameras.main.setBounds(0, 0, 2560 * 2, 1440 * 2);
        this.physics.world.setBounds(0, 0, 2560 * 2, 1440 * 2);
        this.cursors = this.input.keyboard.createCursorKeys();
        let Background = this.add.image(0, 0, 'Scene 3');
        Background.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
        this.Dandy =  this.physics.add.sprite(this.cameras.main.centerX,this.cameras.main.centerY, 'Dandy');
        this.Dandy.setScale(0.3);
        this.Dandy.setDepth(4);
        //this.container = this.add.container(this.cameras.main.centerX, this.cameras.main.centerY);
        //this.container.add(this.Dandy);
        this.add.image(0, 0, 'Scene 3').setOrigin(0);
        this.add.image(2560, 0, 'Scene 3').setOrigin(0).setFlipX(true);
        this.add.image(0, 1440, 'Scene 3').setOrigin(0).setFlipY(true);
        this.add.image(2560, 1440, 'Scene 3').setOrigin(0).setFlipX(true).setFlipY(true);
        this.Dandy.setCollideWorldBounds(true);
        this.scoreText = this.add.text(0, 0, 'Score: 0/20', { fontSize: '32px', fill: '#000000' });
        //this.container.add(this.scoreText);
        this.cameras.main.setZoom(4);
        this.cameras.main.startFollow(this.Dandy, true, 0.05, 0.05, 0, 0, 2560 *2, 1440*2);
        /*this.Dandy = this.physics.add.sprite(0, 0, 'Dandy');
        this.Dandy.setDepth(1);
        //let container = this.add.container(this.cameras.main.centerX, this.cameras.main.centerY)
        //container.add(this.Dandy);
        this.Dandy.setScale(0.3);
        //this.Dandy.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
        // Set the world bounds and enable collision with the world bounds
        this.Dandy.setCollideWorldBounds(true);
        this.cameras.main.setZoom(4);
        //this.cameras.main.setBounds(0, 0, 2560, 1440);
        
        // Start the camera following the Dandy sprite, centered on the screen
        this.cameras.main.startFollow(this.Dandy, true, 0.05, 0.05, 0, 0, 2560, 1440);
        this.count = 0;
        this.scoreText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Score: 0/20', { fontSize: '32px', fill: '#000000' });
        this.scoreText.setDepth(1);*/
        for (let i = 0; i < 20; i++) {
            let x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
            let y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
            let element = this.physics.add.image(x, y, 'Note');
            element.setScale(0.2);
            // Set the origin to the center of the element for better positioning
            element.setOrigin(0.5);
            this.physics.add.overlap(this.Dandy, element, this.handleInteraction, null, this);
        }
    }
    handleInteraction(dandy, element) {
        element.destroy(); 
        this.count++;
        this.scoreText.setText('Score: ' + this.count + '/20');
        if (this.count == 10){
            this.transitiontext = this.add.text(this.Dandy.x - 100, this.Dandy.y - 300, 'Press Space to End Level.').setFontSize(30).setColor('0x000000').setFontStyle('bold');
            
        } else if (this.count == 20){
            this.cameras.main.fadeOut(1000); 
            this.tweens.add({
                targets: this.song,
                volume: 0,
                duration: 1000,
                onComplete: () => {
                  this.song.stop();
                }
              });
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('EndScene3', {count: this.count}); 
            });
        }
    }
    update(){
        
        this.scoreText.x = this.Dandy.x - 100;
        this.scoreText.y = this.Dandy.y - 100;
        this.Dandy.setMaxVelocity(200);
        this.Dandy.setDrag(500);
        if (this.cursors.left.isDown)
        {
            this.Dandy.setAccelerationX(-100);
        } else if (this.cursors.right.isDown)
        {
            this.Dandy.setAccelerationX(100);
        } else {
            this.Dandy.setAccelerationX(0);
        }

        if (this.cursors.up.isDown)
        {
            this.Dandy.setAccelerationY(-100);
        } else if (this.cursors.down.isDown)
        {
            this.Dandy.setAccelerationY(100);
        } else {
            this.Dandy.setAccelerationY(0);
        }
        //change this
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)) && this.count >= 10){
            this.tweens.add({
                targets: this.song,
                volume: 0,
                duration: 1000,
                onComplete: () => {
                  this.song.stop();
                }
              });
            this.cameras.main.fadeOut(1000); 
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('EndScene3', {count: this.count}); 
            });
        }
    }
}


class LevelEnd3 extends Phaser.Scene {
    constructor(){
        super('EndScene3');
    }

    create(){
        const count = this.scene.settings.data.count;
        this.add.image(0, 0, 'completescreen').setOrigin(0).setScale(2);
        this.EndScore = this.add.text(this.cameras.main.centerX+200, this.cameras.main.centerY + 100 , count).setFontSize(300)
        this.Msg = this.add.text(this.cameras.main.centerX - 2300, this.cameras.main.centerY + 700, "Press Space to go to next level!").setFontSize(250)
    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))){
            this.cameras.main.fadeOut(1000); 
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('intro');
            });
        }
    }
}
new Phaser.Game({
    physics: {
        default: 'arcade',
    },

    scale: {
        mode: Phaser.Scale.FIT,
        width: 2560 * 2,
        height: 1440 * 2
    },
    scene: [Intro, Level1, Level2, Level3, LevelEnd1, LevelEnd2, LevelEnd3],
    title: "Dandy Game",
});