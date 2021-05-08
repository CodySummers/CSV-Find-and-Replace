//TODO
//Fix changes made, found text 
//When clicking found menu it changes to change menu - need to update on click function?
//Stop comp getting searched more than once if it's a pre-comp
//Work out how to replace special charaters - not too worried about this atm as it only effects single characters

//@include "./babyparse.jsxinc"

var panelGlobal = this;
var palette = (function () {

    //Global Variables
    var changes = [];
    var errors = [];
    var found = [];
    var red = [1, 0, 0];
    var green = [0, 1, 0];
    var orange = [1, .5, 0];
    var circleGroup, circleIcon, findText, replaceText, tabOpen, csvFile, layerCounter, layerLoop;

    //Varibles to check if settings have changed
    var compSelectionSave;

    var settings = {
        findText: "",
        replaceText: "",
        caseSensitivity: false,
        matchFullString: true
    }

    //Palette

    var palette = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette", undefined, undefined, { resizeable: true });
    if (!(panelGlobal instanceof Panel)) palette.text = "Find and Replace";
    palette.orientation = "column";
    palette.alignChildren = ["left", "center"];
    palette.spacing = 10;
    palette.margins = 16;

    var allGroup = palette.add("group")
    allGroup.orientation = "column";
    allGroup.alignChildren = ["left", "center"]

    //Find text or find CSV tabs
    var tabs = allGroup.add("group");

    var textFindReplace_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%20%00%00%00%19%08%06%00%00%00P%0F%2C%C2%91%00%00%00%09pHYs%00%00%08M%00%00%08M%01!%C2%88!%C2%81%00%00%01%C3%AEIDATH%C2%89%C3%85W%3BN%031%10%7D%C2%A0T4%04q%C2%80lAAG%20%3D%C3%99%C2%82%16)M%C3%BA%C3%9C%C2%80%1C%01%3A%C3%8A%1Ca%C2%8F%C2%90%03%C2%A405%C2%89%14%3A%C3%8A%C3%A4%04lz%24%C2%A3%01%3B%1AM%C3%AC%19Se%C2%A4%C3%95%C3%9A%C3%AB%C3%B1%7C%C3%9F%C2%8C%C2%BD'%C3%9E%7B%1C%C2%93N%0Buo%00x%C3%A5%19%C2%B3%C2%B5%25%C2%80%C2%99%C3%A0u%00%C2%A6%00%C2%BA%07%C2%92)%02%C3%86S%7B%C2%9D%C2%9C%C3%B7%C3%BE%C2%95q%C3%90x%C2%9D%C3%99%C2%B1%C3%B1%C3%9E%C3%B7%C2%B9%C2%BE%C2%92%08L%C2%8C%C3%B55%C2%80%076%C3%BF%04p%C2%93%C3%A1%C3%AD%01%C2%98%C3%B3HX%06%10%C3%A3%C3%88%C3%A0%C2%A1%C2%90%0F%C3%98%C3%BC%C3%9B%C3%A0%C3%AF%C2%85t%14%19%40%C3%8A%C3%8F%0D%C2%9E%0E%1B%C2%AF%00%5C%19%C3%BC%C3%A0NY%06X%C3%A1%C3%BF%00p%C3%8D%C3%A6%0B%00%C3%8F%00n%01%C2%BC)%C3%BB%C3%B6)%C3%92%0C%C2%A8%00%0C3k%C3%9B%C3%B0v%22%C3%BF%C2%AB%C3%B0%26%5C4%C2%8A%C3%AC%5D%C2%89%019%C3%AF%C2%B7%01HH%C3%A4%7F%C3%81%C3%86%C2%95%22%C3%9B%C3%ADGJ%09n2%C2%A54%0B%C2%A5D4a%C3%9F%C2%97%C3%9E%C3%BB*%C2%94-%7Do%C2%95%C3%A2%C2%AD%C2%A3%C2%9E%C2%9C%C3%B2Q%C3%81%C3%A6u%C2%A2%C3%BE%C2%9D%C3%913%C2%A2%C3%91%C2%B0%0Ch2%C2%9B%5B%C3%86S%07%C2%AF%23%C2%8D%0D%C3%85mp%0C%C2%96%01%5DEH%C3%83%C3%B8.%C3%84%C3%9Ac%C2%81%C3%B7%3E%C2%A4P%C3%AD%C2%84Z%C3%A3%C2%99%C2%B3%C2%B1D%C3%BF%20%C3%81%C2%9F%C2%A2'%0E%C3%82N%C2%82a%C2%AAlvl%2C%C3%91O%07%C3%96%0B%C3%BBV%2Be%3C%0CU%C3%96%C3%88%C3%B0W%C2%85al%12%C3%B9O%C2%A5S%03%C2%A5K%C2%A5%40%C3%B3%C2%9E%C3%93%C2%BBR%C3%BF%C2%B9%C2%88%C2%A5%C2%A2p%60%C2%80u%C3%B0D%3Acc%C3%8A%C3%BFW%C2%86%C2%AF%C2%B6%04q%0C%C2%8C%C3%82Ie%11%C2%B5%C3%91K%C3%86C%C3%9E%C3%B7%C3%85e%23%C2%9E%C2%A29%0C%20%C2%B6si%40%09%C2%A5%C3%BA%C2%BF%2B85%25%C3%BD%C2%A5%C2%A7%C2%A0%C3%B6%C2%BD%C2%B8%C3%85%C3%88%C3%BA%C2%BF%2F%04.%C2%A76%C3%8A%C2%8C%18%C3%90%C2%BC%C3%9F%C2%86%C3%93-%C2%92%C3%B4%C3%BE%C3%AE%C2%9F%C2%9E%C3%AF%026~eF%034%C3%B4%C3%8F%C3%85%5C%C2%A2%C3%9F%04ZN9%11a%C2%80%00%C3%93*%17%08i%C2%80%C2%8C%00%5DH%C2%B4%C3%8B%075(zH)%C3%A5%C2%9Dt%C3%AD%C3%A9%C2%B8%C3%BF%05%00~%00%01%C2%8Cz%C3%8A%C2%97G%01%3C%00%00%00%00IEND%C2%AEB%60%C2%82";
    var textFindReplaceGroup = tabs.add("group")
    textFindReplaceGroup.margins = 5;
    var textFindReplace = textFindReplaceGroup.add("image", undefined, File.decode(textFindReplace_imgString), { name: "textFindReplace" });
    textFindReplace.name = "textFindReplace";
    textFindReplace.addEventListener('click', function () { closeWindow(this) });
    textFindReplace.helpTip = "Find and replace text"

    var csvFindReplace_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%20%00%00%00%19%08%06%00%00%00P%0F%2C%C2%91%00%00%00%09pHYs%00%00%08M%00%00%08M%01!%C2%88!%C2%81%00%00%00%C2%86IDATH%C2%89%C3%AD%C2%94%C3%91%09%C2%800%0CD%C2%9F%C3%A2%00%C2%8E%C3%A0%08%C3%9D%40Gq%04Gp%04G%C2%AA%1Bt%04Gp%C2%83%C3%BA%13%C2%A4%C2%96%C3%BEY%C2%88%60%0EB%02Wr%07%C2%A1%C3%97%C3%84%18%C3%91D%C2%AB%C2%AA%0Et%C3%89%3CK%C2%A5X%C2%80%00l%C2%80%C2%AB%C2%A8%1Bd%C3%B7%C3%83%C3%80%00%C2%8C%C3%99%C3%83%5E%C2%BA%2BpU%C2%A0~%023%60%C3%9F%C3%B0S%06V%20f5%09%C3%A7%0B%C3%9C%C2%9B%C3%B2%25%03*0%03i%14%1F%C3%80%C2%9E%C3%B1%C2%A7%C3%B4PY%C3%B7%C3%9Eg9%609%60'%C2%B0%1C%C3%B8y%0E%00%17%C2%BB%C3%99K%C2%BD%C3%84-%C2%81%C2%BB%00%00%00%00IEND%C2%AEB%60%C2%82";
    var csvFindReplaceGroup = tabs.add("group");
    csvFindReplaceGroup.margins = 5;
    var csvFindReplace = csvFindReplaceGroup.add("image", undefined, File.decode(csvFindReplace_imgString));
    csvFindReplace.name = "csvFindReplace";
    csvFindReplace.addEventListener('click', function () { closeWindow(this) });
    csvFindReplace.helpTip = "Find and replace text\nbased on a csv"

    var divider = allGroup.add("panel", undefined, undefined);
    divider.alignment = "fill";

    //Default tab
    textFindReplaceWindow();

    //Text boxes    
    var findReplaceGroup = allGroup.add("group");
    findReplaceGroup.orientation = "column";

    //Find Group
    var findGroup = findReplaceGroup.add("group", undefined, { name: "findGroup" });
    findGroup.orientation = "row";
    findGroup.alignChildren = ["left", "center"];
    findGroup.spacing = 10;
    findGroup.margins = 0;

    var find = findGroup.add("statictext", undefined, undefined, { name: "find" });
    find.text = "Find:";

    findText = findGroup.add('edittext {properties: {name: "findText", multiline: true}}');
    findText.text = "";
    findText.preferredSize.width = 325;

    //Arrows
    var arrowGroup = findGroup.add("group");
    arrowGroup.orientation = "column";
    arrowGroup.spacing = 0;
    arrowGroup.margins = 5;
    drawArrow(3, -1);
    drawArrow(12, 1);

    //Replace Group
    var replaceGroup = findReplaceGroup.add("group", undefined, { name: "replaceGroup" });
    replaceGroup.orientation = "row";
    replaceGroup.alignChildren = ["left", "center"];
    replaceGroup.spacing = 10;
    replaceGroup.margins = 0;

    var replace = replaceGroup.add("statictext", undefined, undefined, { name: "replace" });
    replace.text = "Replace:";

    replaceText = replaceGroup.add('edittext {properties: {name: "replaceText", multiline: true}}');
    replaceText.text = "";
    replaceText.preferredSize.width = 350;


    //Settings Group
    var settingsGroup = allGroup.add("group");
    settingsGroup.margins = 5;

    var caseSensitivity = settingsGroup.add("checkbox", undefined, undefined);
    caseSensitivity.text = "Case Sensisitve";
    caseSensitivity.value = settings.caseSensitivity;

    var matchFull = settingsGroup.add("checkbox", undefined, undefined);
    matchFull.text = "Match Full String"
    matchFull.value = settings.matchFullString;

    var runTextGroup = allGroup.add("group")
    runTextGroup.margins = 0;

    var replaceButton = runTextGroup.add("button", undefined, undefined);
    replaceButton.text = "Replace";

    replaceButton.onClick = function () {
        replaceOne();
    }

    var replaceAllButton = runTextGroup.add("button", undefined, undefined);
    replaceAllButton.text = "Replace All";

    replaceAllButton.onClick = function () {
        replaceAll();
    }

    var changesMadeText = runTextGroup.add("statictext");
    changesMadeText.text = "No Changes Made";
    changesMadeText.addEventListener("click", function (mouse) {
        if (changes.length > 0) {
            openLayerMenu(this, changes, "Change", mouse);
        }
    });

    //Putting the circle into a group to easier to delete and replace it.
    circleGroup = runTextGroup.add("group");
    drawCircle(orange);

    //Text layer, if layers have errors then click on it to open a new window    
    var errorText = runTextGroup.add("statictext", undefined, undefined, { name: "errorText" });
    errorText.text = "No Errors Found";
    errorText.preferredSize.width = 85;
    errorText.addEventListener("click", function (mouse) {
        if (errors.length > 0) openLayerMenu(this, errors, "Error", mouse);
    });

    palette.layout.layout(true);
    palette.layout.resize();
    palette.onResizing = palette.onResize = function () { this.layout.resize(); }

    if (palette instanceof Window) palette.show();

    //Find text or find CSV open
    function closeWindow(tab) {
        if (tab.name == "csvFindReplace") {
            csvFindReplaceWindow();
            findReplaceCSV();
        } else {
            textFindReplaceWindow();
        }
        findReplaceGroup.layout.layout(true);
    }

    function csvFindReplaceWindow() {
        csvFile = File.openDialog("Choose CSV");
        if (csvFile == null) return;
        tabOpen = "CSV find and replace";
        textFindReplaceGroup.graphics.backgroundColor = textFindReplaceGroup.graphics.newBrush(textFindReplaceGroup.graphics.BrushType.SOLID_COLOR, [.1, .1, .1, 0]);
        csvFindReplaceGroup.graphics.backgroundColor = csvFindReplaceGroup.graphics.newBrush(csvFindReplaceGroup.graphics.BrushType.SOLID_COLOR, [.1, .1, .1]);
    }

    function textFindReplaceWindow() {
        tabOpen = "Text find and replace";
        csvFindReplaceGroup.graphics.backgroundColor = csvFindReplaceGroup.graphics.newBrush(csvFindReplaceGroup.graphics.BrushType.SOLID_COLOR, [.1, .1, .1, 0]);
        textFindReplaceGroup.graphics.backgroundColor = textFindReplaceGroup.graphics.newBrush(textFindReplaceGroup.graphics.BrushType.SOLID_COLOR, [.1, .1, .1]);
    }

    //Draw UI elemnts
    function drawCircle(colour) {

        if (circleGroup.children.length > 0) {
            circleGroup.remove(0);
        }

        circleIcon = circleGroup.add("group", undefined);
        circleIcon.helpTip = "Warns if a paragraph\ntext box is too small"
        circleIcon.addEventListener('click', checkVisible)
        circleIcon.preferredSize = [10, 10];
        circleIcon.onDraw = function () {
            var graphics = circleIcon.graphics;
            brush = graphics.newBrush(graphics.BrushType.SOLID_COLOR, colour);
            graphics.newPath();
            graphics.moveTo(0, 0);
            graphics.ellipsePath(0, 0, 10, 10)
            graphics.fillPath(brush);
        }

        runTextGroup.layout.layout(true)
    }

    function drawArrow(facing, direction) {
        var arrow = arrowGroup.add("group");
        arrow.preferredSize = [15, 15];
        arrow.onDraw = function () {
            pen = arrow.graphics.newPen(arrow.graphics.PenType.SOLID_COLOR, [1, 1, 1, 1], 3);
            graphics = arrow.graphics;
            graphics.newPath();			/* inner frame */
            graphics.moveTo(3, 7.5);
            graphics.lineTo(7.5, facing);
            graphics.lineTo(12, 7.5);
            graphics.strokePath(pen);
        }
        //Arrow Click Function
        arrow.addEventListener('click', function () { upDownArrows(direction) });

    }

    function saveSettings() {
        settings.caseSensitivity = caseSensitivity.value;
        settings.matchFullString = matchFull.value;
        settings.findText = findText.text;
        settings.replaceText = replaceText.text;
    }

    function settingsChanged() {
        compCompare = getComps();
        if (settings.caseSensitivity == caseSensitivity.value &&
            settings.matchFullString == matchFull.value &&
            settings.findText == findText.text &&
            settings.replaceText == replaceText.text &&
            compareComps(compSelectionSave, compCompare)) {
            return false //Settings have not changed
        }
        return true //Settings have changed
    }

    function upDownArrows(direction) {
        if (settingsChanged() || changes.length == 0) {
            saveSettings();
            changes = [];
            if (tabOpen == "Text find and replace") {
                findTextInProject(findText.text);
            } else findReplaceCSV();
            if (changes.length == 0) {
                updateFoundText();
                return;
            }
            layerCounter = changes.length * changes.length; //Quick fix to make arrows go up and down
            layerLoop = Math.abs(layerCounter % changes.length);
            gotoLayer(changes[0][0], changes[0][1]);
            return;
        }
        if (direction == 1) { //Up arrow
            layerCounter++;
        } else layerCounter--;
        layerLoop = Math.abs(layerCounter % changes.length);
        gotoLayer(changes[layerLoop][0], changes[layerLoop][1]);
    }

    //If no comps are selected then return all comps.
    function getComps() {
        var project = app.project;
        var comps = [];

        if (project.selection == 0) {
            for (var i = 1; i <= project.numItems; i++) {
                comps.push(project.items[i]);
            }
        } else comps = app.project.selection;

        return comps;
    }


    function findReplaceCSV() {

        app.beginUndoGroup("CSV Find and Replace");

        var findColumn, replaceColumn;
        var findFound = replaceFound = false;

        errors = [];
        changes = [];

        var csvFileRead = "";
        csvFile.open("r");
        while (!csvFile.eof) {
            csvFileRead += csvFile.read();
        }
        csvFile.close();

        var csvRows = Baby.parse(csvFileRead).data;

        for (var i = 0; i < csvRows[0].length; i++) {

            if (findText.text == csvRows[0][i]) {
                findColumn = i;
                findFound = true;
            } else if (replaceText.text == csvRows[0][i]) {
                replaceColumn = i;
                replaceFound = true;
            }

        }

        if (findFound == false) {
            drawCircle(red);
            errorText.text = "Find header not found";
            return;
        } else if (replaceFound == false) {
            drawCircle(red);
            errorText.text = "Replace header not found";
        }

        for (var i = 1; i < csvRows.length; i++) {
            findTextInProject(csvRows[i][findColumn], csvRows[i][replaceColumn]);
        }

        app.endUndoGroup();

    }

    function findTextInProject(find, replace) {

        var project = app.project;
        var checkNestedComps = (project.selection.length == 0) ? false : true;
        var comps = getComps();
        compSelectionSave = comps;

        layerCounter = 0;

        for (var i = 0; i < comps.length; i++) {
            if (!(comps[i] instanceof CompItem)) {
                continue;
            }
            search(comps[i]);
        }

        function search(comp) {

            var layer = comp.layers;

            for (var j = 1; j <= comp.numLayers; j++) {
                if (!(layer[j] instanceof TextLayer)) {
                    if (layer[j].source instanceof CompItem && checkNestedComps) search(layer[j].source);
                    continue;
                }

                //alert(layer[j].property("Text").property("Source Text").value.toString().replace(/(\r\n|\n|\r|\s+|\s+$)/gm,"") + "\n" + findText.text.replace(/(\r\n|\n|\r|\s+|\s+$)/gm,""))
                //Remove any enters and white space .replace(/(\r\n|\n|\r|\s+|\s+$)/gm,"")
                var findTextCap = (caseSensitivity.value == false) ? find.toUpperCase() : find;
                var comppareTextCap = (caseSensitivity.value == false) ? layer[j].property("Text").property("Source Text").value.toString().toUpperCase() : layer[j].property("Text").property("Source Text").value.toString();

                findTextCapWhiteSpace = findTextCap.replace(/(\r\n|\n|\r|\s+|\s+$)/gm, "");
                comppareTextCapWhiteSpace = comppareTextCap.replace(/(\r\n|\n|\r|\s+|\s+$)/gm, "");

                var compare = (matchFull.value) ? (findTextCapWhiteSpace == comppareTextCapWhiteSpace) : (comppareTextCapWhiteSpace.indexOf(findTextCapWhiteSpace) != -1);
                //alert(findTextCapWhiteSpace + "compare " + comppareTextCapWhiteSpace + "compare bool " + compare)
                if (compare) {
                    changes.push([comp, layer[j], replace])
                    //checkText(comp, layer[j])
                }
            }
        }

        //updateErrorText();
        app.endUndoGroup();
    }

    function replaceOne() {

        if (settingsChanged() || changes.length == 0) {
            upDownArrows(1);
        }

        app.beginUndoGroup("Find and Replace");
        try {
            var text = changes[layerLoop][1].property("Text").property("Source Text");
        }
        catch (err) {
            return
        }
        if (tabOpen != "Text find and replace") {
            if (changes[layerLoop][2] == undefined) {
                drawCircle(red);
                errorText.text = "Replace header not found"
            }
        }
        var replace = (tabOpen == "Text find and replace") ? replaceText.text : changes[layerLoop][2];
        changeText(text, findText.text, replace);
        checkText(changes[layerLoop][0], changes[layerLoop][1]);
        app.endUndoGroup();
        updateErrorText();
    }

    function replaceAll() {

        if (settingsChanged() || changes.length == 0) {
            upDownArrows(1);
        }

        app.beginUndoGroup("Find and Replace");
        for (var i = 0; i < changes.length; i++) {
            try {
                var text = changes[i][1].property("Text").property("Source Text");
            }
            catch (err) {
                continue;
            }
            var replace = (tabOpen == "Text find and replace") ? replaceText.text : changes[i][2];
            changeText(text, findText.text, replace);
            checkText(changes[i][0], changes[i][1]);
        }
        app.endUndoGroup();
        updateChangeText();
        updateErrorText();
    }

    function changeText(text, find, replace) {
        if (matchFull.value) {
            text.setValue(replace)
        } else {
            var regex = new RegExp("\\b" + find + "\\b", "ig");
            text.setValue(text.value.toString().replace(regex, replace));
        }
    }

    function checkVisible() {

        app.beginUndoGroup("Text Error Check")

        errors = [];

        var project = app.project;
        var checkNestedComps = (project.selection.length == 0) ? false : true;
        var comps = getComps();

        for (var i = 0; i < comps.length; i++) {

            if (!(comps[i] instanceof CompItem)) {
                continue;
            }
            search(comps[i]);
        }

        function search(comp) {
            var layer = comp.layers;
            for (var j = 1; j <= comp.numLayers; j++) {
                if (!(layer[j] instanceof TextLayer)) {
                    if (layer[j].source instanceof CompItem && checkNestedComps) search(layer[j].source); //If layer is a comp and not all comps are picked check it 
                    continue;
                }
                checkText(comp, layer[j]);
            }
        }
        updateErrorText();
        app.endUndoGroup();
        app.executeCommand(16);
    }

    //Check paragraph box can fit text that is inside
    function checkText(comp, layer) {
        var text = layer.property("Text").property("Source Text");

        if (!(text.value.boxText)) {
            return;
        }

        var textBoxWidth = text.value.boxTextSize[0];
        var textBoxHeight = text.value.boxTextSize[1];

        var textHeight = layer.sourceRectAtTime(layer.inPoint, false).height;

        //Make paragraph box bigger and compare the sourceRectAtTime to see if there was missing text
        var textChanges = text.value;
        textChanges.boxTextSize = [textBoxWidth, 5000];
        text.setValue(textChanges);

        if (textHeight < layer.sourceRectAtTime(layer.inPoint, false).height) {
            errors.push([comp, layer]);
        }

        //Put layers back how they were
        textChanges.boxTextSize = [textBoxWidth, textBoxHeight];
        text.setValue(textChanges);

    }

    //Update Text
    function updateErrorText() {
        //Change text if function found errors or not
        if (errors.length > 0) {
            drawCircle(red);
            errorText.text = (errors.length == 1) ? errors.length + " Error" : errors.length + " Errors";
        } else {
            drawCircle(green);
            errorText.text = "No Errors";
        }
    }

    function updateChangeText() {
        if (changes.length == 0) {
            changesMadeText.text = "No Changes Made";
        } else {
            changesMadeText.text = (changes.length == 1) ? changes.length + " Change" : changes.length + " Changes";
        }
    }

    function updateFoundText() {
        if (changes.length == 0) {
            changesMadeText.text = "No Results";
        } else {
            changesMadeText.text = (pad(layerLoop + 1, changes.length.toString().length)) + "/" + changes.length + " Found";
        }
    }
    //End update text

    //Open change, error or found menu
    function openLayerMenu(clicked, menu, textToChange, mouse) {

        var groupCount = 0;
        layerMenu = new Window("palette", undefined, undefined, { borderless: true });
        layerMenu.alignChildren = ["left", "center"];
        layerMenu.margins = 10;
        layerMenu.spacing = 3;

        for (var i = 0; i < menu.length; i++) {
            fillLayerMenu();
        }

        layerMenu.onDeactivate = function () { layerMenu.close() };
        layerMenu.location = [mouse.screenX, mouse.screenY - (25 * groupCount)];
        //clicked.text = (groupCount == 1) ? groupCount + " " + textToChange : groupCount + " " + textToChange + "s";
        if (groupCount > 0) layerMenu.show();

        function fillLayerMenu() {

            //If layer or comp was deleted remove from list
            try {
                menu[i][1].name
            }
            catch (err) {
                return
            }

            var layerGroup = layerMenu.add("group");
            layerGroup.margins = 3;
            layerGroup.info = menu[i];
            layerGroup.maximumSize.width = 250;
            var changeTextLayers = layerGroup.add("statictext", undefined, layerGroup.info[1].name)

            layerGroup.addEventListener("mouseover", function () {
                this.graphics.backgroundColor = this.graphics.newBrush(this.graphics.BrushType.SOLID_COLOR, [.1, .1, .1]);
            });

            layerGroup.addEventListener("mouseout", function () {
                this.graphics.backgroundColor = this.graphics.newBrush(this.graphics.BrushType.SOLID_COLOR, [0, 0, 0, 0]);
            });

            layerGroup.addEventListener("click", function () {
                gotoLayer(this.info[0], this.info[1])
            });
            groupCount++
        }
    }

    //Works for the arrow buttons and the layer menus
    function gotoLayer(compToShow, layerToShow) {
        try {
            compToShow.name
            layerToShow.name
        }
        catch (err) {
            changes.splice(layerLoop, 1);
            layerLoop = Math.abs(layerCounter % changes.length);
            gotoLayer(changes[layerLoop][0], changes[layerLoop][1]);
            return;
        }
        compToShow.openInViewer();
        app.executeCommand(app.findMenuCommandId("Deselect All"));
        layerToShow.selected = true;
        updateFoundText();
    }

    //Pad 00/00 found menu
    function pad(number, digits) {
        return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
    }

    function compareComps(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

})()