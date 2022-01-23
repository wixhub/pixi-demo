import { Texture } from "@pixi/core";
import { IDestroyOptions } from "@pixi/display";
import { TextStyle } from "@pixi/text";
import gsap from "gsap/all";
import { Main } from "./main";
import { MixedText } from "./TextContainer";
import { Base } from "./Base";

export class Texts extends Base {
  mixedTextLabel: MixedText;
  currentTextArrayLength: number;
  currentImagesArrayLength: number;

  constructor(main: Main) {
    super(main);

    const Defaults = {
      images: [
        Texture.from("coin"),
        Texture.from("chart"),
        Texture.from("jazz"),
        Texture.from("tablet"),
        Texture.from("film"),
        Texture.from("door"),
        Texture.from("pile"),
        Texture.from("radio"),
        Texture.from("battery"),
        Texture.from("rocket"),
        Texture.from("toxic"),
        Texture.from("voice"),
      ],
      text: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      minFontSize: 20,
      maxFontSize: 60,
      fontStyle: new TextStyle({
        fontFamily: "Arial",
        fill: "#fff",
        stroke: "#4a1850",
        strokeThickness: 5,
        wordWrap: true,
        lineJoin: "round",
      }),
    };

    this.currentTextArrayLength = Defaults.text.length;
    this.currentImagesArrayLength = Defaults.images.length;

    const randomContent = () => {
      const randomType = this.randomInt(0, 1);
      const currentArray = randomType ? Defaults.text : Defaults.images;
      const arrayLength = randomType
        ? this.currentTextArrayLength
        : this.currentImagesArrayLength;
      return this.randomItem<string | Texture>(
        currentArray,
        arrayLength,
        randomType
      );
    };

    this.mixedTextLabel = new MixedText([], Defaults.fontStyle, 60);
    this.addChild(this.mixedTextLabel);

    const updateContent = (): void => {
      this.mixedTextLabel.setContent(
        [randomContent(), randomContent(), randomContent()],
        gsap.utils.random(Defaults.minFontSize, Defaults.maxFontSize, 1)
      );
      this.layout();
      gsap.delayedCall(2, () => {
        updateContent();
      });
    };

    updateContent();

    this.onResize(main.app.view.width, main.app.view.height);
  }

  randomItem = <T>(
    array: Array<T>,
    arrayLength: number,
    randomType: number
  ): T => {
    const randomElement = array.splice(
      this.randomInt(0, arrayLength - 1),
      1
    )[0];
    array.push(randomElement);
    this.newArrayLenght(randomType);
    return randomElement;
  };

  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  newArrayLenght(randomType: number) {
    switch (randomType) {
      case 0:
        --this.currentTextArrayLength;
        if (this.currentTextArrayLength < 0) this.currentTextArrayLength = 12;
        break;
      case 1:
        --this.currentImagesArrayLength;
        if (this.currentImagesArrayLength < 0)
          this.currentImagesArrayLength = 12;
        break;
    }
  }

  destroy(options?: boolean | IDestroyOptions): void {
    gsap.globalTimeline.getChildren().forEach((tween) => tween.kill());
    super.destroy(options);
  }

  layout(): void {
    const { view } = this.main.app;
    this.mixedTextLabel.x = view.width / 2 - this.mixedTextLabel.width / 2;
    this.mixedTextLabel.y = view.height / 2 - this.mixedTextLabel.height / 2;
  }

  onResize(width: number, height: number): void {
    super.onResize(width, height);
    this.layout();
  }
}
