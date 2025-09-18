    // Spotlight follow cursor
    document.addEventListener("mousemove", (e) => {
      document.querySelector(".spotlight").style.setProperty("--x", e.clientX + "px");
      document.querySelector(".spotlight").style.setProperty("--y", e.clientY + "px");
    });

// Typewriter effect untuk heading
const heading = document.querySelector("h1");
const baseText = "Ready to dive in? Let’s go "; 
const words = ["Deeper", "Learn", "Connect", "Build"];
let wordIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const currentWord = words[wordIndex];
  if (!deleting) {
    // nambah karakter
    charIndex++;
    heading.innerHTML = baseText + `<span class="text-blue-400">${currentWord.substring(0, charIndex)}</span>`;
    if (charIndex === currentWord.length) {
      deleting = true;
      setTimeout(typeLoop, 1500); // jeda sebelum hapus
      return;
    }
  } else {
    // hapus karakter
    charIndex--;
    heading.innerHTML = baseText + `<span class="text-blue-400">${currentWord.substring(0, charIndex)}</span>`;
    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(typeLoop, deleting ? 60 : 120);
}

typeLoop();

function particleBurst(e) {
  for (let i = 0; i < 10; i++) {
    const particle = document.createElement("span");
    particle.className = "absolute w-2 h-2 bg-blue-400 rounded-full pointer-events-none";
    document.body.appendChild(particle);

    const x = e.clientX, y = e.clientY;
    particle.style.left = x + "px";
    particle.style.top = y + "px";

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 80;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    particle.animate([
      { transform: `translate(0,0) scale(1)`, opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) scale(0)`, opacity: 0 }
    ], { duration: 800, easing: "ease-out" }).onfinish = () => particle.remove();
  }
}
document.querySelectorAll("a").forEach(btn => {
  btn.addEventListener("mouseenter", particleBurst);
});


// ================== Hamburger Toggle ==================
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  menuBtn.classList.toggle("active");
  mobileMenu.classList.toggle("menu-open");

  // pastikan garis hamburger tetap putih
  const bars = menuBtn.querySelectorAll("span");
  bars.forEach(bar => {
    bar.style.backgroundColor = "#fff";
  });
});

// Klik link di dalam menu → smooth scroll + tutup menu
document.querySelectorAll(".menu-link").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
    
    // Tutup menu setelah klik
    mobileMenu.classList.remove("menu-open");
    menuBtn.classList.remove("active");
  });
});

// Klik area luar menu → tutup menu
document.addEventListener("click", (e) => {
  if (mobileMenu.classList.contains("menu-open")) {
    if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      mobileMenu.classList.remove("menu-open");
      menuBtn.classList.remove("active");
    }
  }
});


// ================== Parallax Scroll ==================
window.addEventListener("scroll", () => {
  document.querySelectorAll(".parallax").forEach(el => {
    let speed = el.getAttribute("data-speed") || 0.3;
    el.style.transform = `translateY(${window.scrollY * speed}px)`;
  });
});

// ================== Auto Typing Effect ==================
const typingTarget = document.querySelector(".typing-text");
if (typingTarget) {
  const text = typingTarget.dataset.text || "Build. Connect. Earn with Sk*rtz.";
  let i = 0;
  setInterval(() => {
    typingTarget.textContent = text.slice(0, i++);
    if (i > text.length) i = 0;
  }, 120);
}

// ================== Card Hover Tilt ==================
document.querySelectorAll(".glass").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;
    card.style.transform = `rotateY(${x/25}deg) rotateX(${-y/25}deg) scale(1.02)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateY(0) rotateX(0) scale(1)";
  });
});

// ================== Random Glow Hero Nodes ==================
setInterval(() => {
  const nodes = document.querySelectorAll(".node");
  if (!nodes.length) return;
  const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
  randomNode.style.boxShadow = "0 0 20px rgba(0,162,255,0.9)";
  setTimeout(() => randomNode.style.boxShadow = "0 0 15px rgba(255,255,255,0.08)", 600);
}, 800);

// Klik link di dalam menu → tutup menu
document.querySelectorAll(".menu-link").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
    mobileMenu.classList.remove("menu-open");
    menuBtn.classList.remove("active");
  });
});

// Klik area luar menu → tutup menu
document.addEventListener("click", (e) => {
  if (mobileMenu.classList.contains("menu-open")) {
    if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      mobileMenu.classList.remove("menu-open");
      menuBtn.classList.remove("active");
    }
  }
});


    // Smooth scroll for nav
    document.querySelectorAll(".menu-link").forEach(link => {
      link.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });
        mobileMenu.classList.add("hidden");
        menuBtn.classList.remove("active");
      });
    });

    // Scroll reveal
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add("active"); } });
    }, {threshold: 0.1});
    reveals.forEach(r => observer.observe(r));

    // Mouse interactivity
    let mouseX = 0, mouseY = 0;
    window.addEventListener("mousemove", (e) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
    });

    // Scroll inertia
    let targetScroll = 0;
    let currentScroll = 0;
    window.addEventListener("scroll", () => { targetScroll = window.scrollY; });

    // Three.js Setup helper
    function setupScene(canvasId, geometry, color) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);

      const mat = new THREE.MeshStandardMaterial({ color: color, wireframe: true, emissive: color, emissiveIntensity: 0.6 });
      const mesh = new THREE.Mesh(geometry, mat);
      scene.add(mesh);

      const light = new THREE.PointLight(0xffffff, 1);
      light.position.set(10,10,10);
      scene.add(light);

      camera.position.z = 6;

      function animate(){
        requestAnimationFrame(animate);
        currentScroll += (targetScroll - currentScroll) * 0.05;
        mesh.rotation.x = currentScroll * 0.001 + mouseY * 0.5;
        mesh.rotation.y = currentScroll * 0.001 + mouseX * 0.5;
        mesh.position.y = Math.sin(currentScroll * 0.002) * 0.5;
        renderer.render(scene, camera);
      }
      animate();
    }

    // Responsive Performance Mode
const isMobile = window.innerWidth < 768;
if (!isMobile) {
  setupScene("three-features", new THREE.IcosahedronGeometry(2, 1), 0xff4da6);   // pink
  setupScene("three-resources", new THREE.TorusGeometry(2, 0.6, 16, 100), 0xffcc00); // kuning
  setupScene("three-launch", new THREE.SphereGeometry(2, 32, 32), 0x00aaff);    // biru
  setupScene("three-cases", new THREE.TorusKnotGeometry(1.5, 0.4, 100, 16), 0x0044cc); // biru tua
  setupScene("three-updates", new THREE.DodecahedronGeometry(2, 0), 0x33cc33);  // hijau
  setupScene("three-contact", new THREE.OctahedronGeometry(2, 0), 0xcc33ff);    // ungu
} else {
  ["three-features","three-resources","three-launch","three-cases","three-updates","three-contact"]
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) el.remove();
    });
}

   // Setup scene logo
const logoContainer = document.getElementById("logo-canvas");
const logoScene = new THREE.Scene();
const logoCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
logoCamera.position.z = 5;

const logoRenderer = new THREE.WebGLRenderer({ alpha: true });
logoRenderer.setSize(48, 48); // biar lebih pas
logoContainer.appendChild(logoRenderer.domElement);

// Light
const logoLight = new THREE.PointLight(0xffffff, 1);
logoLight.position.set(5, 5, 5);
logoScene.add(logoLight);

let textMesh;

// Huruf S lightning
const fontLoader = new THREE.FontLoader();
fontLoader.load("https://threejs.org/examples/fonts/helvetiker_bold.typeface.json", function (font) {
  const textGeo = new THREE.TextGeometry("S", {
    font: font,
    size: 1.8,
    height: 0.3,
    curveSegments: 8,
  });

  // distort geometry biar zigzag
  textGeo.translate(-0.9, -1, 0); 
  const pos = textGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    let y = pos.getY(i);
    if (y > 0.5) pos.setX(i, pos.getX(i) * 1.1 + 0.2);
    if (y < -0.5) pos.setX(i, pos.getX(i) * 0.9 - 0.2);
  }

  const textMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0x0044cc, 
    emissiveIntensity: 0.7,
    metalness: 0.5,
    roughness: 0.2,
  });
  textMesh = new THREE.Mesh(textGeo, textMat);
  logoScene.add(textMesh);
});

// Snowflakes biru salju
const flakes = new THREE.BufferGeometry();
const flakeCount = 200;
const positions = new Float32Array(flakeCount * 3);
for (let i = 0; i < flakeCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 8;
}
flakes.setAttribute("position", new THREE.BufferAttribute(positions, 3));
const flakeMat = new THREE.PointsMaterial({
  color: 0x00ccff, 
  size: 0.06,
});
const flakeSystem = new THREE.Points(flakes, flakeMat);
logoScene.add(flakeSystem);

// Hover glow boost
logoContainer.addEventListener("mouseenter", () => {
  if (textMesh) textMesh.material.emissiveIntensity = 2;
});
logoContainer.addEventListener("mouseleave", () => {
  if (textMesh) textMesh.material.emissiveIntensity = 0.7;
});

// Animasi
function animateLogo() {
  requestAnimationFrame(animateLogo);
  flakeSystem.rotation.y += 0.001;
  flakeSystem.rotation.x += 0.0007;
  if (textMesh) {
    textMesh.rotation.z = Math.sin(Date.now() * 0.002) * 0.1; 
  }
  logoRenderer.render(logoScene, logoCamera);
}
animateLogo();

// Formspree AJAX handling
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async function(e) {
  e.preventDefault();
  const data = new FormData(form);
  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
      status.textContent = " Thanks! Your message has been sent 🌱";
      status.className = "text-blue-400 mt-4";
      form.reset();
    } else {
      const result = await response.json();
      status.textContent = result.error || "❌ Oops! Something went wrong.";
      status.className = "text-red-400 mt-4";
    }
  } catch (error) {
    status.textContent = "❌ Network error. Please try again.";
    status.className = "text-red-400 mt-4";
  }
});
