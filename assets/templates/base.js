module.exports = function(Handlebars) {

this["FCTPL"] = this["FCTPL"] || {};

this["FCTPL"]["base/base"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input type=\"text\" id=\"date\" maxlength=\"10\">\r\n<div class=\"content\"></div>";
},"useData":true});

return this["FCTPL"];

};