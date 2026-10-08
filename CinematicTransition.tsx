import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  FastForward,
  ShieldCheck,
  Brain,
  Code2,
  Rocket,
  Award,
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';

export const CinematicTransition: React.FC = () => {
  const { isTransitioning, activeSimulation, userProfile, skipTransition } = useCareer();
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Phase tracking (0 to 16 seconds sequence)
  const [elapsedTimeSec, setElapsedTimeSec] = useState(0);
  const [warpVelocity, setWarpVelocity] = useState(1200);

  const getCandidateName = () => {
    return userProfile.studentData?.name || userProfile.professionalData?.name || userProfile.aspirantData?.name || 'Explorer';
  };

  useEffect(() => {
    if (!isTransitioning || !canvasContainerRef.current) return;

    const container = canvasContainerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020308, 0.0025);

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 3000);
    camera.position.set(0, 0, 95);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x020308, 1);
    container.appendChild(renderer.domElement);

    // 3. Cosmic Ambient Stars & Speed Particles (0:00 - 0:02)
    const starCount = 3800;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starCols = new Float32Array(starCount * 3);

    const neonPalette = [
      new THREE.Color(0x00ff88), // Neon Emerald
      new THREE.Color(0x00f0ff), // Cyan
      new THREE.Color(0xff007f), // Neon Pink
      new THREE.Color(0x818cf8), // Electric Indigo
      new THREE.Color(0xffffff), // Pure White
      new THREE.Color(0xfbbf24), // Amber Flare
    ];

    for (let i = 0; i < starCount; i++) {
      const radius = 18 + Math.random() * 85;
      const angle = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 1900;

      starPos[i * 3] = Math.cos(angle) * radius;
      starPos[i * 3 + 1] = Math.sin(angle) * radius;
      starPos[i * 3 + 2] = z;

      const col = neonPalette[Math.floor(Math.random() * neonPalette.length)];
      starCols[i * 3] = col.r;
      starCols[i * 3 + 1] = col.g;
      starCols[i * 3 + 2] = col.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCols, 3));

    const starMat = new THREE.PointsMaterial({
      size: 2.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 4. Lusion-Style 3D Floating Astronaut Figure (0:00 - 0:08)
    const astronautGroup = new THREE.Group();

    // Helmet with Golden/Cyan Mirror Visor
    const helmetGeo = new THREE.SphereGeometry(3.6, 24, 24);
    const helmetMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      wireframe: true,
      metalness: 0.9,
      roughness: 0.1,
    });
    const helmet = new THREE.Mesh(helmetGeo, helmetMat);
    astronautGroup.add(helmet);

    const visorGeo = new THREE.SphereGeometry(2.7, 20, 20, 0, Math.PI * 2, 0, Math.PI * 0.55);
    const visorMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.85,
    });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 0.2, 1.4);
    visor.rotation.x = Math.PI * 0.45;
    astronautGroup.add(visor);

    // Suit Torso
    const suitTorsoGeo = new THREE.CylinderGeometry(3.0, 2.4, 6.4, 16);
    const suitTorsoMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      wireframe: true,
    });
    const suitTorso = new THREE.Mesh(suitTorsoGeo, suitTorsoMat);
    suitTorso.position.y = -5.0;
    astronautGroup.add(suitTorso);

    // Jetpack Thruster Backpack with Neon Core
    const jetpackGeo = new THREE.BoxGeometry(4.2, 5.2, 2.2);
    const jetpackMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
    });
    const jetpack = new THREE.Mesh(jetpackGeo, jetpackMat);
    jetpack.position.set(0, -4.8, -2.4);
    astronautGroup.add(jetpack);

    // Drifting Limbs
    const limbMat = new THREE.MeshBasicMaterial({ color: 0x00ff88, wireframe: true });

    // Left Arm
    const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.6, 4.8, 10), limbMat);
    leftArm.position.set(-4.0, -4.2, 0.6);
    leftArm.rotation.z = 0.9;
    leftArm.rotation.x = 0.5;
    astronautGroup.add(leftArm);

    // Right Arm
    const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.6, 4.8, 10), limbMat);
    rightArm.position.set(4.0, -4.2, 0.6);
    rightArm.rotation.z = -0.9;
    rightArm.rotation.x = -0.5;
    astronautGroup.add(rightArm);

    // Left Leg
    const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.7, 5.5, 10), limbMat);
    leftLeg.position.set(-1.8, -10.5, 0.5);
    leftLeg.rotation.z = 0.3;
    leftLeg.rotation.x = 0.3;
    astronautGroup.add(leftLeg);

    // Right Leg
    const rightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.7, 5.5, 10), limbMat);
    rightLeg.position.set(1.8, -10.5, -0.5);
    rightLeg.rotation.z = -0.2;
    rightLeg.rotation.x = -0.4;
    astronautGroup.add(rightLeg);

    astronautGroup.position.set(0, 0, 40);
    scene.add(astronautGroup);

    // 5. High-Tech Neon Geometric Digital Tunnel Rings (0:05 - 0:12)
    const tunnelGroup = new THREE.Group();
    const ringCount = 38;
    for (let i = 0; i < ringCount; i++) {
      const ringGeo = new THREE.TorusGeometry(32 + Math.sin(i * 0.4) * 6, 0.45, 8, 48);
      const ringColor = i % 3 === 0 ? 0x00ff88 : i % 3 === 1 ? 0x00f0ff : 0xff007f;
      const ringMat = new THREE.MeshBasicMaterial({
        color: ringColor,
        wireframe: true,
        transparent: true,
        opacity: 0.55,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.z = -i * 60;
      tunnelGroup.add(ring);
    }
    scene.add(tunnelGroup);

    // 6. Floating 3D Holographic Career Artifact Badges (0:11 - 0:15)
    const floatCardsGroup = new THREE.Group();
    const cardColors = [0x00f0ff, 0x00ff88, 0xff007f, 0xa855f7, 0xfbbf24];
    for (let i = 0; i < 22; i++) {
      const cardGeo = new THREE.BoxGeometry(7, 9, 0.4);
      const cardMat = new THREE.MeshBasicMaterial({
        color: cardColors[i % cardColors.length],
        wireframe: true,
        transparent: true,
        opacity: 0.65,
      });
      const cardMesh = new THREE.Mesh(cardGeo, cardMat);
      const angle = (i / 22) * Math.PI * 2;
      const dist = 24 + Math.random() * 18;
      cardMesh.position.set(
        Math.cos(angle) * dist,
        Math.sin(angle) * dist,
        -(i * 55) - 100
      );
      cardMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      floatCardsGroup.add(cardMesh);
    }
    scene.add(floatCardsGroup);

    // 7. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x00f0ff, 4, 350);
    cyanPointLight.position.set(0, 30, 60);
    scene.add(cyanPointLight);

    const pinkPointLight = new THREE.PointLight(0xff007f, 3, 350);
    pinkPointLight.position.set(0, -30, -100);
    scene.add(pinkPointLight);

    // 8. Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 9. Animation Flight Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let flightVelocity = 3.0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const totalElapsed = clock.getElapsedTime();
      setElapsedTimeSec(totalElapsed);

      // Accelerate flight speed during vortex phase
      if (totalElapsed > 2.0) {
        flightVelocity += 0.045;
      }
      setWarpVelocity(Math.floor(1200 + flightVelocity * 1150));

      // 1. Move Star Particles
      const starPosAttr = starGeo.attributes.position as THREE.BufferAttribute;
      const starPosArr = starPosAttr.array as Float32Array;
      for (let i = 0; i < starCount; i++) {
        starPosArr[i * 3 + 2] += flightVelocity * 1.5;
        if (starPosArr[i * 3 + 2] > 140) {
          starPosArr[i * 3 + 2] = -900;
        }
      }
      starPosAttr.needsUpdate = true;
      starField.rotation.z = totalElapsed * 0.15;

      // 2. Move Digital Tunnel Rings
      tunnelGroup.children.forEach((r, idx) => {
        r.position.z += flightVelocity * 1.4;
        r.rotation.z += 0.015 * (idx % 2 === 0 ? 1 : -1);
        if (r.position.z > 120) {
          r.position.z = -ringCount * 55;
        }
      });

      // 3. Move Floating Holographic 3D Cards
      floatCardsGroup.children.forEach(c => {
        c.position.z += flightVelocity * 1.2;
        c.rotation.x += 0.02;
        c.rotation.y += 0.025;
        if (c.position.z > 120) {
          c.position.z = -1200;
        }
      });

      // 4. Astronaut Micro-Gravity Floating & Dive Action
      astronautGroup.position.y = Math.sin(totalElapsed * 2.2) * 2.8 - mouseY * 10;
      astronautGroup.position.x = Math.cos(totalElapsed * 1.6) * 2.2 + mouseX * 14;
      astronautGroup.rotation.y = mouseX * 0.75;
      astronautGroup.rotation.x = -mouseY * 0.5;
      astronautGroup.rotation.z = Math.sin(totalElapsed * 1.2) * 0.2;

      // Move astronaut forward into tunnel during dive
      if (totalElapsed > 3.0) {
        astronautGroup.position.z -= (totalElapsed - 3.0) * 8.0;
      }

      // Camera dynamic tracking
      camera.position.x += (mouseX * 10 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 10 - camera.position.y) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
    };
  }, [isTransitioning]);

  if (!isTransitioning) return null;

  // Cinematic Sequence Phase Determinations (0 to 16 seconds sequence)
  const isPhase1 = elapsedTimeSec < 2.0;               // 0:00 - 0:02: Floating Astronaut in Deep Space
  const isPhase2 = elapsedTimeSec >= 2.0 && elapsedTimeSec < 5.0; // 0:02 - 0:05: Cinematic Text & Dive
  const isPhase3 = elapsedTimeSec >= 5.0 && elapsedTimeSec < 11.0; // 0:05 - 0:10: Neon Digital Tunnel Vortex
  const isPhase4 = elapsedTimeSec >= 11.0 && elapsedTimeSec < 15.0; // 0:11 - 0:15: Holographic Badges & Approaching Horizon
  const isPhase5 = elapsedTimeSec >= 15.0;              // 0:15 - 0:16: Blinding Portal Flash & Reveal

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020308] text-white overflow-hidden select-none font-sans">
      
      {/* 3D WebGL Three.js Canvas Layer */}
      <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Cyberpunk Vignette & Atmospheric Glow */}
      <div className="absolute inset-0 bg-radial from-transparent via-slate-950/50 to-[#020308] pointer-events-none" />

      {/* Floating Skip to Dashboard Action */}
      <div className="absolute top-6 right-6 z-30">
        <button
          onClick={skipTransition}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white font-mono text-xs font-bold shadow-lg transition-all active:scale-95 cursor-pointer"
        >
          <span>Skip to Dashboard</span>
          <FastForward className="w-4 h-4 text-cyan-400" />
        </button>
      </div>

      {/* =========================================================================
          PHASE 1: THE ENTRY & FLOATING ASTRONAUT (0:00 - 0:02)
          ========================================================================= */}
      <AnimatePresence>
        {isPhase1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="relative z-20 text-center space-y-4 max-w-xl mx-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold tracking-widest shadow-lg shadow-cyan-500/25">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>ZERO-GRAVITY TRAJECTORY CALIBRATION</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white drop-shadow-2xl">
              Initiating Futuris...
            </h2>
            <p className="text-xs sm:text-sm text-cyan-300 font-mono">
              Pilot: {getCandidateName()} • Target: {activeSimulation.careerTitle}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          PHASE 2: CINEMATIC TYPOGRAPHY & DIVE (0:02 - 0:05)
          ========================================================================= */}
      <AnimatePresence>
        {isPhase2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.4, y: -40 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 text-center space-y-6 max-w-3xl mx-4 p-8 rounded-3xl bg-slate-950/75 backdrop-blur-md border border-cyan-500/30 shadow-2xl"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono font-extrabold text-emerald-400 uppercase tracking-widest">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Neural Trajectory Warp</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-pink-500 leading-tight drop-shadow-2xl">
              "Step into your future and let your ambitions run wild"
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 font-mono tracking-wider">
              Synthesizing 3 Multi-Future Dimensions for {activeSimulation.careerTitle}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          PHASE 3: NEON DIGITAL TUNNEL / VORTEX (0:05 - 0:10)
          ========================================================================= */}
      <AnimatePresence>
        {isPhase3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-full max-w-lg px-4"
          >
            <div className="p-5 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-emerald-500/30 shadow-2xl space-y-3 text-center">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  NEON DIGITAL VORTEX
                </span>
                <span className="font-extrabold text-cyan-300 tracking-widest">
                  WARP: {warpVelocity.toLocaleString()} KM/S
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-pink-500 animate-pulse"
                  style={{ width: `${Math.min(100, (elapsedTimeSec / 15) * 100)}%` }}
                />
              </div>

              <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-widest">
                Traversing Quantum Career Trajectories
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          PHASE 4: FLOATING 3D HUD STICKERS & ICONS (0:11 - 0:15)
          ========================================================================= */}
      <AnimatePresence>
        {isPhase4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-20 max-w-4xl mx-auto px-4 w-full text-center space-y-6"
          >
            {/* Holographic Flying Stickers Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
              <motion.div
                initial={{ scale: 0, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="p-3.5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-cyan-400/40 text-cyan-300 flex items-center gap-2.5 shadow-xl shadow-cyan-500/10"
              >
                <Brain className="w-5 h-5 text-cyan-400 shrink-0" />
                <span className="text-xs font-bold text-white text-left">3 Multi-Futures Ready</span>
              </motion.div>

              <motion.div
                initial={{ scale: 0, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="p-3.5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-emerald-400/40 text-emerald-300 flex items-center gap-2.5 shadow-xl shadow-emerald-500/10"
              >
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-white text-left">Cryptographic Proofs</span>
              </motion.div>

              <motion.div
                initial={{ scale: 0, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="p-3.5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-pink-400/40 text-pink-300 flex items-center gap-2.5 shadow-xl shadow-pink-500/10"
              >
                <Code2 className="w-5 h-5 text-pink-400 shrink-0" />
                <span className="text-xs font-bold text-white text-left">Live Code IDE</span>
              </motion.div>

              <motion.div
                initial={{ scale: 0, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="p-3.5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-purple-400/40 text-purple-300 flex items-center gap-2.5 shadow-xl shadow-purple-500/10"
              >
                <Zap className="w-5 h-5 text-purple-400 shrink-0" />
                <span className="text-xs font-bold text-white text-left">Custom Regain Focus</span>
              </motion.div>

              <motion.div
                initial={{ scale: 0, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="p-3.5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-amber-400/40 text-amber-300 flex items-center gap-2.5 shadow-xl shadow-amber-500/10"
              >
                <Award className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-xs font-bold text-white text-left">Creative ATS Resume</span>
              </motion.div>

              <motion.div
                initial={{ scale: 0, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="p-3.5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-indigo-400/40 text-indigo-300 flex items-center gap-2.5 shadow-xl shadow-indigo-500/10"
              >
                <Rocket className="w-5 h-5 text-indigo-400 shrink-0" />
                <span className="text-xs font-bold text-white text-left">Nova AI Copilot</span>
              </motion.div>
            </div>

            <div className="pt-2">
              <span className="text-xs font-mono font-bold text-cyan-300 animate-pulse uppercase tracking-widest">
                ⚡ Approaching Portal Horizon...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          PHASE 5: THE PORTAL REVEAL FLASH (0:15 - 0:16)
          ========================================================================= */}
      <AnimatePresence>
        {isPhase5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 bg-white flex items-center justify-center pointer-events-none"
          >
            <div className="w-96 h-96 rounded-full bg-cyan-300/60 blur-[140px] animate-ping" />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
