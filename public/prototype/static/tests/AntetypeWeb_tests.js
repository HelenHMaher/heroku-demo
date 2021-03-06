"use strict";

QUnit.module("AntetypeWeb", {
    beforeEach: function() {
        this.project = GDProject.createInstance();
        this.antetype = new AntetypeWeb();
        this.antetype.project = this.project;
        this.antetype.buildStyleSheet();
        this.screen =  this.project.library.screenWidget.createInstance();
        this.screen.createStyleSheets();
    }


    ,afterEach: function() {
        this.project.currentLookAndFeel.cssStyleSheet.remove();
        this.project.currentLookAndFeel.breakPointStyleSheet.remove();
        this.screen.cssStyleSheet.remove();
        this.screen.breakPointStyleSheet.remove();
    }
});

// #730 if we set a background-property to the screen we must also add it to 
// an html-rule (if not only the visible part of the screen paints the background
// this test tests changing a property ...
QUnit.test("screen background styles also on html (property)", function(assert) {
    let color = new GDUIColor({colorValue: {NSColorValue: "1.000000,1.000000,1.000000,1.000000"}, 
        objectId: 'id1234'}, this.project);
    this.antetype.cellSetPropertyInState(this.screen, 
        "backgroundPainterType", GDColorPainterType, this.screen.activeState);
    this.antetype.cellSetPropertyInState(this.screen, 
        "backgroundColor", color, this.screen.activeState);

    // safari returns style.background as "" even though background is set, 
    // but style.cssText is correct, so we use this
    assert.notEqual(this.screen.htmlCSSStyle.cssText.indexOf(`background: ${color.referenceValue};`), -1,"value in html-rule");
    let normalStyle = this.screen.cssStyleForStateIdentifier(this.screen.activeStateIdentifier);
    assert.notEqual(normalStyle.cssText.indexOf(`background: ${color.referenceValue};`), -1,"value in body-rule");
});


// ... and this tests building the whole css: (see test above)
QUnit.test("screen background styles also on html (building)", function(assert) {
    let color = new GDUIColor({colorValue: {NSColorValue: "1.000000,1.000000,1.000000,1.000000"}, 
        objectId: 'id1234'}, this.project);
    this.screen.setValueForKeyInStateWithIdentifier(GDColorPainterType, 
        "backgroundPainterType", this.screen.activeStateIdentifier);
    this.screen.setValueForKeyInStateWithIdentifier(color, 
        "backgroundColor", this.screen.activeStateIdentifier);

    this.antetype.cellProperties(null, this.screen);
    assert.notEqual(this.screen.htmlCSSStyle.cssText.indexOf( `background: ${color.referenceValue};`), -1,"value in html-rule");
    let normalStyle = this.screen.cssStyleForStateIdentifier(this.screen.activeStateIdentifier);
    assert.notEqual(normalStyle.cssText.indexOf(`background: ${color.referenceValue};`), -1,"value in body-rule");
});

