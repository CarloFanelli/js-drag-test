import DragAndDrop from "./bin/DragAndDrop.js";

const dropZones = Array.from(document.querySelectorAll(".dropZone"));
const dragElement = Array.from(document.querySelectorAll(".dragElement"));
let dragAndDrop = new DragAndDrop(
  {
    dropZoneHtmlElements: dropZones,
    draggableHtmlElements: dragElement,
    dropZoneClasses: ["bg-pink-500", "border-white-500"], //poco sensato
    dropZoneHoverClasses: ["bg-green-400"],
    draggedElementHoverClasses: ["bg-blue-400"],
    draggedElementCloneOpacity: 50,
    draggedElementClasses: ["bg-yellow-400"],
  },
  function (element, dropZone) {
    let divResult = document.getElementById("result");
    let elementDragged = "Nessun elemento draggato";
    let dropZoneHit = "Nessuna drop zone hittata";
    if (element) {
      elementDragged = element.id;
    }

    if (dropZone) {
      dropZoneHit = dropZone.id;
    }

    divResult.innerHTML = `<div>Element draggato: ${elementDragged}</div> <div> dropzone: ${dropZoneHit}`;
  }
);
