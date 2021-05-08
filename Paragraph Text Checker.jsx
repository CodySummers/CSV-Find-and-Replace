var panelGlobal = this;

//IIFE to keep varaible non global
var palette = (function () {

//Colours for dot
var red = [1,0,0];
var green = [0,1,0];
var orange = [1,.5,0];

//Error Arrary
var errors = [];

//Misc varibales 
var brush, circleIcon, errorWindow, win;

//Palette
palette = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette", undefined, undefined, {resizeable: true}); 
    palette.orientation = "column"; 
    palette.alignChildren = ["left","center"]; 
    palette.spacing = 10; 
    palette.margins = 16; 
    palette.preferredSize = [65, 10];

//Adding everything to a group, stop accidental resize of the panel when using palette.layout.layout(true); instead use allGroup.layout.layout(true);
var allGroup = palette.add("group");    

//Putting the circle into a group to easily delete and replace it.
var circleGroup = allGroup.add("group");
    drawCircle(orange);

//Text layer, if layers have errors then click on it to open a new window    
var errorText = allGroup.add("statictext", undefined, undefined, {name: "errorText"}); 
    errorText.text = ""; 
    errorText.preferredSize.width = 65;
    errorText.addEventListener("click",function(mouse){
        if(errors.length > 0) openErrorWindow(mouse);
    });

// var progressbar = palette.add("progressbar", undefined, undefined, {name: "progressbar1"}); 
//     progressbar.maxvalue = 100; 
//     progressbar.value = 0;
//     progressbar.maximumSize.height = 2; 

palette.layout.layout(true);
palette.layout.resize();
palette.onResizing = palette.onResize = function () { this.layout.resize(); }

if ( palette instanceof Window ) palette.show();

//Drawing a circle onto the UI
function drawCircle(colour){

    circleIcon = circleGroup.add("group", undefined);
    circleIcon.addEventListener('click', checkVisible)
    //circleIcon.helpTip = "Click to check text boxes"; 
    circleIcon.preferredSize = [10,10];
    circleIcon.onDraw = function(){
    var graphics = circleIcon.graphics;
    brush = graphics.newBrush(graphics.BrushType.SOLID_COLOR, colour);
    graphics.newPath();
    graphics.moveTo(0, 0);
    graphics.ellipsePath(0,0,10,10)
    graphics.fillPath(brush);
    }
              
}

function checkVisible(){

    // win = new Window("window")
    // var compProgressbar = win.add("progressBar")
    // var layerProgressBar = win.add("progressbar")
    //     compProgressbar.maximumSize.height = layerProgressBar.maximumSize.height = 3;
    // win.show();

    app.beginUndoGroup("Text Error Check")

    errors = [];
    var project = app.project;
    var comps = [];
    var checkNestedComps = true;

    //If no comps selected run on all comps, if comps selected run on those and any nested comps.
    if(project.selection == 0){
        for(var i = 1; i <= project.numItems; i++){
            comps.push(project.items[i]);
        }
        checkNestedComps = false;
    }else comps = app.project.selection;

    for(var i = 0; i < comps.length; i++){
        // compProgressbar.value = Math.floor((i / comps.length) * 100);
        // win.update();
        if(!(comps[i] instanceof CompItem)){
            continue;
        }
        search(comps[i]);
    }
    
    function search(comp){

        var layer = comp.layers;

        for(var j = 1; j <= comp.numLayers; j++){
            // layerProgressBar.value = Math.floor((j / comp.numLayers) * 100);
            // win.update();
            
            if(!(layer[j] instanceof TextLayer)){
                if(layer[j].source instanceof CompItem && checkNestedComps) search(layer[j].source)
                continue;
            }
            var text = layer[j].property("Text").property("Source Text")
                if(!(text.value.boxText)){
                    continue;
                }
                checkText(comp, layer[j]);
            }
        }

    function checkText(comp, layer){
        
        var text = layer.property("Text").property("Source Text");

        var textBoxWidth  = text.value.boxTextSize[0];
        var textBoxHeight = text.value.boxTextSize[1];

        var textHeight = layer.sourceRectAtTime(layer.inPoint, false).height;

        //Make paragraph box bigger and compare the sourceRectAtTime to see if there was missing text
        var textChanges = text.value;
            textChanges.boxTextSize = [textBoxWidth, 5000];
            text.setValue(textChanges);

        if(textHeight < layer.sourceRectAtTime(layer.inPoint, false).height) {
            errors.push([comp,layer]);
        }

        //Put layers back how they were
        textChanges.boxTextSize = [textBoxWidth,textBoxHeight];
        text.setValue(textChanges);
        
        
    }    

    //Change text if function found errors or not
    if(errors.length > 0){
        errorText.text = (errors.length == 1) ? errors.length + " Error" : errors.length + " Errors";
        circleGroup.remove(0);
        drawCircle(red);
        allGroup.layout.layout(true)
        
    }else{
        errorText.text = "No Errors";
        circleGroup.remove(0);
        drawCircle(green);
        allGroup.layout.layout(true)
    }
    
    // win.close()
    app.endUndoGroup();

}

//Borderless window that opens on click, has all error layers that you can click to go to. 
function openErrorWindow(mouse){
    
    var groupCount = 0;
    errorWindow = new Window("palette", undefined, undefined, {borderless: true});
    errorWindow.alignChildren = ["fill", "center"];
    errorWindow.margins = 10;
    errorWindow.spacing = 3;
    
    for(var i = 0; i < errors.length; i++){
        errorMenu();
    }
    
    errorWindow.onDeactivate = function(){errorWindow.close()};
    errorWindow.location = [mouse.screenX, mouse.screenY - (25 * groupCount)];
    errorText.text = (groupCount == 1) ? groupCount + " Error" : groupCount + " Errors";
    if(groupCount > 0) errorWindow.show();

    function errorMenu(){
        
        //If layer or comp was deleted remove from list
        try {
            errors[i][1].name
          }
          catch(err) {
            return
          }

       var errorGroup = errorWindow.add("group");
        errorGroup.margins = 3;
        errorGroup.info = errors[i];
        errorGroup.maximumSize.width = 250;
        var errorText = errorGroup.add("statictext", undefined, errorGroup.info[1].name)
        
        errorGroup.addEventListener("mouseover", function(){
            this.graphics.backgroundColor = this.graphics.newBrush (this.graphics.BrushType.SOLID_COLOR, [.1,.1,.1]);
        });

        errorGroup.addEventListener("mouseout", function(){
            this.graphics.backgroundColor = this.graphics.newBrush(this.graphics.BrushType.SOLID_COLOR, [0,0,0,0]);
        });

        errorGroup.addEventListener("click", function(){
            app.executeCommand(app.findMenuCommandId("Deselect All"));
            this.info[0].openInViewer();
            this.info[1].selected = true; 
        });
        groupCount++
    }
}

return palette;

})();