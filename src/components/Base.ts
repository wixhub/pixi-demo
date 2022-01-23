import { Container } from "@pixi/display";
import { Sprite } from "@pixi/sprite";
import { Main } from "./main";
import { Menu } from "./Menu";

export class Base extends Container {
  main: Main;
  backButton: Sprite;

  constructor(main: Main) {
    super();
    this.main = main;

    const backButton = (this.backButton = Sprite.from("piano"));
    backButton.anchor.set(1, 0);
    backButton.interactive = true;
    backButton.on("pointerdown", () => main.setScene(new Menu(main)));
    this.addChild(backButton);
  }

  onResize(width: number, height: number): void {
    this.backButton.x = width - 30;
    this.backButton.y = 20;
  }
}
