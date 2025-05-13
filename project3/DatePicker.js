'use strict';

class DatePicker{
  constructor(id, callback){
    this.id = id;
    this.callback = callback;
  }

  render(date){
    console.log("render date called", this.id);
    const container=document.getElementById(this.id);
    container.appendChild(this.createCalendar(date));    
  }

  createCalendar(date){
    const table=document.createElement("table");
    const top=this.createCalendarTop(table, date);

    const weekdays=["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekRow=top.insertRow(1);
    for(let i=0; i<7; i++){
      const day=weekRow.insertCell(i);
      day.innerHTML=weekdays[i];
      day.className="day";
    }

    //ehnii udr
    const firstDay= new Date(date.getFullYear(), date.getMonth(), 1);
    const toDay=new Date(firstDay.getTime());
    toDay.setDate(-firstDay.getDay()+1);
    console.log(toDay.getDate());
  
    let rowNum=2;

    // eslint-disable-next-line no-constant-condition
    while(true){
      const row=table.insertRow(rowNum);
      rowNum++;

      for(let i=0; i<7; i++){
        const cell=row.insertCell(i);
        cell.className="day";
        cell.innerHTML=toDay.getDate();

        if(toDay.getMonth()===date.getMonth()){
          cell.setAttribute("id", "curMonth");
            const obj={
              month: toDay.getMonth(),
              day: cell.innerHTML,
              year: toDay.getFullYear()
            };

            cell.addEventListener("click", () => {
              this.callback(this.id, obj);
            });
        }else{
          cell.setAttribute("id", "otherMonth");
        }

        toDay.setDate(toDay.getDate()+1);
      }

      if(toDay.getMonth()!==date.getMonth()){
        break;
      }
    }
    return table;
  }

  createCalendarTop(table, date){
    const header=table.createTHead();
    const headerRow=header.insertRow(0);

    const leftArr=headerRow.insertCell(0);
    leftArr.innerHTML="<";
    leftArr.setAttribute("id", "leftArr");

    const monthCell=headerRow.insertCell(1);
    const months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    monthCell.innerHTML=months[date.getMonth()]+" " + date.getFullYear();
    monthCell.colSpan="5";

    const rightArr=headerRow.insertCell(2);
    rightArr.innerHTML=">";
    rightArr.setAttribute("id", "rightArr");

    leftArr.addEventListener("click", () => {
      table.remove();
      date.setMonth(date.getMonth()-1);
      console.log(date);
      this.render(date);
    });

    rightArr.addEventListener("click", () => {
      table.remove();
      date.setMonth(date.getMonth()+1);
      console.log(date);
      this.render(date);
    });
    return header;
  }
}