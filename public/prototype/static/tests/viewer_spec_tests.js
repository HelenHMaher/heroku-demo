"use strict";

QUnit.module("viewer spec", { 
        beforeEach: function() {
            this.antetype = new AntetypeWeb();
            this.specTool = new GDSpecTool(this.antetype);
        }
});



QUnit.test("rgb2hex", function(assert) {
    assert.equal(rgb2hex("rgba(1,2,3,0)"), "transparent");
    assert.equal(rgb2hex("rgb(1,2,3)"), "#010203");
    assert.equal(rgb2hex("rgba(123,100,200,0.2)"), "#7b64c833");
});


