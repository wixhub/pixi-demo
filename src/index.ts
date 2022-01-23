import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { loadResourses } from "./assets";
import { Main } from "./components/main";
import { Menu } from "./components/Menu";

async function run() {
  const app = new PIXI.Application({
    //resolution: devicePixelRatio || 1,
    backgroundColor: 0x202470,
  });

  app.ticker.stop();
  gsap.ticker.add(() => {
    app.ticker.update();
  });

  await loadResourses();

  document.body.appendChild(app.view);

  // Init game controller and initial scene.
  const main = new Main(app);
  main.setScene(new Menu(main));

  // Resize logic for running full screen with minimum dimenions.
  const resize = () => {
    const targetSize = { width: 400, height: 600 };
    const windowSize = { width: window.innerWidth, height: window.innerHeight };
    // Calculate size for renderer.
    const viewSize = main.calculateViewSize(targetSize, windowSize);

    // Resize Pixi renderer.
    app.renderer.resize(viewSize.width, viewSize.height);

    // Adjust canvas to fill screen.
    app.view.style.width = `100%`;
    app.view.style.height = `90%`;
    // app.view.style.width = `${windowSize.width}px`;
    // app.view.style.height = `${windowSize.height}px`;

    // Alert the game controller of the new size, to pass along to the current scene.
    main.onResize(viewSize.width, viewSize.height);
  };

  window.addEventListener("resize", resize);
  resize();
}

run();
