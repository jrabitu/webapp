'use strict';

class TableTemplate{
  static fillIn(id, dict, columnName){
    const table=document.getElementById(id);
    const header=table.rows[0];
    const processor=new Cs142TemplateProcessor(header.innerHTML);
    const newHeader=processor.fillIn(dict);
    header.innerHTML=newHeader;

    let col=[];
    if(columnName===undefined){
      col=Array.from(Array(header.cells.length).keys());
    }else{
      for(let i=0; i<header.cells.length; i++){
        if(header.cells[i].innerHTML===columnName){
          col=[i];
        }
      }
    }
    console.log(col);
    for(let i=1; i<table.rows.length; i++){
      for(let j=0; j<col.length; j++){
        const cell=table.rows[i].cells[col[j]];
        const cProcessor=new Cs142TemplateProcessor(cell.innerHTML);
        cell.innerHTML=cProcessor.fillIn(dict);
      }
    }
    table.style.visibility="visible";
  }
}