import * as PIXI from "pixi.js";
import images from "./rounded.png";
import data from "./rounded.json";

const loader = PIXI.Loader.shared;

export const loadResourses = (): Promise<any> => {
  return new Promise((resolve) => {
    loader.add("rounded", images, (resource) => {
      if (resource.error) {
        console.error(resource.error);
      } else {
        const texture = PIXI.Texture.from("rounded").baseTexture;
        const sheet = new PIXI.Spritesheet(texture, data);
        sheet.parse(() => {});
      }
    });

    loader.onComplete.add(resolve);
    loader.load();
  });
};
