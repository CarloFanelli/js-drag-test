import DragAndDrop from "./bin/DragAndDrop.js"

const dropZones = Array.from(document.querySelectorAll(".dropZone"));

const dragElement = Array.from(document.querySelectorAll(".dragElement"));

new DragAndDrop(
  {
    dropZoneHtmlElements: dropZones,
    draggableHtmlElements: dragElement,
    dropZoneClass: ["bg-pink-500", "border-white-500"], //poco sensato
    dropZoneHoverClass: "bg-green-400", // sensato
  },
  function (e, dropZone) {

    let divResult = document.getElementById("result");
    console.log(dropZone.id);
    divResult.innerHTML = `<div>Element draggato: ${e.id}</div> <div> dropzone: ${dropZone.id}`;
  }
);