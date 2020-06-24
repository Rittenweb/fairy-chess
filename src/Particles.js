import React, { useEffect, useRef } from 'react';

const Particles = function Particles() {
  const ref = useRef(null);

  useEffect(() => {
    let canvas = ref.current;
    let context = canvas.getContext('2d');
    let particles = [];
    let tick = 0;
    let frame;

    function createNewParticles() {
      //check on every 10th tick check, so that all don't populate at once
      if (tick % 10 === 0) {
        //add particle if fewer than 40 onscreen
        if (particles.length < 40) {
          let radius = 1 + Math.random() * 3; //between 1 and 4
          let x = Math.random() * canvas.width; //between 0 and canvas width
          let gradient = context.createRadialGradient(x, 0, 0, x, 0, radius);
          let xSign = Math.random() > 0.5 ? -1 : 1;
          gradient.addColorStop(0, '#d5e770');
          gradient.addColorStop(1, '#eef3ae');
          particles.push({
            x: x,
            y: 0,
            xSpeed: (Math.random() / 2) * xSign, //between 0 and .5
            ySpeed: 0.5 + Math.random(), //between .5 and 1.5
            radius: radius,
            fill: gradient,
          });
        }
      }
    }
    function updateParticles() {
      for (let i in particles) {
        let part = particles[i];
        part.x += part.xSpeed;
        part.y += part.ySpeed;
        let gradient = context.createRadialGradient(
          part.x,
          part.y,
          0,
          part.x,
          part.y,
          part.radius
        );
        gradient.addColorStop(0, '#d5e770');
        gradient.addColorStop(1, '#eef3ae');
        part.fill = gradient;
      }
    }

    function killParticles() {
      for (let i in particles) {
        let part = particles[i];
        if (part.y > canvas.height || part.x > canvas.width || part.x < 0) {
          part.y = 0;
        }
      }
    }

    function drawParticles() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.shadowBlur = 10;
      context.shadowColor = 'white';
      for (let i in particles) {
        let part = particles[i];
        context.beginPath();
        context.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
        context.closePath();
        context.fillStyle = part.fill;
        context.fill();
      }
    }

    function loop() {
      frame = window.requestAnimationFrame(loop);
      createNewParticles();
      updateParticles();
      killParticles();
      drawParticles();
    }

    frame = window.requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
    };
  });

  return (
    <canvas
      ref={ref}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ position: 'fixed', zIndex: '-1' }}
    />
  );
};

export default React.memo(Particles);
