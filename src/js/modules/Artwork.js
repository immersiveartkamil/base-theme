import * as THREE from "three";
import common from "./Common.js";
import controls from "./Controls.js";

const centerVert = `
uniform vec2 uMouse;
varying vec2 vUv;

void main(){
  vUv = uv;
  vec3 pos = position + vec3(uMouse * 0.3, 0.0); // Increased movement factor
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1.0);
}`;

const centerFrag = `
uniform float uTime;
uniform vec3 uColor;

varying vec2 vUv;
void main(){
  gl_FragColor = vec4(uColor + (vUv.x + vUv.y) * 0.2, 1.0);
}`;

const smallVert = `attribute vec3 aVelocity;
attribute vec2 aColorValue;
attribute vec3 aRandom;
uniform float uTime;
uniform float uAreaSize;

varying vec2 vColorValue;
varying vec2 vUv;

void main(){

  float time = uTime * mix(0.5, 1.5, aRandom.x) * 0.1;

  vec3 velocity = vec3(aVelocity.xy, 0.0);
  float life = fract(aVelocity.z + time);
  float scale = mix(1.0, 0.5, life) * mix(0.25, 1.0, aRandom.y * aRandom.y);
  vec3 pos = position * scale + velocity * life * uAreaSize;
  vUv = uv;
 

  vColorValue = aColorValue;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1.0);
}`;

const smallFrag = `
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

varying vec2 vColorValue;
varying vec2 vUv;

void main(){
  vec3 color = mix(uColor1, uColor2, vColorValue.x);
  color = mix(color, uColor3, vColorValue.y);

  color += (vUv.x + vUv.y) * 0.2;

  gl_FragColor = vec4(color, 1.0);

}`;

const screenVert = `
varying vec2 vUv;

void main(){
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}`;

const outputFrag = `
uniform sampler2D uDiffuse;
uniform bool uGooey;
varying vec2 vUv;
void main(){
  vec4 diffuse = texture2D(uDiffuse, vUv);
  if(uGooey){
    diffuse.a = min(1.0, diffuse.a * 80.0 - 10.0);
  }
  gl_FragColor = vec4(diffuse);
}`;
import GaussianBlur from "./GaussianBlur.js";

export default class Artwork {
  constructor(props) {
    this.props = props;
    this.centerCircle = null;
    this.smallCircles = null;
    this.smallCircleNum = 30;
    this.circlePosArray = [];
    this.group = new THREE.Group();
    this.mouse = new THREE.Vector2();
    this.centerCircleOffset = new THREE.Vector2();

    this.uniforms = {
      uTime: {
        value: 0,
      },
    };
    this.init();
  }

  init() {
    // controls.init();
    common.init({
      $wrapper: this.props.$wrapper,
    });
    common.scene.add(this.group);

    this.fbo = new THREE.WebGLRenderTarget(
      common.fbo_dimensions.x,
      common.fbo_dimensions.y
    );

    this.gaussianBlur = new GaussianBlur(this.fbo);

    this.outputMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        vertexShader: screenVert,
        fragmentShader: outputFrag,
        uniforms: {
          uDiffuse: {
            value: this.gaussianBlur.blurFbos[1].texture,
          },
          uGooey: {
            value: controls.params.enableGooey,
          },
        },
        transparent: true,
      })
    );

    this.createCenterCircle();
    this.createSmallCircles();

    window.addEventListener("mousemove", this.onMouseMove.bind(this));
    window.addEventListener("mousemove", this.spawnExtraCircles.bind(this)); // Add event listener for spawning extra circles

    this.introAnimation(); // Call the intro animation

    this.update();
  }

  introAnimation() {
    // Smooth transition for the center circle
    gsap.fromTo(
      this.centerCircle.scale,
      { x: 0.7, y: 0.7, z: 0.7 },
      { x: 1, y: 1, z: 1, duration: 2, ease: "power2.out" }
    );

    // Smooth transition for the small circles
    gsap.fromTo(
      this.smallCircles.scale,
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1, duration: 2, ease: "power2.out" }
    );

    // Subtle heartbeat pulse animation for the center circle
    gsap.to(this.centerCircle.scale, {
      x: 1.05,
      y: 1.05,
      z: 1.05,
      duration: 0.5,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
  }

  onMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  spawnExtraCircles() {
    const extraCircles = 5; // Number of extra circles to spawn
    const aVelocity = this.smallCircles.geometry.attributes.aVelocity;
    const aColorValue = this.smallCircles.geometry.attributes.aColorValue;
    const aRandom = this.smallCircles.geometry.attributes.aRandom;

    for (let i = 0; i < extraCircles; i++) {
      const radian = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.5 + 0.5;
      const index = this.smallCircleNum + i;
      aVelocity.setXYZ(
        index,
        Math.cos(radian) * speed,
        Math.sin(radian) * speed,
        Math.random()
      );
      aColorValue.setXY(index, Math.random(), Math.random());
      aRandom.setXYZ(index, Math.random(), Math.random(), Math.random());
    }

    this.smallCircleNum += extraCircles;
    this.smallCircles.geometry.instanceCount = this.smallCircleNum;
    aVelocity.needsUpdate = true;
    aColorValue.needsUpdate = true;
    aRandom.needsUpdate = true;
  }

  createCenterCircle() {
    this.centerCircle = new THREE.Mesh(
      new THREE.CircleGeometry(2, 128),
      new THREE.ShaderMaterial({
        vertexShader: centerVert,
        fragmentShader: centerFrag,
        uniforms: {
          ...this.uniforms,
          uColor: {
            value: controls.params.centerColor,
          },
          uMouse: {
            value: this.centerCircleOffset,
          },
        },
        depthTest: false,
      })
    );

    this.centerCircle.renderOrder = 2;
    this.group.add(this.centerCircle);
  }

  createSmallCircles() {
    const originalGeometry = new THREE.CircleGeometry(1, 64);
    const instancedGeometry = new THREE.InstancedBufferGeometry();

    instancedGeometry.count = this.smallCircleNum;

    const position = originalGeometry.attributes.position.clone();
    const uv = originalGeometry.attributes.uv.clone();

    const index = originalGeometry.getIndex().clone();

    instancedGeometry.setAttribute("position", position);
    instancedGeometry.setAttribute("uv", uv);

    instancedGeometry.setIndex(index);

    const aVelocity = new THREE.InstancedBufferAttribute(
      new Float32Array(this.smallCircleNum * 3),
      3,
      false,
      1
    );
    instancedGeometry.setAttribute("aVelocity", aVelocity);

    const aColorValue = new THREE.InstancedBufferAttribute(
      new Float32Array(this.smallCircleNum * 2),
      2,
      false,
      1
    );
    instancedGeometry.setAttribute("aColorValue", aColorValue);

    const aRandom = new THREE.InstancedBufferAttribute(
      new Float32Array(this.smallCircleNum * 3),
      3,
      false,
      1
    );
    instancedGeometry.setAttribute("aRandom", aRandom);

    for (let i = 0; i < this.smallCircleNum; i++) {
      const radian = Math.random() * Math.PI * 2;
      aVelocity.setXYZ(i, Math.cos(radian), Math.sin(radian), Math.random());
      aColorValue.setXY(i, Math.random(), Math.random());

      aRandom.setXYZ(i, Math.random(), Math.random(), Math.random());
    }

    const material = new THREE.ShaderMaterial({
      vertexShader: smallVert,
      fragmentShader: smallFrag,
      uniforms: {
        ...this.uniforms,
        uColor1: {
          value: controls.params.color1,
        },
        uColor2: {
          value: controls.params.color2,
        },
        uColor3: {
          value: controls.params.color3,
        },
        uAreaSize: {
          value: 10,
        },
      },
    });

    this.smallCircles = new THREE.Mesh(instancedGeometry, material);
    this.group.add(this.smallCircles);
  }

  resize() {
    common.resize();
    this.fbo.setSize(common.fbo_dimensions.x, common.fbo_dimensions.y);
    this.gaussianBlur.resize();
  }

  update() {
    common.update();
    this.outputMesh.material.uniforms.uGooey.value =
      controls.params.enableGooey;
    this.uniforms.uTime.value += common.delta;
    this.centerCircleOffset.lerp(this.mouse, 0.5); // Adjusted lerp factor for smoother movement
    this.centerCircle.material.uniforms.uMouse.value = this.centerCircleOffset;
    common.renderer.setClearColor(0xffffff, 0.0);
    common.renderer.setRenderTarget(this.fbo);
    common.renderer.render(common.scene, common.camera);

    this.gaussianBlur.update();

    common.renderer.setClearColor(controls.params.bgColor);
    common.renderer.setRenderTarget(null);
    common.renderer.render(this.outputMesh, common.camera);
    window.requestAnimationFrame(this.update.bind(this));
  }
}
