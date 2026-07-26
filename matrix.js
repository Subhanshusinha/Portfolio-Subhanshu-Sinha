/* ========================================
   CYBERSECURITY DATA & DEFENSE ANIMATION
   ======================================== */
const canvas = document.getElementById("network-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  
  let width, height;
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  // Floating Particles (Locks, Shields, Nodes)
  const items = [];
  const numItems = 35; // Number of floating icons/nodes

  for (let i = 0; i < numItems; i++) {
    items.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      type: Math.floor(Math.random() * 3), // 0: node, 1: lock, 2: shield
      size: Math.random() * 12 + 10,
      alpha: Math.random() * 0.4 + 0.1,
      glow: Math.random() > 0.6
    });
  }

  // Fast Data Packets moving along network lines
  const packets = [];
  const numPackets = 20;
  for (let i = 0; i < numPackets; i++) {
    packets.push(createPacket());
  }

  function createPacket() {
    const isHorizontal = Math.random() > 0.5;
    return {
      x: isHorizontal ? (Math.random() > 0.5 ? -50 : width + 50) : Math.random() * width,
      y: isHorizontal ? Math.random() * height : (Math.random() > 0.5 ? -50 : height + 50),
      vx: isHorizontal ? (Math.random() > 0.5 ? 4 : -4) : 0,
      vy: isHorizontal ? 0 : (Math.random() > 0.5 ? 4 : -4),
      length: Math.random() * 30 + 15,
      thickness: Math.random() * 2 + 1,
      life: 0,
      maxLife: Math.random() * 400 + 100
    };
  }

  // Custom vector drawing functions for icons
  function drawLock(x, y, s) {
    ctx.beginPath();
    ctx.rect(x - s/2, y, s, s*0.75); // Body
    ctx.moveTo(x - s/3, y);
    ctx.arc(x, y, s/3, Math.PI, 0); // Shackle
    ctx.stroke();
    // Keyhole
    ctx.beginPath();
    ctx.arc(x, y + s*0.25, s/8, 0, Math.PI*2);
    ctx.moveTo(x, y + s*0.25);
    ctx.lineTo(x, y + s*0.5);
    ctx.stroke();
  }

  function drawShield(x, y, s) {
    ctx.beginPath();
    ctx.moveTo(x, y - s/2); // Top middle
    ctx.lineTo(x + s/2, y - s/3); // Top right
    ctx.lineTo(x + s/2, y + s/4); // Right edge
    ctx.quadraticCurveTo(x, y + s*0.8, x, y + s); // Bottom point
    ctx.quadraticCurveTo(x, y + s*0.8, x - s/2, y + s/4); // Left edge
    ctx.lineTo(x - s/2, y - s/3); // Top left
    ctx.closePath();
    ctx.stroke();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines between items
    for(let i=0; i<items.length; i++) {
      for(let j=i+1; j<items.length; j++) {
        let dx = items[i].x - items[j].x;
        let dy = items[i].y - items[j].y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < 180) {
          ctx.beginPath();
          ctx.moveTo(items[i].x, items[i].y);
          ctx.lineTo(items[j].x, items[j].y);
          ctx.strokeStyle = `rgba(15, 224, 224, ${0.15 * (1 - dist/180)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Draw Floating Cyber Tools (Nodes, Locks, Shields)
    for(let item of items) {
      item.x += item.vx;
      item.y += item.vy;
      
      // Wrap around edges
      if (item.x < -50) item.x = width + 50;
      if (item.x > width + 50) item.x = -50;
      if (item.y < -50) item.y = height + 50;
      if (item.y > height + 50) item.y = -50;

      // Pulse alpha based on time
      let pulse = Math.sin(Date.now() / 1000 + item.size) * 0.2 + 0.8;
      
      ctx.strokeStyle = item.glow 
        ? `rgba(0, 255, 65, ${item.alpha * pulse})` 
        : `rgba(15, 224, 224, ${item.alpha * pulse})`;
      ctx.lineWidth = 1.5;
      
      if (item.glow) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00FF41";
      } else {
        ctx.shadowBlur = 0;
      }

      if(item.type === 0) {
        // Simple Node
        ctx.beginPath();
        ctx.arc(item.x, item.y, item.size/3, 0, Math.PI*2);
        ctx.stroke();
      } else if (item.type === 1) {
        // Lock Icon
        drawLock(item.x, item.y, item.size);
      } else {
        // Shield Icon
        drawShield(item.x, item.y, item.size);
      }
    }

    // Draw Data Packets zooming across
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#0FE0E0";
    ctx.strokeStyle = "#0FE0E0";
    ctx.lineCap = "round";

    for(let i=0; i<packets.length; i++) {
      let p = packets[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life++;

      ctx.lineWidth = p.thickness;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      if (p.vx !== 0) ctx.lineTo(p.x - Math.sign(p.vx)*p.length, p.y);
      if (p.vy !== 0) ctx.lineTo(p.x, p.y - Math.sign(p.vy)*p.length);
      ctx.stroke();

      // Reset packet if it dies or goes way off screen
      if (p.life > p.maxLife || p.x < -100 || p.x > width+100 || p.y < -100 || p.y > height+100) {
        packets[i] = createPacket();
      }
    }
    
    ctx.shadowBlur = 0; // reset
    requestAnimationFrame(animate);
  }
  
  animate();
}
