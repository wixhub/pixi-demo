import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { loadResourses } from "./assets";
import { Main } from "./components/main";
import { Menu } from "./components/Menu";

async function run() {
  const app = new PIXI.Application({
    backgroundColor: 0x202470,
  });

  app.ticker.stop();
  gsap.ticker.add(() => {
    app.ticker.update();
  });

  await loadResourses();

  document.body.appendChild(app.view);

  const main = new Main(app);
  main.setScene(new Menu(main));

  const resize = () => {
    const targetSize = { width: 400, height: 600 };
    const windowSize = { width: window.innerWidth, height: window.innerHeight };
    const viewSize = main.calculateViewSize(targetSize, windowSize);
    app.renderer.resize(viewSize.width, viewSize.height);
    app.view.style.width = `100%`;
    app.view.style.height = `90%`;
    main.onResize(viewSize.width, viewSize.height);
  };

  window.addEventListener("resize", resize);
  resize();
}

run();
