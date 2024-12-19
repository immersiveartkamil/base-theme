import * as THREE from "three";

import common from "./Common.js";

const vertexShader = `
varying vec2 vUv;

void main(){
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}`;

const fragmentShader = `
uniform sampler2D uDiffuse;
uniform vec2 uStep;
uniform vec2 uStepSize;
uniform float uWeight[BLUR_RADIUS];


varying vec2 vUv;

void main() {
  float count =  float(BLUR_RADIUS) - 1.0;

  vec4 color = vec4(0.0);
  vec4 sum = vec4(0.0);
  float w;
  float sumW = 0.0;
  float actualWeight;

  // loop
  for(int i = 0; i <  BLUR_RADIUS - 1; i++){
    w = uWeight[i];

    color = texture2D( uDiffuse, vUv - count * uStep * uStepSize);
    actualWeight = w * color.a;
    sum.rgb += color.rgb * actualWeight;
    sum.a += color.a * w;
    sumW += actualWeight;

    color = texture2D( uDiffuse, vUv + count * uStep * uStepSize);
    actualWeight = w * color.a;
    sum.rgb += color.rgb * actualWeight;
    sum.a += color.a * w;
    sumW += actualWeight;

    count--;
  }

  w = uWeight[BLUR_RADIUS - 1];

  color = texture2D( uDiffuse, vUv );
  actualWeight = w * color.a;
  sum.rgb += color.rgb * actualWeight;
  sum.a += color.a * w;
  sumW += actualWeight;

  gl_FragColor = vec4(sum.rgb / sumW, sum.a);
}`;

import controls from "./Controls.js";

export default class GaussianBlur {
  constructor(originalFbo) {
    this.weight = [];
    this.blurRadius = controls.params.blur_radius;

    this.vertical = null;
    this.horizontal = null;

    this.camera = new THREE.Camera();

    this.step = new THREE.Vector2();

    this.uniforms = {
      uStep: {
        value: this.step,
      },
      uWeight: {
        value: this.weight,
      },
    };

    this.defines = {
      BLUR_RADIUS: this.blurRadius,
    };

    this.init(originalFbo);
  }

  init(originalFbo) {
    this.blurFbos = [
      new THREE.WebGLRenderTarget(
        common.fbo_dimensions.x,
        common.fbo_dimensions.y
      ),
      new THREE.WebGLRenderTarget(
        common.fbo_dimensions.x,
        common.fbo_dimensions.y
      ),
    ];

    this.step.set(1 / common.fbo_dimensions.x, 1 / common.fbo_dimensions.y);

    this.makeWeight();

    this.vertical = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          ...this.uniforms,
          uDiffuse: {
            value: originalFbo.texture,
          },
          uStepSize: {
            value: new THREE.Vector2(0.0, 1.0),
          },
        },
        defines: this.defines,
      })
    );

    this.horizontal = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          ...this.uniforms,
          uDiffuse: {
            value: this.blurFbos[0].texture,
          },
          uStepSize: {
            value: new THREE.Vector2(1.0, 0.0),
          },
        },
        defines: this.defines,
      })
    );
  }

  makeWeight() {
    this.weight = [];
    var t = 0.0;

    for (let i = this.blurRadius - 1; i >= 0; i--) {
      var r = 1.0 + 2.0 * i;
      var w = Math.exp((-0.5 * (r * r)) / (this.blurRadius * this.blurRadius));
      this.weight.push(w);
      if (i > 0) {
        w *= 2.0;
      }
      t += w;
    }

    for (let i = 0; i < this.weight.length; i++) {
      this.weight[i] /= t;
    }

    this.uniforms.uWeight.value = this.weight;
  }

  resize() {
    for (let i = 0; i < this.blurFbos.length; i++) {
      this.blurFbos[i].setSize(
        common.fbo_dimensions.x,
        common.fbo_dimensions.y
      );
    }

    this.step.set(1 / common.fbo_dimensions.x, 1 / common.fbo_dimensions.y);
  }

  update() {
    if (this.blurRadius !== controls.params.blur_radius) {
      this.blurRadius = controls.params.blur_radius;
      this.defines.BLUR_RADIUS = controls.params.blur_radius;
      this.makeWeight();
      this.vertical.material.needsUpdate = true;
      this.horizontal.material.needsUpdate = true;
    }

    common.renderer.setRenderTarget(this.blurFbos[0]);
    common.renderer.render(this.vertical, this.camera);

    common.renderer.setRenderTarget(this.blurFbos[1]);
    common.renderer.render(this.horizontal, this.camera);
  }
}
