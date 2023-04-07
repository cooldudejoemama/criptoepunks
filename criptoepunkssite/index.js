window.onload = function () {

  
  // Matter.js module aliases
  const Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

  // Create the Matter.js engine
  const engine = Engine.create();
  engine.world.gravity.y = 9.81 * 0.015; // Set gravity to Earth's gravity

  const render = Render.create({
    element: document.querySelector(".punkdisplay"),
    engine: engine,
    options: {
      width: window.innerWidth,
      height: window.innerHeight,
      wireframes: false,
      background: "transparent",
    },
  });
  

  // Generate random coordinates within the bordered section
  const punkDisplayRect = document.querySelector(".punkdisplay").getBoundingClientRect();
  const randomCoordinates = () => {
    const x = Math.random() * (window.innerWidth - 50) + 25;
    const y = Math.random() * (window.innerHeight - 50) + 25;
    return { x, y };
  };
  

  // Create image bodies
  const images = Array.from(document.querySelectorAll(".image")).map(
    (image) => {
      const coords = randomCoordinates();
      const body = Bodies.rectangle(
        coords.x,
        coords.y,
        108,
        108,
        {
          render: {
            sprite: {
              texture: image.getAttribute("src"),
              xScale: 0.1,
              yScale: 0.1,
            },
          },
          restitution: 0.9,
          friction: 0.8,
          frictionAir: 0.01,
          slop: 0.5,
        }
      );

      image.style.display = "none";
      return body;
    }
  );

  // Add image bodies to the world
  World.add(engine.world, images);

  // Add mouse control
  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

  World.add(engine.world, mouseConstraint);
  render.mouse = mouse;

// Create floor
const floor = Bodies.rectangle(
  window.innerWidth / 2,
  window.innerHeight + 5,
  window.innerWidth,
  10,
  {
    isStatic: true,
    restitution: 0.5,
    friction: 0.5,
    render: {
      visible: false,
    },
  }
);

// Create left and right walls
const leftWall = Bodies.rectangle(-5, window.innerHeight / 2, 10, window.innerHeight, { isStatic: true, render: { visible: false } });
const rightWall = Bodies.rectangle(window.innerWidth + 5, window.innerHeight / 2, 10, window.innerHeight, { isStatic: true, render: { visible: false } });


  // Add the walls to the world
// Add the walls and floor to the world
World.add(engine.world, [leftWall, rightWall, floor]);


  // Update
// Update gravity function
// Update gravity function
function updateGravity() {
  const punkDisplayHeight = document.documentElement.clientHeight;
  const baseGravity = 9.81 * 0.02;
  const gravityScale = punkDisplayHeight / window.innerHeight;
  engine.world.gravity.y = baseGravity * gravityScale;
}

  
  // Event listeners
  window.addEventListener("resize", () => {
  setTimeout(updateGravity, 100);
  });
  
  // Fullscreen change event listener
  const fullscreenEvents = [
  "fullscreenchange",
  "webkitfullscreenchange",
  "mozfullscreenchange",
  "msfullscreenchange"
  ];
  
  fullscreenEvents.forEach(event => {
  document.addEventListener(event, () => {
  setTimeout(updateGravity, 100);
  });
  });
  
  updateGravity(); // Call the function initially to set the proper gravity
  
  Engine.run(engine);
  Render.run(render);
  
  // Add image function
  function addImage() {
  const imageUrl = "criptoppunk.png"; // Replace with your image URL
  const coords = randomCoordinates();
  const body = Bodies.rectangle(
  coords.x,
  coords.y,
  108,
  108,
  {
  render: {
  sprite: {
  texture: imageUrl,
  xScale: 0.1,
  yScale: 0.1,
  },
  },
  restitution: 0.9,
  friction: 0.8,
  frictionAir: 0.01,
  slop: 0.5,
  }
  );
  // Add the new image body to the world
World.add(engine.world, body);

// Update gravity after adding a new image
updateGravity();
}

// Add click event listener
document.getElementById("generate").addEventListener("click", () => {
addImage();
});
window.addEventListener("resize", () => {
  render.canvas.width = window.innerWidth;
  render.canvas.height = window.innerHeight;
  punkDisplayRect = document.querySelector(".punkdisplay").getBoundingClientRect();

  Matter.Body.setPosition(floor, {
    x: window.innerWidth / 2,
    y: window.innerHeight + 27,
  });
  Matter.Body.setPosition(leftWall, {
    x: -5,
    y: window.innerHeight / 2,
  });
  Matter.Body.setPosition(rightWall, {
    x: window.innerWidth + 5,
    y: window.innerHeight / 2,
  });

  setTimeout(updateGravity, 100);
});

const connectWallet = async () => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    try {
      /* MetaMask is installed */
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0]);
    } catch (err) {
      console.error(err.message);
    }
  } else {
    /* MetaMask is not installed */
    console.log("Please install MetaMask");
  }
};

const connectButton = document.getElementById("connect-button");
connectButton.addEventListener("click", connectWallet);

};


