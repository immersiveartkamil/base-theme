import * as THREE from "three";

class Controls {
  constructor() {
    this.params = {
      bgColor: new THREE.Color(0xd2d2d2),
      centerColor: new THREE.Color(0xb499e9),
      color1: new THREE.Color(0x7404dc),
      color2: new THREE.Color(0xfae083),
      color3: new THREE.Color(0xfd2d44),
      blur_radius: 80, // Ensure blur radius is set to 80
      enableGooey: true,
    };
  }
}

export default new Controls();
