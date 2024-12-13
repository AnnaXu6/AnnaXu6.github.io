import './index.css';
import $  from 'jquery';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import WaveSurfer from 'wavesurfer.js'
import rstudioIcon from './assets/RStudio.png';
import Latex from './assets/LaTeX.png';
import MySQL from './assets/MySQL.png';
import redis from './assets/redis.png';
import Windows from './assets/Windows.png';
import linux from './assets/linux.png';
import linkin from './assets/linkin.png';
import javascript from './assets/javascript.png';
import css from './assets/css.png';

function updateSlidePositions() {
  // Get the width and position of the currently active link
  var currentWidth = $("#bar li:nth-of-type(3) a").parent("li").width();
  var currentPosition = $("li:nth-of-type(3) a").position();

  // Update slide1
  $("#bar .slide1").css({left: +currentPosition.left, width: currentWidth, opacity: 1  // Ensuring slide1 is visible when clicked or resized
  });
}

// Initial update on document ready or specific trigger actions
$(document).ready(function() {
  updateSlidePositions();
});

// Update on window resize
$(window).resize(function() {
});

$("#bar a").on("click", function(){
  var position = $(this).parent().position();
  var width = $(this).parent().width();
  $("#bar .slide1").css({opacity: 1, left: +position.left, width: width});
});

$("#bar a").on("mouseover", function(){
  var position = $(this).parent().position();
  var width = $(this).parent().width();
  $("#bar .slide2").css({opacity: 1, left: +position.left, width: width}).addClass("squeeze");
});

$("#bar a").on("mouseout", function(){
  $("#bar .slide2").css({opacity: 0}).removeClass("squeeze");
});

document.addEventListener('scroll', () => {
  const topSection = document.querySelector('.Top');
  const scrollPosition = window.scrollY; // 当前滚动距离
  const maxScroll = 200; // 滚动最大距离（控制模糊程度）

  // 根据滚动距离计算模糊程度
  const blurValue = Math.min(scrollPosition / maxScroll * 1, 5); // 最大模糊 5px
  topSection.style.filter = `blur(${blurValue}px)`; // 设置模糊效果
});

document.addEventListener('scroll', () => {
  const elements = document.querySelectorAll('.E'); // 选择所有 .E 元素
  elements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      element.classList.add('visible');
    } else {
      element.classList.remove('visible');
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const skillsContainer = document.getElementById('three-canvas-renderer');
  const scene = new THREE.Scene();

  //点光源
  var point = new THREE.PointLight(0xffffff);
  point.position.set(400, 200, 300); //点光源位置
  //scene.add(point); //点光源添加到场景中
  //环境光
  var ambient = new THREE.AmbientLight(0x444444);
  scene.add(ambient);

  const width = skillsContainer.offsetWidth; // Container width
  const height = skillsContainer.offsetHeight; // Container height
  const camera = new THREE.PerspectiveCamera(25, width / height, 1, 10000);
  camera.position.set(0, 0, 3000);

  // 创建图片图标
  function createImageIcon(imagePath, width = 50, height = 50) {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(imagePath);

    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);

    sprite.scale.set(width, height, 1);
    return sprite;
  }

  const imageIcons = [
    rstudioIcon,
    Latex,
    MySQL,
    redis,
    Windows,
    linux,
    linkin,
    javascript,
    css,
    "https://global.discourse-cdn.com/flex035/uploads/threejs/original/2X/e/e4f86d2200d2d35c30f7b1494e96b9595ebc2751.png",
    "https://cdn-icons-png.flaticon.com/512/25/25231.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Git_icon.svg/1200px-Git_icon.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/2048px-Visual_Studio_Code_1.35_icon.svg.png",
    "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/701px-Python-logo-notext.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/120px-Node.js_logo.svg.png",
    "https://banner2.cleanpng.com/20180518/yk/avraxewhx.webp",
    "https://cdn-icons-png.flaticon.com/512/2/2235.png",
    "https://cdn-icons-png.freepik.com/256/2103/2103665.png?ga=GA1.1.1255655309.1733808568&semt=ais_hybrid",
    "https://www.freeiconspng.com/thumbs/windows-icon-png/cute-ball-windows-icon-png-16.png",
    "https://cdn-icons-png.flaticon.com/512/9850/9850812.png",
    "https://upload.wikimedia.org/wikipedia/commons/7/77/Qgis-icon-3.0.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Jupyter_logo.svg/88px-Jupyter_logo.svg.png",
    "https://cdn-icons-png.freepik.com/256/4248/4248443.png?semt=ais_hybrid",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Pandas_mark.svg/180px-Pandas_mark.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Matlab_Logo.png/240px-Matlab_Logo.png"
  ];

  const points = [];
  // Create group and add text sprites
  const group = new THREE.Group();
  for (var i = 0, l = 27; i < l; i++) {
    const phi = Math.acos(-1 + (2 * i) / l);
    const theta = Math.sqrt(l * Math.PI) * phi;

    const imagePath = imageIcons[i % imageIcons.length];
    const imageSprite = createImageIcon(imagePath);
    
    imageSprite.scale.set(130, 130, 1)
    imageSprite.position.setFromSphericalCoords(500, phi, theta);

    group.add(imageSprite);
  }
  scene.add(group);
  

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0xffffff });
  const line = new THREE.Line(geometry, material);
  scene.add(line);

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = false;
  renderer.setPixelRatio(window.devicePixelRatio);

  // Append renderer to the container
  skillsContainer.appendChild(renderer.domElement);
  if (skillsContainer) {
    skillsContainer.appendChild(renderer.domElement);
    } else {
    console.error("Container for Three.js rendering not found!");
  }

  // Orbit controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // Render loop
  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    group.rotateY(-0.001); // Rotate group
    group.rotateX(0.001);
    controls.update();
  }
  render();
  
// Update renderer size on window resize
  window.addEventListener("resize", () => {
    const newWidth = skillsContainer.offsetWidth;
    const newHeight = skillsContainer.offsetHeight;

    renderer.setSize(newWidth, newHeight);
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
  });

});

const audioElements = document.querySelectorAll('.audio');
const waveSurfers = []; // 存储所有 WaveSurfer 实例

audioElements.forEach((audioElement) => {
  const playBtn = audioElement.querySelector('.playBtn');
  const waveformContainer = audioElement.querySelector('.waveform');
  const audioFile = playBtn.getAttribute('data-audio');

  const wavesurfer = WaveSurfer.create({
    container: waveformContainer,
    waveColor: '#ddd',
    progressColor: '#bdcdde',
    barWidth: 4,
    responsive: true,
    height: 90,
    barRadius: 4
  });

  wavesurfer.load(audioFile);
  waveSurfers.push(wavesurfer); // 将实例存储到数组中



  playBtn.addEventListener('click', () => {
    // 暂停所有其他音频
    waveSurfers.forEach((ws) => {
      if (ws !== wavesurfer) {
        ws.pause();
      }
    });

    // 播放/暂停当前音频
    wavesurfer.playPause();
  });
});

