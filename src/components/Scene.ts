import { Container } from "@pixi/display";
import { Main } from "./main";

export abstract class Scene extends Container {
  main: Main;

  constructor(main: Main) {
    super();
    this.main = main;
  }

  abstract onResize(width: number, height: number): void;
}
