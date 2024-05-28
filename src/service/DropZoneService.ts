import iDropZone from "../interface/iDropZone.js";
import MouseService, { iMousePosition } from "./MouseService.js";

export default class DropZoneService {
    constructor() {
    }

    public detectDropZone(dropZone: iDropZone, mousePosition: iMousePosition): boolean {
        const dropZonePosition = dropZone.element.getBoundingClientRect();
        
        const condition =
            dropZonePosition.left <= mousePosition.x && mousePosition.x <= dropZonePosition.right &&
            dropZonePosition.top <= mousePosition.y && mousePosition.y <= dropZonePosition.bottom

        if (condition) {
            return true;
        }
        else {
            return false;
        }
    }
}