import React, { useEffect, useState } from "react";

const TrafficLight = () => {
  const [activeLight, setActiveLight] = useState("red");
  const [lights, setLights] = useState(["red", "yellow", "green"]);

  // Ciclo automático de luces
  useEffect(() => {
    const lightSequence = [
      { color: "red", duration: 2500 },
      { color: "yellow", duration: 1800 },
      { color: "green", duration: 1500 },
      { color: "purple", duration: 1000 },
    ];
    let currentIndex = 0;

    const changeLight = () => {
      currentIndex = (currentIndex + 1) % lightSequence.length;
      setActiveLight(lightSequence[currentIndex].color);
      setTimeout(changeLight, lightSequence[currentIndex].duration);
    };

    const timeout = setTimeout(changeLight, lightSequence[0].duration);

    return () => clearTimeout(timeout);
  }, []);

  const toggleLight = () => {
    const currentIndex = lights.indexOf(activeLight);
    const nextIndex = (currentIndex + 1) % lights.length;
    setActiveLight(lights[nextIndex]);
  };

  const addPurpleLight = () => {
    if (!lights.includes("purple")) {
      setLights([...lights, "purple"]);
    }
  };

  return (
    <div className="traffic-light-container">
      
      <div className="traffic-light-top-tube"></div>

      
      <div onMouseEnter={toggleLight} className="traffic-light">
        {lights.map((color) => (
          <div
            key={color}
            className={`light ${color} ${activeLight === color ? "active" : ""}`}
          />
        ))}
      </div>      
      <div className="traffic-light-base"></div>     
      <div className="traffic-light-pole"></div>      
      <div className="button-container">
        <button onClick={toggleLight}>Toggle Light</button>
        <button onClick={addPurpleLight}>Add Purple Light</button>
      </div>
    </div>
  );
};

export default TrafficLight;