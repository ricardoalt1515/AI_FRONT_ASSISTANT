"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function EnhancedWaterBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Efecto para crear el fondo de agua avanzado
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ajustar el tamaño del canvas al tamaño de la ventana
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Crear capas de fluidos
    const layers = [
      { color: "rgba(14, 165, 233, 0.05)", speed: 0.01, scale: 100, points: [] },
      { color: "rgba(56, 189, 248, 0.06)", speed: 0.015, scale: 80, points: [] },
      { color: "rgba(2, 132, 199, 0.07)", speed: 0.02, scale: 60, points: [] },
    ];

    // Inicializar puntos para cada capa
    layers.forEach(layer => {
      const numPoints = Math.ceil(window.innerWidth / layer.scale);
      layer.points = Array.from({ length: numPoints + 2 }, (_, i) => ({
        x: (i - 1) * layer.scale,
        y: Math.random() * 50 - 25,
        phase: Math.random() * Math.PI * 2
      }));
    });

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dibuja un degradado base para el fondo
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(224, 242, 254, 0.6)"); // hydrous-100
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.9)");
      gradient.addColorStop(1, "rgba(240, 249, 255, 0.7)"); // hydrous-50

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dibuja cada capa de fluido
      layers.forEach((layer, layerIndex) => {
        // Actualizar puntos con movimiento
        layer.points.forEach(point => {
          point.phase += layer.speed;
          point.y = Math.sin(point.phase) * 20 + (Math.sin(time * 2) * 10);
        });

        // Dibujar la forma del agua
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        // Dibujar la línea superior con curvas
        for (let i = 0; i < layer.points.length - 1; i++) {
          const point = layer.points[i];
          const nextPoint = layer.points[i + 1];

          // El punto de control para la curva
          const xc = (point.x + nextPoint.x) / 2;
          const yc = (point.y + nextPoint.y) / 2;

          // Ajustar la posición vertical basada en la capa
          const verticalOffset = canvas.height * (0.5 + (layerIndex * 0.1));

          ctx.quadraticCurveTo(
            point.x,
            verticalOffset + point.y,
            xc,
            verticalOffset + yc
          );
        }

        // Cerrar la forma
        const lastPoint = layer.points[layer.points.length - 1];
        ctx.quadraticCurveTo(
          lastPoint.x,
          canvas.height * (0.5 + (layerIndex * 0.1)) + lastPoint.y,
          canvas.width,
          canvas.height * (0.5 + (layerIndex * 0.1))
        );
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        // Degradados específicos para cada capa
        const layerGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        switch (layerIndex) {
          case 0:
            layerGradient.addColorStop(0, "rgba(186, 230, 253, 0.3)"); // hydrous-200
            layerGradient.addColorStop(1, "rgba(125, 211, 252, 0.2)"); // hydrous-300
            break;
          case 1:
            layerGradient.addColorStop(0, "rgba(56, 189, 248, 0.2)"); // hydrous-400
            layerGradient.addColorStop(1, "rgba(14, 165, 233, 0.15)"); // hydrous-500
            break;
          case 2:
            layerGradient.addColorStop(0, "rgba(2, 132, 199, 0.15)"); // hydrous-600
            layerGradient.addColorStop(1, "rgba(3, 105, 161, 0.1)"); // hydrous-700
            break;
        }

        ctx.fillStyle = layerGradient;
        ctx.fill();
      });

      // Círculos de luz flotantes
      for (let i = 0; i < 5; i++) {
        const x = Math.sin(time + i) * canvas.width * 0.3 + canvas.width * 0.5;
        const y = Math.cos(time * 0.7 + i) * canvas.height * 0.2 + canvas.height * 0.4;
        const radius = 50 + Math.sin(time * 0.5 + i) * 20;

        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        glowGradient.addColorStop(0, "rgba(56, 189, 248, 0.15)");
        glowGradient.addColorStop(0.5, "rgba(14, 165, 233, 0.08)");
        glowGradient.addColorStop(1, "rgba(14, 165, 233, 0)");

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Canvas para la animación de agua */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Elementos de fondo estáticos para mejorar el efecto */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/40" />

      {/* Formas abstractas para agregar profundidad */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-blue-300/10 to-blue-500/5 filter blur-3xl opacity-30"
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-400/10 to-blue-500/5 filter blur-3xl opacity-20"
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "easeInOut"
        }}
      />

      {/* Partículas digitales en el fondo */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      {/* Highlights adicionales */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-blue-200/10 to-transparent opacity-40 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-blue-300/10 to-transparent opacity-30 blur-3xl" />
    </div>
  );
}
