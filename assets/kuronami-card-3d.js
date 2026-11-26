const feature = document.querySelector("[data-payment-card]");

if (feature) {
  const canvas = feature.querySelector(".payment-card-canvas");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const loadThree = async () => {
    try {
      const THREE = await import("https://cdn.jsdelivr.net/npm/three@0.186.0/build/three.module.js");
      const front = await loadFaceTexture(THREE, "kuronami-cartao-frente.png", false);
      const back = await loadFaceTexture(THREE, "kuronami-cartao-verso.png", true);
      renderCard(THREE, front, back);
    } catch {
      // Keep the supplied front artwork visible when WebGL or the CDN is unavailable.
    }
  };

  function loadFaceTexture(THREE, filename, mirror) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        const textureCanvas = document.createElement("canvas");
        textureCanvas.width = 1400;
        textureCanvas.height = 900;
        const context = textureCanvas.getContext("2d");
        if (!context) {
          reject(new Error("Canvas 2D indisponível"));
          return;
        }

        drawCardArtwork(context, image, textureCanvas.width, textureCanvas.height, mirror);

        const texture = new THREE.CanvasTexture(textureCanvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 4;
        texture.needsUpdate = true;
        resolve(texture);
      };
      image.onerror = reject;
      image.src = new URL(filename, import.meta.url).href;
    });
  }

  function drawCardArtwork(context, image, width, height, mirror) {
    // The supplied artwork is a photo-like render of the card on a dark background.
    // These four points follow the card's outer corners so the artwork fills the model.
    const cardCenter = [image.naturalWidth / 2, image.naturalHeight / 2];
    const artworkInset = 0.93;
    const sourceCorners = [
      [0.103, 0.168],
      [0.881, 0.071],
      [0.922, 0.858],
      [0.056, 0.928],
    ].map(([x, y]) => {
      const sourceX = x * image.naturalWidth;
      const sourceY = y * image.naturalHeight;
      return [
        cardCenter[0] + (sourceX - cardCenter[0]) * artworkInset,
        cardCenter[1] + (sourceY - cardCenter[1]) * artworkInset,
      ];
    });
    const corners = mirror
      ? [sourceCorners[1], sourceCorners[0], sourceCorners[3], sourceCorners[2]]
      : sourceCorners;
    const [topLeft, topRight, bottomRight, bottomLeft] = corners;

    const dx1 = topRight[0] - bottomRight[0];
    const dx2 = bottomLeft[0] - bottomRight[0];
    const dx3 = topLeft[0] - topRight[0] + bottomRight[0] - bottomLeft[0];
    const dy1 = topRight[1] - bottomRight[1];
    const dy2 = bottomLeft[1] - bottomRight[1];
    const dy3 = topLeft[1] - topRight[1] + bottomRight[1] - bottomLeft[1];
    const divisor = dx1 * dy2 - dx2 * dy1;
    const g = (dx3 * dy2 - dx2 * dy3) / divisor;
    const h = (dx1 * dy3 - dx3 * dy1) / divisor;
    const a = topRight[0] - topLeft[0] + g * topRight[0];
    const b = bottomLeft[0] - topLeft[0] + h * bottomLeft[0];
    const c = topLeft[0];
    const d = topRight[1] - topLeft[1] + g * topRight[1];
    const e = bottomLeft[1] - topLeft[1] + h * bottomLeft[1];
    const f = topLeft[1];
    const columns = 28;
    const rows = 18;

    const sourcePoint = (u, v) => {
      const perspective = g * u + h * v + 1;
      return [(a * u + b * v + c) / perspective, (d * u + e * v + f) / perspective];
    };

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const u0 = column / columns;
        const u1 = (column + 1) / columns;
        const v0 = row / rows;
        const v1 = (row + 1) / rows;
        const tl = { source: sourcePoint(u0, v0), target: [u0 * width, v0 * height] };
        const tr = { source: sourcePoint(u1, v0), target: [u1 * width, v0 * height] };
        const br = { source: sourcePoint(u1, v1), target: [u1 * width, v1 * height] };
        const bl = { source: sourcePoint(u0, v1), target: [u0 * width, v1 * height] };
        drawWarpTriangle(context, image, [tl, tr, br]);
        drawWarpTriangle(context, image, [tl, br, bl]);
      }
    }

    blendDarkCornerIntoFace(context, width, height);
  }

  function blendDarkCornerIntoFace(context, width, height) {
    const pixels = context.getImageData(0, 0, width, height);
    const data = pixels.data;
    const leftLimit = Math.floor(width * 0.38);
    const topLimit = Math.floor(height * 0.8);
    const cardBlue = [5, 27, 66];

    for (let y = topLimit; y < height; y += 1) {
      for (let x = 0; x < leftLimit; x += 1) {
        const index = (y * width + x) * 4;
        const red = data[index];
        const green = data[index + 1];
        const blue = data[index + 2];
        if (red > 21 || green > 27 || blue > 47) continue;

        const darkness = 1 - Math.max(red / 21, green / 27, blue / 47);
        const blend = 0.72 + darkness * 0.28;
        data[index] = red + (cardBlue[0] - red) * blend;
        data[index + 1] = green + (cardBlue[1] - green) * blend;
        data[index + 2] = blue + (cardBlue[2] - blue) * blend;
      }
    }

    context.putImageData(pixels, 0, 0);
  }

  function drawWarpTriangle(context, image, points) {
    const [p0, p1, p2] = points;
    const [x0, y0] = p0.source;
    const [x1, y1] = p1.source;
    const [x2, y2] = p2.source;
    const [u0, v0] = p0.target;
    const [u1, v1] = p1.target;
    const [u2, v2] = p2.target;
    const divisor = x0 * (y1 - y2) + x1 * (y2 - y0) + x2 * (y0 - y1);
    const a = (u0 * (y1 - y2) + u1 * (y2 - y0) + u2 * (y0 - y1)) / divisor;
    const c = (u0 * (x2 - x1) + u1 * (x0 - x2) + u2 * (x1 - x0)) / divisor;
    const e = (u0 * (x1 * y2 - x2 * y1) + u1 * (x2 * y0 - x0 * y2) + u2 * (x0 * y1 - x1 * y0)) / divisor;
    const b = (v0 * (y1 - y2) + v1 * (y2 - y0) + v2 * (y0 - y1)) / divisor;
    const d = (v0 * (x2 - x1) + v1 * (x0 - x2) + v2 * (x1 - x0)) / divisor;
    const f = (v0 * (x1 * y2 - x2 * y1) + v1 * (x2 * y0 - x0 * y2) + v2 * (x0 * y1 - x1 * y0)) / divisor;
    const centerX = (u0 + u1 + u2) / 3;
    const centerY = (v0 + v1 + v2) / 3;
    const expanded = points.map(({ target: [x, y] }) => {
      const length = Math.hypot(x - centerX, y - centerY) || 1;
      return [x + ((x - centerX) / length) * 0.35, y + ((y - centerY) / length) * 0.35];
    });

    context.save();
    context.beginPath();
    context.moveTo(...expanded[0]);
    context.lineTo(...expanded[1]);
    context.lineTo(...expanded[2]);
    context.closePath();
    context.clip();
    context.setTransform(a, b, c, d, e, f);
    context.drawImage(image, 0, 0);
    context.restore();
  }

  function roundedRectangle(THREE, width, height, radius) {
    const x = -width / 2;
    const y = -height / 2;
    const shape = new THREE.Shape();
    shape.moveTo(x + radius, y);
    shape.lineTo(x + width - radius, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + radius);
    shape.lineTo(x + width, y + height - radius);
    shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    shape.lineTo(x + radius, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);
    return shape;
  }

  function renderCard(THREE, frontTexture, backTexture) {
    const width = 3.72;
    const height = 2.4;
    const depth = 0.075;
    const bevelThickness = 0.016;
    const shape = roundedRectangle(THREE, width, height, 0.2);
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 6.25);

    const scene = new THREE.Scene();
    const card = new THREE.Group();
    scene.add(card);

    const uvGenerator = {
      generateTopUV(_geometry, vertices, a, b, c) {
        return [a, b, c].map((index) => new THREE.Vector2(
          (vertices[index * 3] + width / 2) / width,
          (vertices[index * 3 + 1] + height / 2) / height,
        ));
      },
      generateSideWallUV(_geometry, vertices, a, b, c, d) {
        return [a, b, c, d].map((index) => new THREE.Vector2(
          vertices[index * 3],
          vertices[index * 3 + 2],
        ));
      },
    };
    const shell = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.018,
      bevelThickness,
      curveSegments: 12,
      UVGenerator: uvGenerator,
    });
    const [caps, sides] = shell.groups.map(({ start, count }) => ({ start, count }));
    const capFaceCount = caps.count / 2;
    shell.clearGroups();
    shell.addGroup(caps.start, capFaceCount, 0);
    shell.addGroup(caps.start + capFaceCount, capFaceCount, 1);
    shell.addGroup(sides.start, sides.count, 2);
    shell.translate(0, 0, -depth / 2);

    const backMaterial = new THREE.MeshBasicMaterial({ map: backTexture, toneMapped: false });
    const frontMaterial = new THREE.MeshBasicMaterial({ map: frontTexture, toneMapped: false });
    const edgeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x2bdcff,
      emissive: 0x00a9d1,
      emissiveIntensity: 0.75,
      metalness: 0.25,
      roughness: 0.32,
    });
    card.add(new THREE.Mesh(shell, [backMaterial, frontMaterial, edgeMaterial]));

    scene.add(new THREE.AmbientLight(0xa8d8ed, 1.25));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(-3, 4, 5);
    scene.add(keyLight);
    const cyanLight = new THREE.PointLight(0x00bde8, 18, 8);
    cyanLight.position.set(3, -1.2, 2.5);
    scene.add(cyanLight);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.setClearColor(0x000000, 0);

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
      renderer.setSize(bounds.width, bounds.height, false);
      camera.aspect = bounds.width / bounds.height;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };

    resize();
    new ResizeObserver(resize).observe(canvas);
    feature.classList.add("is-ready");

    if (reducedMotion.matches) return;

    const clock = new THREE.Clock();
    let elapsed = 0;
    let lastFrame = 0;
    const animate = (time) => {
      requestAnimationFrame(animate);
      if (time - lastFrame < 32) return;
      lastFrame = time;
      elapsed += Math.min(clock.getDelta(), 0.05);
      card.rotation.y = elapsed * 0.28;
      card.rotation.x = -0.08 + Math.sin(elapsed * 0.7) * 0.025;
      card.rotation.z = Math.sin(elapsed * 0.35) * 0.012;
      renderer.render(scene, camera);
    };
    requestAnimationFrame(animate);
  }

  loadThree();
}
