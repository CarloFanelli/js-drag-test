import iDropZone from "../interface/iDropZone.js";
import { iMousePosition } from "./MouseService.js";

export default class DropZoneService {
    constructor() {
    }

    public detectDropZone(dropZones: iDropZone[], mousePosition: iMousePosition): { isOverDropzone: boolean, dropZone: iDropZone }[] {
        return dropZones.map(dropZone => {
            const dropZonePosition = dropZone.element.getBoundingClientRect();
            const isOverDropzone =
                dropZonePosition.left <= mousePosition.x && mousePosition.x <= dropZonePosition.right &&
                dropZonePosition.top <= mousePosition.y && mousePosition.y <= dropZonePosition.bottom;
            return { isOverDropzone, dropZone };
        })
    }
}