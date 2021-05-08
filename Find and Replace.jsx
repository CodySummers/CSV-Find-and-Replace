var changes = [];
var errors = [];
var red = [1,0,0];
var green = [0,1,0];
var orange = [1,.5,0];
var circleIcon;

//Palette
var panelGlobal = this;
var palette = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette", undefined, undefined, {resizeable: true}); 
    if ( !(panelGlobal instanceof Panel) ) palette.text = "Find and Replace"; 
    palette.orientation = "column"; 
    palette.alignChildren = ["left","center"]; 
    palette.spacing = 10; 
    palette.margins = 16; 
    
var allGroup = palette.add("group")
    allGroup.orientation = "column";
    allGroup.alignChildren = ["left", "center"]
    //allGroup.maximumSize.width = 300; 

//Find Group
var findGroup = allGroup.add("group", undefined, {name: "findGroup"}); 
    findGroup.orientation = "row"; 
    findGroup.alignChildren = ["fill","center"]; 
    findGroup.spacing = 10; 
    findGroup.margins = 0;
    
var find = findGroup.add("statictext", undefined, undefined, {name: "find"}); 
    find.text = "Find:"; 

var findText = findGroup.add('edittext {properties: {name: "findText", multiline: true}}'); 
    findText.text = "EditText"; 
    findText.preferredSize.width = 319; 

var replaceGroup = allGroup.add("group", undefined, {name: "replaceGroup"}); 
    replaceGroup.orientation = "row"; 
    replaceGroup.alignChildren = ["left","center"]; 
    replaceGroup.spacing = 10; 
    replaceGroup.margins = 0; 

var replace = replaceGroup.add("statictext", undefined, undefined, {name: "replace"}); 
    replace.text = "Replace:"; 

var replaceText = replaceGroup.add('edittext {properties: {name: "replaceText", multiline: true}}'); 
    replaceText.text = "EditText"; 
    replaceText.preferredSize.width = 300; 

var caseSensitivityGroup = allGroup.add("group");
    caseSensitivityGroup.margins = 5;

var caseSensitivity = caseSensitivityGroup.add("checkbox", undefined, undefined); 
    caseSensitivity.text = "Case Sensisitve";
    caseSensitivity.value = false;

var runTextGroup = allGroup.add("group")
    runTextGroup.margins = 0;

var runButton = runTextGroup.add("button", undefined, undefined, {name: "runButton"}); 
    runButton.text = "Run"; 
    runButton.onClick = function(){findReplace()};

var changesMadeText = runTextGroup.add("statictext");
    changesMadeText.text = "No Changes Made";
    changesMadeText.addEventListener("click", function(mouse){
        if(changes.length > 0){
            openLayerMenu(this, changes, "Change", mouse);
        }
    });

//Putting the circle into a group to easily delete and replace it.
var circleGroup = runTextGroup.add("group");
drawCircle(orange);

//Text layer, if layers have errors then click on it to open a new window    
var errorText = runTextGroup.add("statictext", undefined, undefined, {name: "errorText"}); 
errorText.text = ""; 
errorText.preferredSize.width = 65;
errorText.addEventListener("click",function(mouse){
    if(errors.length > 0) openLayerMenu(this, errors, "Error", mouse);
});
    
palette.layout.layout(true);
palette.layout.resize();
palette.onResizing = palette.onResize = function () { this.layout.resize(); }

if ( palette instanceof Window ) palette.show();

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

function findReplace(){

    app.beginUndoGroup("Find and Replace")
    errors = [];
    changes = [];
    var changesMade = false;
    var project = app.project;
    var comps = [];


    if(project.selection == 0){
        for(var i = 1; i <= project.numItems; i++){
            comps.push(project.items[i]);
        }
        checkNestedComps = false;
    }else comps = app.project.selection;

    for(var i = 0; i < comps.length; i++){
        if(!(comps[i] instanceof CompItem)){
            continue;
        }
        search(comps[i]);
    }

    function search(comp){

        var layer = comp.layers;

        for(var j = 1; j <= comp.numLayers; j++){
            if(!(layer[j] instanceof TextLayer)){
                continue;
            }

            //alert(layer[j].property("Text").property("Source Text").value.toString().replace(/(\r\n|\n|\r|\s+|\s+$)/gm,"") + "\n" + findText.text.replace(/(\r\n|\n|\r|\s+|\s+$)/gm,""))
            //Remove any enters and white space .replace(/(\r\n|\n|\r|\s+|\s+$)/gm,"")
            var findTextCap = (caseSensitivity.value == false) ? findText.text.toUpperCase() : findText.text;
            var comppareTextCap = (caseSensitivity.value == false) ? layer[j].property("Text").property("Source Text").value.toString().toUpperCase() : layer[j].property("Text").property("Source Text").value.toString();
            //alert(findTextCap + "\n" + comppareTextCap)

            if(findTextCap.replace(/(\r\n|\n|\r|\s+|\s+$)/gm,"") == comppareTextCap.replace(/(\r\n|\n|\r|\s+|\s+$)/gm,"")){
                layer[j].property("Text").property("Source Text").setValue(replaceText.text);
                changesMade = true;
                changes.push([comp, layer[j]])
                checkText(comp, layer[j])
            }
        }

    }
    if(changesMade == false){
        changesMadeText.text = "No Changes Made";
    }else{
        changesMadeText.text = (changes.length == 1) ? changes.length + " Change" : changes.length + " Changes";
    }

    updateErrorText();

}

    function checkVisible(){

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
           
            if(!(comps[i] instanceof CompItem)){
                continue;
            }
            search(comps[i]);
        }
        
        function search(comp){
    
            var layer = comp.layers;
    
            for(var j = 1; j <= comp.numLayers; j++){
               
                
                if(!(layer[j] instanceof TextLayer)){
                    if(layer[j].source instanceof CompItem && checkNestedComps) search(layer[j].source)
                    continue;
                }
                
                    checkText(comp, layer[j]);
                }
            }
        
        updateErrorText()
        
            app.endUndoGroup();
    
    }

    function updateErrorText(){

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
    }

    function checkText(comp, layer){
            
        var text = layer.property("Text").property("Source Text");

        if(!(text.value.boxText)){
            return;
        }

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

    function openLayerMenu(clicked, menu, textToChange, mouse){

        var groupCount = 0;
        layerMenu = new Window("palette", undefined, undefined, {borderless: true});
        layerMenu.alignChildren = ["fill", "center"];
        layerMenu.margins = 10;
        layerMenu.spacing = 3;
        
        for(var i = 0; i < menu.length; i++){
            fillLayerMenu();
        }
        
        layerMenu.onDeactivate = function(){layerMenu.close()};
        layerMenu.location = [mouse.screenX, mouse.screenY - (25 * groupCount)];
        clicked.text = (groupCount == 1) ? groupCount + " " + textToChange : groupCount + " " + textToChange + "s";
        if(groupCount > 0) layerMenu.show();
    
        function fillLayerMenu(){
            
            //If layer or comp was deleted remove from list
            try {
                menu[i][1].name
              }
              catch(err) {
                return
              }
    
           var layerGroup = layerMenu.add("group");
           layerGroup.margins = 3;
           layerGroup.info = menu[i];
           layerGroup.maximumSize.width = 250;
            var changeText = layerGroup.add("statictext", undefined, layerGroup.info[1].name)
            
            layerGroup.addEventListener("mouseover", function(){
                this.graphics.backgroundColor = this.graphics.newBrush (this.graphics.BrushType.SOLID_COLOR, [.1,.1,.1]);
            });
    
            layerGroup.addEventListener("mouseout", function(){
                this.graphics.backgroundColor = this.graphics.newBrush(this.graphics.BrushType.SOLID_COLOR, [0,0,0,0]);
            });
    
            layerGroup.addEventListener("click", function(){
                app.executeCommand(app.findMenuCommandId("Deselect All"));
                this.info[0].openInViewer();
                this.info[1].selected = true; 
            });
            groupCount++
        }
    }