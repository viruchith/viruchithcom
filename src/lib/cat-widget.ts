import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

class CatWidget {
  private container: HTMLElement | null;

  private scene: THREE.Scene;

  private camera: THREE.PerspectiveCamera;

  private renderer: THREE.WebGLRenderer | null = null;

  private timer = new THREE.Timer();

  private mixer: THREE.AnimationMixer | null = null;

  private catModel: THREE.Object3D | null = null;

  private modelWrapper: THREE.Group | null = null;

  private animations: { idle: THREE.AnimationAction | null; walk: THREE.AnimationAction | null } = {
    idle: null,
    walk: null,
  };

  private currentAction: THREE.AnimationAction | null = null;

  private isMoving = false;

  private targetPosition = new THREE.Vector3();

  private movementPlaneZ = 0;

  private edgeOrder: Array<"top" | "right" | "bottom" | "left"> = [
    "top",
    "right",
    "bottom",
    "left",
  ];

  private nextEdgeIndex = 0;

  private speed = 1.8;

  private raycaster = new THREE.Raycaster();

  private mouse = new THREE.Vector2();

  private isJumping = false;

  private jumpVelocity = 0;

  private jumpBaseY = 0;

  private meowAudio: HTMLAudioElement;

  private tailBones: THREE.Object3D[] = [];

  private legBones: THREE.Object3D[] = [];

  private headBones: THREE.Object3D[] = [];

  private isStaring = false;

  private stareTimer = 0;

  private isVisible = true;

  private currentOpacity = 1;

  private visibilityTimer = 10 + Math.random() * 20;

  constructor(containerId: string, private modelUrl: string, meowUrl: string) {
    this.container = document.getElementById(containerId);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    this.camera.position.set(0, 2, 12);
    this.camera.lookAt(0, 0, 0);
    this.meowAudio = new Audio(meowUrl);
    this.timer.connect(document);

    this.onWindowResize = this.onWindowResize.bind(this);
    this.onClick = this.onClick.bind(this);
    this.animate = this.animate.bind(this);

    if (!this.container) {
      return;
    }

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    this.scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 10, 5);
    this.scene.add(directionalLight);

    this.init();
  }

  private init() {
    const loader = new GLTFLoader();
    loader.setResourcePath("/");
    loader.load(
      this.modelUrl,
      (gltf) => {
        this.catModel = gltf.scene;

        this.catModel.traverse((child) => {
          const nameInfo = child.name.toLowerCase();
          if (nameInfo.includes("tail")) {
            this.tailBones.push(child);
            child.userData.baseRotation = child.rotation.clone();
          }
          if (
            nameInfo.includes("leg") ||
            nameInfo.includes("arm") ||
            nameInfo.includes("paw") ||
            nameInfo.includes("foot") ||
            nameInfo.includes("hand")
          ) {
            this.legBones.push(child);
            child.userData.baseRotation = child.rotation.clone();
          }
          if (nameInfo.includes("head") || nameInfo.includes("neck")) {
            this.headBones.push(child);
            child.userData.baseRotation = child.rotation.clone();
          }

          if (!(child as THREE.Mesh).isMesh) {
            return;
          }

          const mesh = child as THREE.Mesh;
          mesh.frustumCulled = false;
          mesh.material = new THREE.MeshStandardMaterial({
            roughness: 0.9,
            metalness: 0.1,
            color: 0xffffff,
            transparent: true,
            opacity: 1,
          });

          const material = mesh.material as THREE.MeshStandardMaterial;

          if (
            nameInfo.includes("tail") ||
            nameInfo.includes("leg") ||
            nameInfo.includes("paw")
          ) {
            material.color.setHex(0x888888);
          } else if (nameInfo.includes("group")) {
            material.color.setHex(0x333333);
          } else {
            material.onBeforeCompile = (shader) => {
              shader.vertexShader = shader.vertexShader.replace(
                "#include <common>",
                "#include <common>\nvarying vec3 vLocalPos;",
              );
              shader.vertexShader = shader.vertexShader.replace(
                "#include <begin_vertex>",
                "#include <begin_vertex>\nvLocalPos = position;",
              );
              shader.fragmentShader = shader.fragmentShader.replace(
                "#include <common>",
                "#include <common>\nvarying vec3 vLocalPos;",
              );
              shader.fragmentShader = shader.fragmentShader.replace(
                "#include <color_fragment>",
                `#include <color_fragment>
vec3 spatialColor = diffuseColor.rgb;

if (vLocalPos.y > 1.22) {
  spatialColor = vec3(0.533, 0.533, 0.533);
}

if (abs(vLocalPos.x) < 0.12 && vLocalPos.y > 0.68 && vLocalPos.y < 0.8 && vLocalPos.z > 0.64) {
  spatialColor = vec3(1.0, 0.41, 0.71);
}

if (vLocalPos.z > 0.63 && vLocalPos.z < 0.64) {
  if (vLocalPos.y < 0.72) {
    spatialColor = vec3(0.15, 0.15, 0.15);
  } else {
    float dx = abs(vLocalPos.x) - 0.263;
    float dy = vLocalPos.y - 0.889;

    if (dx * dx + dy * dy < 0.006) {
      spatialColor = vec3(0.1, 0.1, 0.1);
    } else {
      spatialColor = vec3(1.0, 0.84, 0.0);
    }
  }
}

diffuseColor.rgb = spatialColor;`,
              );
            };
          }
        });

        const box = new THREE.Box3().setFromObject(this.catModel);
        const size = box.getSize(new THREE.Vector3()).length();
        const scale = 1.5 / size;
        this.catModel.scale.setScalar(scale);

        const offsetBox = new THREE.Box3().setFromObject(this.catModel);
        this.catModel.position.y = -offsetBox.min.y;

        this.modelWrapper = new THREE.Group();
        this.modelWrapper.add(this.catModel);
        this.modelWrapper.position.copy(this.getBorderTarget("bottom"));
        this.scene.add(this.modelWrapper);

        if (gltf.animations && gltf.animations.length > 0) {
          this.mixer = new THREE.AnimationMixer(this.catModel);

          gltf.animations.forEach((clip) => {
            const name = clip.name.toLowerCase();
            if (name.includes("idle") || name.includes("stand")) {
              this.animations.idle = this.mixer?.clipAction(clip) ?? null;
            } else if (name.includes("walk") || name.includes("run")) {
              this.animations.walk = this.mixer?.clipAction(clip) ?? null;
            }
          });

          if (!this.animations.walk && this.mixer) {
            this.animations.walk = this.mixer.clipAction(gltf.animations[0]);
          }

          if (!this.animations.idle) {
            this.animations.idle =
              gltf.animations.length > 1 && this.mixer
                ? this.mixer.clipAction(gltf.animations[1])
                : this.animations.walk;
          }

          this.playAnimation("idle");
        }

        globalThis.addEventListener("resize", this.onWindowResize);
        globalThis.addEventListener("click", this.onClick);
        this.scheduleNextMove();
        this.animate();
      },
      undefined,
      (error) => {
        console.error("Failed to load cat widget model", error);
      },
    );
  }

  private screenPointToWorld(screenX: number, screenY: number) {
    const ndcX = (screenX / window.innerWidth) * 2 - 1;
    const ndcY = -(screenY / window.innerHeight) * 2 + 1;
    const point = new THREE.Vector3(ndcX, ndcY, 0.5).unproject(this.camera);
    const direction = point.sub(this.camera.position).normalize();

    const epsilon = 1e-5;
    const dirZ = Math.abs(direction.z) < epsilon ? epsilon : direction.z;
    const t = (this.movementPlaneZ - this.camera.position.z) / dirZ;
    return this.camera.position.clone().add(direction.multiplyScalar(t));
  }

  private getBorderTarget(edge: "top" | "right" | "bottom" | "left") {
    const margin = 96;
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (edge === "top") {
      const x = margin + Math.random() * Math.max(1, width - margin * 2);
      return this.screenPointToWorld(x, margin);
    }

    if (edge === "right") {
      const y = margin + Math.random() * Math.max(1, height - margin * 2);
      return this.screenPointToWorld(width - margin, y);
    }

    if (edge === "bottom") {
      const x = margin + Math.random() * Math.max(1, width - margin * 2);
      return this.screenPointToWorld(x, height - margin);
    }

    const y = margin + Math.random() * Math.max(1, height - margin * 2);
    return this.screenPointToWorld(margin, y);
  }

  private playAnimation(name: "idle" | "walk") {
    const action = this.animations[name];
    if (!action || this.currentAction === action) {
      return;
    }

    if (this.currentAction) {
      this.currentAction.fadeOut(0.4);
    }

    action.reset().fadeIn(0.4).play();
    this.currentAction = action;
  }

  private playMeow() {
    this.meowAudio.currentTime = 0;
    this.meowAudio.play().catch((error) => {
      if ((error as DOMException).name !== "NotAllowedError") {
        console.warn("Audio play error", error);
      }
    });
  }

  private scheduleNextMove() {
    if (!this.modelWrapper) {
      return;
    }

    const edge = this.edgeOrder[this.nextEdgeIndex % this.edgeOrder.length];
    this.nextEdgeIndex += 1;
    this.targetPosition = this.getBorderTarget(edge);
    this.isMoving = true;
    this.playAnimation("walk");
    this.modelWrapper.lookAt(
      this.targetPosition.x,
      this.targetPosition.y,
      this.targetPosition.z,
    );
  }

  private onClick(event: MouseEvent) {
    if (!this.catModel || this.isJumping || !this.modelWrapper || !this.isVisible) {
      return;
    }

    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.catModel, true);

    if (intersects.length === 0) {
      return;
    }

    if (this.isStaring) {
      this.isStaring = false;
    }

    this.isMoving = false;
    this.playAnimation("idle");
    this.modelWrapper.lookAt(
      this.camera.position.x,
      this.modelWrapper.position.y,
      this.camera.position.z,
    );

    this.jumpBaseY = this.modelWrapper.position.y;
    this.isJumping = true;
    this.jumpVelocity = 8;

    globalThis.setTimeout(() => {
      this.playMeow();
    }, 500);
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    if (this.renderer) {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    if (!this.modelWrapper) {
      return;
    }

    this.targetPosition = this.getBorderTarget(
      this.edgeOrder[(this.nextEdgeIndex + this.edgeOrder.length - 1) % this.edgeOrder.length],
    );
  }

  private animate(timestamp?: number) {
    requestAnimationFrame(this.animate);

    this.timer.update(timestamp);
    const delta = Math.min(this.timer.getDelta(), 0.1);

    this.visibilityTimer -= delta;
    if (this.visibilityTimer <= 0) {
      this.isVisible = !this.isVisible;
      this.visibilityTimer = this.isVisible
        ? 15 + Math.random() * 30
        : 10 + Math.random() * 20;
    }

    const targetOpacity = this.isVisible ? 1 : 0;
    if (this.currentOpacity !== targetOpacity) {
      const fadeSpeed = 0.5; // 2 seconds fade
      if (this.currentOpacity < targetOpacity) {
        this.currentOpacity = Math.min(1, this.currentOpacity + fadeSpeed * delta);
      } else {
        this.currentOpacity = Math.max(0, this.currentOpacity - fadeSpeed * delta);
      }

      if (this.catModel) {
        this.catModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            ((child as THREE.Mesh).material as THREE.Material).opacity = this.currentOpacity;
          }
        });
      }

      if (this.modelWrapper) {
        this.modelWrapper.visible = this.currentOpacity > 0;
      }
    }

    if (this.mixer) {
      this.mixer.update(delta);
    }

    if (this.modelWrapper && !this.isStaring && !this.isJumping && Math.random() < 0.001) {
      this.isStaring = true;
      this.stareTimer = 10;
      this.isMoving = false;
      this.playAnimation("idle");
      this.modelWrapper.lookAt(
        this.camera.position.x,
        this.modelWrapper.position.y,
        this.camera.position.z,
      );
    }

    const time = this.timer.getElapsed();

    if (this.tailBones.length > 0) {
      this.tailBones.forEach((bone, index) => {
        if (!bone.userData.baseRotation) {
          return;
        }

        const speed = this.isStaring ? 30 : 15;
        const amplitude = this.isStaring ? 0.8 : 0.4;

        bone.rotation.z =
          bone.userData.baseRotation.z + Math.sin(time * speed + index * 0.2) * amplitude;
        bone.rotation.y =
          bone.userData.baseRotation.y + Math.cos(time * speed + index * 0.2) * (amplitude / 2);
      });
    }

    if (this.isStaring) {
      this.headBones.forEach((bone, index) => {
        if (!bone.userData.baseRotation) return;
        bone.rotation.z = bone.userData.baseRotation.z + Math.sin(time * 3 + index) * 0.4;
      });
    }

    if (this.modelWrapper) {
      if (this.isStaring) {
        this.stareTimer -= delta;
        if (this.stareTimer <= 0) {
          this.isStaring = false;
          this.scheduleNextMove();
        }
      } else if (this.isMoving) {
        const currentPos = new THREE.Vector3(
          this.modelWrapper.position.x,
          this.modelWrapper.position.y,
          this.modelWrapper.position.z,
        );
        const targetPos = new THREE.Vector3(
          this.targetPosition.x,
          this.targetPosition.y,
          this.targetPosition.z,
        );
        const distance = currentPos.distanceTo(targetPos);
        const moveStep = this.speed * delta;

        if (distance > moveStep) {
          const direction = new THREE.Vector3()
            .subVectors(targetPos, currentPos)
            .normalize();
          this.modelWrapper.position.x += direction.x * moveStep;
          this.modelWrapper.position.y += direction.y * moveStep;
          this.modelWrapper.position.z += direction.z * moveStep;
        } else {
          this.modelWrapper.position.x = this.targetPosition.x;
          this.modelWrapper.position.y = this.targetPosition.y;
          this.modelWrapper.position.z = this.targetPosition.z;
          this.scheduleNextMove();
        }
      }

      if (this.isJumping) {
        this.modelWrapper.position.y += this.jumpVelocity * delta;
        this.jumpVelocity -= 25 * delta;

        if (this.modelWrapper.position.y <= this.jumpBaseY) {
          this.modelWrapper.position.y = this.jumpBaseY;
          this.isJumping = false;
          this.scheduleNextMove();
        }
      }
    }

    if (this.renderer) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}

export function initCatWidget() {
  const hasDOM = typeof document !== "undefined";
  const hasWindow = typeof window !== "undefined";
  const hasWebGL = hasWindow && !!window.WebGLRenderingContext;

  if (!hasDOM || !hasWindow || !hasWebGL) {
    return null;
  }

  const container = document.getElementById("cat-widget-container");
  if (!container) {
    return null;
  }

  return new CatWidget("cat-widget-container", "/animal-cat.glb", "/meow.mp3");
}
