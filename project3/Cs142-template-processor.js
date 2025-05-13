"use strict";

class Cs142TemplateProcessor {
  constructor(template) {
    this.template = template;
  }
}
Cs142TemplateProcessor.prototype.fillIn = function(dictionary){
 
  let word=this.template;
  let rep=word.replace(/{{(.*?)}}/g, function(match, repword){
    return dictionary[repword] !== undefined ? dictionary[repword] : "";  
  });
  return rep;
}