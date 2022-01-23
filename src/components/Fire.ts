import { Main } from "./main";
import { Base } from "./Base";
import { Emitter } from "pixi-particles";
import emitterConfig from "../assets/emitter.json";
import { Texture } from "@pixi/core";
import { Container, IDestroyOptions } from "@pixi/display";
import { Text, TextStyle } from "@pixi/text";
import { Sprite } from "@pixi/sprite";

export class Fire extends Base {
  statsLabel: Text;
  container: Container;
  emitter: Emitter;
  background: Sprite;

  constructor(main: Main) {
    super(main);

    this.background = Sprite.from("black");
    this.addChildAt(this.background, 0);

    this.statsLabel = new Text(
      "Particles: 0",
      new TextStyle({
        fontFamily: "Arial",
        fontSize: 26,
        fill: "#ffffff",
      })
    );

    this.statsLabel.anchor.set(0, 0);
    this.statsLabel.position.set(20, 20);
    this.addChild(this.statsLabel);

    this.container = new Container();
    this.addChild(this.container);

    this.emitter = new Emitter(
      this.container,
      Texture.from("lite"),
      emitterConfig
    );

    this.main.app.ticker.add(this.update, this);

    this.onResize(main.app.view.width, main.app.view.height);
  }

  update(delta: number): void {
    this.emitter.update(delta / 60);
    const fps = this.main.app.ticker.FPS;
    this.statsLabel.text = `Particles: ${
      this.emitter.particleCount
    }, FPS: ${fps.toFixed(2)}`;
  }

  destroy(options?: boolean | IDestroyOptions): void {
    this.main.app.ticker.remove(this.update, this);
    super.destroy(options);
  }

  onResize(width: number, height: number): void {
    super.onResize(width, height);
    this.background.width = width;
    this.background.height = height;
    this.container.x = width / 2;
    this.container.y = height / 2;
  }
}
