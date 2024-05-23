createDropZone();
createDragItems();

function createDropZone(){
    const numberOfDropZone = 7;
    const dropZoneList = [];

    for (let i = 0; i < numberOfDropZone; i++) {

        dropZoneList.push({
            title: 'dropzone '+ (i+1),
            id:i+1
        })
    }
     
    const container = document.getElementById('containerDrop');

    dropZoneList.forEach(dropZone => {
        const dropMarkup = `
        <div class=" bg-red-500 p-2">
            <h2>${dropZone.title}</h2>
            <div id=drop-${dropZone.id} class="dropZone border p-1">
                <div class="p-3">
                    <h2>ciao sono una dropzoone : )</h2>
                </div>
            </div>
        </div>`;

        container.insertAdjacentHTML("beforeend",dropMarkup);
    });

}

function createDragItems(){
    const numberOfDragItems = 5;
    const container = document.getElementById('containerDrag');

    for (let i = 0; i < numberOfDragItems; i++) {
        
        const dragMarkup = `
        <div>
            <div id=drag-${i+1} data-position="4471" class="dragElement bg-green-500 p-3 h-20">
                elemento ${i+1}
            </div>
        </div>`;

        container.insertAdjacentHTML("beforeend",dragMarkup);
    }
}