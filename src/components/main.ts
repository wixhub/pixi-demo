import { Application } from "@pixi/app";
import { Base } from "./Base";

export interface Size {
  width: number;
  height: number;
}

export class Main {
  app: Application;
  base!: Base;

  constructor(app: Application) {
    this.app = app;
  }

  setScene(base: Base): void {
    if (this.base !== base) {
      this.app.stage = base;
      this.base && this.base.destroy({ children: true });
      this.base = base;
    }
  }

  onResize(width: number, height: number): void {
    if (this.base) {
      this.base.onResize(width, height);
    }
  }

  calculateViewSize = (targetSize: Size, viewportSize: Size): Size => {
    const w =
      viewportSize.width > viewportSize.height
        ? (viewportSize.width * targetSize.height) / viewportSize.height
        : (viewportSize.width * targetSize.width) / viewportSize.height;

    const h =
      viewportSize.width > viewportSize.height
        ? (viewportSize.height * targetSize.width) / viewportSize.width
        : (viewportSize.height * targetSize.height) / viewportSize.width;

    const scale = Math.max(w / viewportSize.width, h / viewportSize.height);

    return {
      width: Math.ceil(viewportSize.width * scale),
      height: Math.ceil(viewportSize.height * scale),
    };
  };
}
