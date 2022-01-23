import { Sprite } from "@pixi/sprite";
import { Text, TextStyle } from "@pixi/text";
import { Main } from "./main";
import { Cards } from "./Cards";
import { Texts } from "./Texts";
import { Fire } from "./Fire";
import { Base } from "./Base";

export class Menu extends Base {
  buttons: Sprite[];

  constructor(main: Main) {
    super(main);

    this.buttons = [];

    this.addButton("Card", () => {
      this.main.setScene(new Cards(main));
    });
    this.addButton("Text", () => {
      this.main.setScene(new Texts(main));
    });
    this.addButton("Fire", () => {
      this.main.setScene(new Fire(main));
    });

    this.onResize(main.app.view.width, main.app.view.height);
  }

  addButton(text: string, onClick: () => void): Sprite {
    const button = Sprite.from("button");
    button.anchor.set(0.5);
    button.scale.x = 2;
    button.scale.y = 2;
    button.interactive = true;
    button.on("pointerdown", onClick);

    const label = new Text(
      text,
      new TextStyle({
        fontFamily: "Arial",
        fontSize: 46,
        fontWeight: "bold",
        fill: "#202470",
      })
    );
    label.anchor.set(0.5);
    label.scale.x = 0.5;
    label.scale.y = 0.5;
    button.addChild(label);

    this.addChild(button);
    this.buttons.push(button);

    return button;
  }

  onResize(width: number, height: number): void {
    const { buttons } = this;
    buttons.forEach((button, i) => {
      button.y = height / 2 - (buttons.length / 2 - i) * 90 + 45;
      button.x = width / 2;
    });
  }
}
