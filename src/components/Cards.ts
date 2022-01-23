import { Container, IDestroyOptions } from "@pixi/display";
import { Sprite } from "@pixi/sprite";
import { Text, TextStyle } from "@pixi/text";
import gsap from "gsap/all";
import { Main } from "./main";
import { Base } from "./Base";

interface Stack {
  sprites: Sprite[];
  x: number;
  y: number;
}

const Defaults = {
  InitialStackCount: 144,
  Images: ["door", "film", "tablet"],
  Spacing: { x: 0, y: 1 },
  MoveDuration: 2,
  NextMoveDelay: 1,
};

export class Cards extends Base {
  stackContainer = new Container();
  fpsLabel: Text;

  constructor(main: Main) {
    super(main);

    this.fpsLabel = new Text(
      "FPS: 0",
      new TextStyle({
        fontFamily: "Arial",
        fontSize: 26,
        fill: "#ffffff",
      })
    );

    this.fpsLabel.anchor.set(0, 0);
    this.addChild(this.fpsLabel);

    main.app.ticker.add(this.update, this);

    const stack1 = Cards.createStack(Defaults.InitialStackCount, -265, -160);
    const stack2 = Cards.createStack(0, 144, -160);

    this.addChild(this.stackContainer);
    this.stackContainer.sortableChildren = true;
    this.stackContainer.addChild(...stack1.sprites);

    const moveCard = (duration: number): void => {
      if (stack1.sprites.length) {
        const sprite = <Sprite>stack1.sprites.pop();
        if (stack2.sprites.length) {
          sprite.zIndex = stack2.sprites[stack2.sprites.length - 1].zIndex + 1;
        }
        stack2.sprites.push(sprite);

        gsap.to(sprite, {
          x: stack2.x + stack2.sprites.length * Defaults.Spacing.x,
          y: stack2.y + stack2.sprites.length * Defaults.Spacing.y,
          ease: "quad.inOut",
          duration,
        });
      }
    };

    const moveNext = () => {
      moveCard(Defaults.MoveDuration);
      if (stack1.sprites.length) {
        gsap.delayedCall(Defaults.NextMoveDelay, moveNext);
      } else {
        this.main.app.ticker.remove(this.update, this);
      }
    };

    moveNext();

    this.onResize(main.app.view.width, main.app.view.height);
  }

  update(): void {
    this.fpsLabel.text = `FPS: ${this.main.app.ticker.FPS.toFixed(2)}`;
  }

  static createStack(count: number, x: number, y: number): Stack {
    const sprites: Sprite[] = [];

    for (let i = 0; i < count; i++) {
      const sprite = Sprite.from(
        Defaults.Images[Math.floor(Math.random() * (3 - 0))]
      );
      sprite.x = x + Defaults.Spacing.x * i;
      sprite.y = y + Defaults.Spacing.y * i;
      sprite.scale.x = 2;
      sprite.scale.y = 2;
      sprite.zIndex = i;
      sprites.push(sprite);
    }

    return { sprites, x, y };
  }

  destroy(options?: boolean | IDestroyOptions): void {
    this.main.app.ticker.remove(this.update, this);
    gsap.globalTimeline.getChildren().forEach((tween) => tween.kill());
    super.destroy(options);
  }

  onResize(width: number, height: number): void {
    super.onResize(width, height);
    this.stackContainer.x = width / 2;
    this.stackContainer.y = height / 2;
    this.fpsLabel.x = 20;
    this.fpsLabel.y = 20;
  }
}
