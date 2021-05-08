//JSON
"object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(t){return t<10?"0"+t:t}var cx,escapable,gap,indent,meta,rep;function quote(t){return escapable.lastIndex=0,escapable.test(t)?'"'+t.replace(escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var n,r,o,f,u,i=gap,p=e[t];switch(p&&"object"==typeof p&&"function"==typeof p.toJSON&&(p=p.toJSON(t)),"function"==typeof rep&&(p=rep.call(e,t,p)),typeof p){case"string":return quote(p);case"number":return isFinite(p)?String(p):"null";case"boolean":case"null":return String(p);case"object":if(!p)return"null";if(gap+=indent,u=[],"[object Array]"===Object.prototype.toString.apply(p)){for(f=p.length,n=0;n<f;n+=1)u[n]=str(n,p)||"null";return o=0===u.length?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+i+"]":"["+u.join(",")+"]",gap=i,o}if(rep&&"object"==typeof rep)for(f=rep.length,n=0;n<f;n+=1)"string"==typeof rep[n]&&(o=str(r=rep[n],p))&&u.push(quote(r)+(gap?": ":":")+o);else for(r in p)Object.prototype.hasOwnProperty.call(p,r)&&(o=str(r,p))&&u.push(quote(r)+(gap?": ":":")+o);return o=0===u.length?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+i+"}":"{"+u.join(",")+"}",gap=i,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()}),"function"!=typeof JSON.stringify&&(escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,n){var r;if(gap="",indent="","number"==typeof n)for(r=0;r<n;r+=1)indent+=" ";else"string"==typeof n&&(indent=n);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,JSON.parse=function(text,reviver){var j;function walk(t,e){var n,r,o=t[e];if(o&&"object"==typeof o)for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(void 0!==(r=walk(o,n))?o[n]=r:delete o[n]);return reviver.call(t,e,o)}if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();

// @include "Baby Parse.jsx"

var changes = [];
var errors = [];
var red = [1,0,0];
var green = [0,1,0];
var orange = [1,.5,0];
var layerCounter = 0;
var circleGroup, circleIcon, findText, replaceText, tabOpen, csvFile;

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

var tabs = allGroup.add("group");

var textFindReplace_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%20%00%00%00%19%08%06%00%00%00P%0F%2C%C2%91%00%00%00%09pHYs%00%00%08M%00%00%08M%01!%C2%88!%C2%81%00%00%01%C3%AEIDATH%C2%89%C3%85W%3BN%031%10%7D%C2%A0T4%04q%C2%80lAAG%20%3D%C3%99%C2%82%16)M%C3%BA%C3%9C%C2%80%1C%01%3A%C3%8A%1Ca%C2%8F%C2%90%03%C2%A405%C2%89%14%3A%C3%8A%C3%A4%04lz%24%C2%A3%01%3B%1AM%C3%AC%19Se%C2%A4%C3%95%C3%9A%C3%AB%C3%B1%7C%C3%9F%C2%8C%C2%BD'%C3%9E%7B%1C%C2%93N%0Buo%00x%C3%A5%19%C2%B3%C2%B5%25%C2%80%C2%99%C3%A0u%00%C2%A6%00%C2%BA%07%C2%92)%02%C3%86S%7B%C2%9D%C2%9C%C3%B7%C3%BE%C2%95q%C3%90x%C2%9D%C3%99%C2%B1%C3%B1%C3%9E%C3%B7%C2%B9%C2%BE%C2%92%08L%C2%8C%C3%B55%C2%80%076%C3%BF%04p%C2%93%C3%A1%C3%AD%01%C2%98%C3%B3HX%06%10%C3%A3%C3%88%C3%A0%C2%A1%C2%90%0F%C3%98%C3%BC%C3%9B%C3%A0%C3%AF%C2%85t%14%19%40%C3%8A%C3%8F%0D%C2%9E%0E%1B%C2%AF%00%5C%19%C3%BC%C3%A0NY%06X%C3%A1%C3%BF%00p%C3%8D%C3%A6%0B%00%C3%8F%00n%01%C2%BC)%C3%BB%C3%B6)%C3%92%0C%C2%A8%00%0C3k%C3%9B%C3%B0v%22%C3%BF%C2%AB%C3%B0%26%5C4%C2%8A%C3%AC%5D%C2%89%019%C3%AF%C2%B7%01HH%C3%A4%7F%C3%81%C3%86%C2%95%22%C3%9B%C3%ADGJ%09n2%C2%A54%0B%C2%A5D4a%C3%9F%C2%97%C3%9E%C3%BB*%C2%94-%7Do%C2%95%C3%A2%C2%AD%C2%A3%C2%9E%C2%9C%C3%B2Q%C3%81%C3%A6u%C2%A2%C3%BE%C2%9D%C3%913%C2%A2%C3%91%C2%B0%0Ch2%C2%9B%5B%C3%86S%07%C2%AF%23%C2%8D%0D%C3%85mp%0C%C2%96%01%5DEH%C3%83%C3%B8.%C3%84%C3%9Ac%C2%81%C3%B7%3E%C2%A4P%C3%AD%C2%84Z%C3%A3%C2%99%C2%B3%C2%B1D%C3%BF%20%C3%81%C2%9F%C2%A2'%0E%C3%82N%C2%82a%C2%AAlvl%2C%C3%91O%07%C3%96%0B%C3%BBV%2Be%3C%0CU%C3%96%C3%88%C3%B0W%C2%85al%12%C3%B9O%C2%A5S%03%C2%A5K%C2%A5%40%C3%B3%C2%9E%C3%93%C2%BBR%C3%BF%C2%B9%C2%88%C2%A5%C2%A2p%60%C2%80u%C3%B0D%3Acc%C3%8A%C3%BFW%C2%86%C2%AF%C2%B6%04q%0C%C2%8C%C3%82Ie%11%C2%B5%C3%91K%C3%86C%C3%9E%C3%B7%C3%85e%23%C2%9E%C2%A29%0C%20%C2%B6si%40%09%C2%A5%C3%BA%C2%BF%2B85%25%C3%BD%C2%A5%C2%A7%C2%A0%C3%B6%C2%BD%C2%B8%C3%85%C3%88%C3%BA%C2%BF%2F%04.%C2%A76%C3%8A%C2%8C%18%C3%90%C2%BC%C3%9F%C2%86%C3%93-%C2%92%C3%B4%C3%BE%C3%AE%C2%9F%C2%9E%C3%AF%026~eF%034%C3%B4%C3%8F%C3%85%5C%C2%A2%C3%9F%04ZN9%11a%C2%80%00%C3%93*%17%08i%C2%80%C2%8C%00%5DH%C2%B4%C3%8B%075(zH)%C3%A5%C2%9Dt%C3%AD%C3%A9%C2%B8%C3%BF%05%00~%00%01%C2%8Cz%C3%8A%C2%97G%01%3C%00%00%00%00IEND%C2%AEB%60%C2%82"; 
var textFindReplaceGroup = tabs.add("group")
    textFindReplaceGroup.margins = 5;
var textFindReplace = textFindReplaceGroup.add("image", undefined, File.decode(textFindReplace_imgString), {name: "textFindReplace"}); 
    textFindReplace.name = "textFindReplace";
    textFindReplace.addEventListener('click', function(){closeWindow(this)});
    textFindReplace.helpTip = "Find and replace text"

var csvFindReplace_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%20%00%00%00%19%08%06%00%00%00P%0F%2C%C2%91%00%00%00%09pHYs%00%00%08M%00%00%08M%01!%C2%88!%C2%81%00%00%00%C2%86IDATH%C2%89%C3%AD%C2%94%C3%91%09%C2%800%0CD%C2%9F%C3%A2%00%C2%8E%C3%A0%08%C3%9D%40Gq%04Gp%04G%C2%AA%1Bt%04Gp%C2%83%C3%BA%13%C2%A4%C2%96%C3%BEY%C2%88%60%0EB%02Wr%07%C2%A1%C3%97%C3%84%18%C3%91D%C2%AB%C2%AA%0Et%C3%89%3CK%C2%A5X%C2%80%00l%C2%80%C2%AB%C2%A8%1Bd%C3%B7%C3%83%C3%80%00%C2%8C%C3%99%C3%83%5E%C2%BA%2BpU%C2%A0~%023%60%C3%9F%C3%B0S%06V%20f5%09%C3%A7%0B%C3%9C%C2%9B%C3%B2%25%03*0%03i%14%1F%C3%80%C2%9E%C3%B1%C2%A7%C3%B4PY%C3%B7%C3%9Eg9%609%60'%C2%B0%1C%C3%B8y%0E%00%17%C2%BB%C3%99K%C2%BD%C3%84-%C2%81%C2%BB%00%00%00%00IEND%C2%AEB%60%C2%82"; 
var csvFindReplaceGroup = tabs.add("group");
    csvFindReplaceGroup.margins = 5;
var csvFindReplace = csvFindReplaceGroup.add("image", undefined, File.decode(csvFindReplace_imgString));
    csvFindReplace.name = "csvFindReplace";
    csvFindReplace.addEventListener('click', function(){closeWindow(this)});
    csvFindReplace.helpTip = "Find and replace text\nbased on a csv"

var divider = allGroup.add("panel", undefined, undefined); 
    divider.alignment = "fill"; 

var findReplaceGroup = allGroup.add("group");
    findReplaceGroup.orientation = "column";

textFindReplaceWindow();

function closeWindow(tab){
    
    // while(findReplaceGroup.children.length > 0){
    //     findReplaceGroup.remove(0);
    // }
    if(tab.name == "csvFindReplace"){
        csvFindReplaceWindow();
    }else {
        textFindReplaceWindow();
    }
    findReplaceGroup.layout.layout(true);
}

function csvFindReplaceWindow(){
    csvFile = File.openDialog("Choose CSV");
    if(csvFile == null) return;
    tabOpen = "CSV find and replace"
    textFindReplaceGroup.graphics.backgroundColor = textFindReplaceGroup.graphics.newBrush(textFindReplaceGroup.graphics.BrushType.SOLID_COLOR, [.1,.1,.1,0]);
    csvFindReplaceGroup.graphics.backgroundColor = csvFindReplaceGroup.graphics.newBrush(csvFindReplaceGroup.graphics.BrushType.SOLID_COLOR, [.1,.1,.1]);

}

function textFindReplaceWindow(){    

    tabOpen = "Text find and replace";
    csvFindReplaceGroup.graphics.backgroundColor = csvFindReplaceGroup.graphics.newBrush(csvFindReplaceGroup.graphics.BrushType.SOLID_COLOR, [.1,.1,.1,0]);
    textFindReplaceGroup.graphics.backgroundColor = textFindReplaceGroup.graphics.newBrush(textFindReplaceGroup.graphics.BrushType.SOLID_COLOR, [.1,.1,.1]);
}

//Find Group
var findGroup = findReplaceGroup.add("group", undefined, {name: "findGroup"}); 
    findGroup.orientation = "row"; 
    findGroup.alignChildren = ["left","center"]; 
    findGroup.spacing = 10; 
    findGroup.margins = 0;
    
var find = findGroup.add("statictext", undefined, undefined, {name: "find"}); 
    find.text = "Find:"; 

    findText = findGroup.add('edittext {properties: {name: "findText", multiline: true}}'); 
    findText.text = ""; 
    findText.preferredSize.width = 275; 

var arrowGroup = findGroup.add("group");
    arrowGroup.orientation = "column";
    arrowGroup.spacing = 0;
    arrowGroup.margins = 5;
    drawArrow(3, -1);
    drawArrow(12, 1);


var replaceGroup = findReplaceGroup.add("group", undefined, {name: "replaceGroup"}); 
    replaceGroup.orientation = "row"; 
    replaceGroup.alignChildren = ["left","center"]; 
    replaceGroup.spacing = 10; 
    replaceGroup.margins = 0; 

var replace = replaceGroup.add("statictext", undefined, undefined, {name: "replace"}); 
    replace.text = "Replace:"; 

    replaceText = replaceGroup.add('edittext {properties: {name: "replaceText", multiline: true}}'); 
    replaceText.text = ""; 
    replaceText.preferredSize.width = 300; 


var caseSensitivityGroup = allGroup.add("group");
    caseSensitivityGroup.margins = 5;

var caseSensitivity = caseSensitivityGroup.add("checkbox", undefined, undefined); 
    caseSensitivity.text = "Case Sensisitve";
    caseSensitivity.value = false;

var matchFull = caseSensitivityGroup.add("checkbox", undefined, undefined);
    matchFull.text = "Match Full String"
    matchFull.value = true;

var runTextGroup = allGroup.add("group")
    runTextGroup.margins = 0;

var runButton = runTextGroup.add("button", undefined, undefined, {name: "runButton"}); 
    runButton.text = "Run"; 
    runButton.onClick = function(){
        if(tabOpen == "Text find and replace"){
            app.beginUndoGroup("Find and Replace");
            errors = [];
            changes = [];
            findReplace(findText.text, replaceText.text);
        }else{
            findReplaceCSV();
        }
    };

var changesMadeText = runTextGroup.add("statictext");
    changesMadeText.text = "No Changes Made";
    changesMadeText.addEventListener("click", function(mouse){
        if(changes.length > 0){
            openLayerMenu(this, changes, "Change", mouse);
        }
    });

//Putting the circle into a group to easily delete and replace it.
 circleGroup = runTextGroup.add("group");
drawCircle(orange);

//Text layer, if layers have errors then click on it to open a new window    
var errorText = runTextGroup.add("statictext", undefined, undefined, {name: "errorText"}); 
    errorText.text = ""; 
    errorText.preferredSize.width = 150;
    errorText.addEventListener("click",function(mouse){
        if(errors.length > 0) openLayerMenu(this, errors, "Error", mouse);
    });
    
palette.layout.layout(true);
palette.layout.resize();
palette.onResizing = palette.onResize = function () { this.layout.resize(); }

if ( palette instanceof Window ) palette.show();

function drawCircle(colour){

    if(circleGroup.children.length > 0){
        circleGroup.remove(0);
    }
    
    circleIcon = circleGroup.add("group", undefined);
    circleIcon.helpTip = "Warns if a paragraph\ntext box is too small"
    circleIcon.addEventListener('click', checkVisible)
    circleIcon.preferredSize = [10,10];
    circleIcon.onDraw = function(){
        var graphics = circleIcon.graphics;
            brush = graphics.newBrush(graphics.BrushType.SOLID_COLOR, colour);
            graphics.newPath();
            graphics.moveTo(0, 0);
            graphics.ellipsePath(0,0,10,10)
            graphics.fillPath(brush);
    }
    
    runTextGroup.layout.layout(true)
}

function drawArrow(facing, direction){

    var arrow = arrowGroup.add("group");
    arrow.preferredSize = [15,15];
    arrow.onDraw = function(){
        pen = arrow.graphics.newPen (arrow.graphics.PenType.SOLID_COLOR, [1, 1, 1, 1], 3);
        graphics = arrow.graphics;
        graphics.newPath();			/* inner frame */
        graphics.moveTo(3, 7.5); 
        graphics.lineTo(7.5, facing); 
        graphics.lineTo(12, 7.5); 
        graphics.strokePath(pen);
    }

    arrow.addEventListener('click', function(){
        if(changes.length == 0){

        }
        
    })

}

//findReplaceCSV();

function upDown(){

}

function findReplaceCSV(){
    
    app.beginUndoGroup("CSV Find and Replace");

    var findColumn, replaceColumn;
    var findFound = replaceFound = false;

    errors = [];
    changes = [];

    var csvFileRead = "";
    //var csvFile = File("C:/Users/grego/OneDrive/Desktop/AE Scripts/Find and Replace/csvTest.csv")
    csvFile.open("r");
    while(!csvFile.eof){
        csvFileRead += csvFile.read();
    }
    csvFile.close();

    var csvRows = Baby.parse(csvFileRead).data;

    for(var i = 0; i < csvRows[0].length; i++){
        if(findText.text == csvRows[0][i]){
            findColumn = i;
            findFound = true
        }else if (replaceText.text == csvRows[0][i]){
            replaceColumn = i;
            replaceFound = true;
        }
    }

    if(findFound == false && replaceFound == false){
        drawCircle(red);
        errorText.text = "Headers not found";
        return
    }else if(findFound == false){
        drawCircle(red);
        errorText.text = "Find header not found";
        return
    }else if(replaceFound == false){
        drawCircle(red);
        errorText.text = "Replace header not found";
        return
    }

    for(var i = 1; i < csvRows.length; i++){
        findReplace(csvRows[i][findColumn], csvRows[i][replaceColumn])
    }

    app.endUndoGroup();

}

function findReplace(find, replace){

    var project = app.project;
    var comps = [];
    var checkNestedComps = true;

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
                if(layer[j].source instanceof CompItem && checkNestedComps) search(layer[j].source);
                continue;
            }

            //alert(layer[j].property("Text").property("Source Text").value.toString().replace(/(\r\n|\n|\r|\s+|\s+$)/gm,"") + "\n" + findText.text.replace(/(\r\n|\n|\r|\s+|\s+$)/gm,""))
            //Remove any enters and white space .replace(/(\r\n|\n|\r|\s+|\s+$)/gm,"")
            var findTextCap = (caseSensitivity.value == false) ? find.toUpperCase() : find;
            var comppareTextCap = (caseSensitivity.value == false) ? layer[j].property("Text").property("Source Text").value.toString().toUpperCase() : layer[j].property("Text").property("Source Text").value.toString();
            
            findTextCapWhiteSpace = findTextCap.replace(/(\r\n|\n|\r|\s+|\s+$)/gm,"");
            comppareTextCapWhiteSpace = comppareTextCap.replace(/(\r\n|\n|\r|\s+|\s+$)/gm,"");

            var compare = (matchFull.value) ? (findTextCapWhiteSpace == comppareTextCapWhiteSpace) : (comppareTextCapWhiteSpace.indexOf(findTextCapWhiteSpace) != -1);

            if(compare){
                var text = layer[j].property("Text").property("Source Text");

                if(matchFull.value){
                    text.setValue(replace)
                }else {
                    //var escapeSpecial = find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\\$&');
                    // alert(escapeSpecial)
                    var regex = new RegExp("\\b" + find + "\\b","ig");
                    text.setValue(text.value.toString().replace(regex,replace));
                }
                changes.push([comp, layer[j]])
                checkText(comp, layer[j])
            }
        }

    }

    updateChangeText();
    updateErrorText();
    app.endUndoGroup();
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
        
        updateErrorText();
        app.endUndoGroup();
    
    }

    function updateErrorText(){
        //Change text if function found errors or not
        if(errors.length > 0){
            drawCircle(red);
            errorText.text = (errors.length == 1) ? errors.length + " Error" : errors.length + " Errors";
            
        }else{
            drawCircle(green);
            errorText.text = "No Errors";
        }
    }

    function updateChangeText(){
        if(changes.length == 0){
            changesMadeText.text = "No Changes Made";
        }else{
            changesMadeText.text = (changes.length == 1) ? changes.length + " Change" : changes.length + " Changes";
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
        layerMenu.alignChildren = ["left", "center"];
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