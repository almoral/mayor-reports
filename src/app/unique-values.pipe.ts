import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uniqueValues'
})
export class UniqueValues implements PipeTransform {

	  transform(items: any[] = []){

    if(items !== null && items !== undefined){
	  	let tempArray:any[] = [{
        'label':'Please Select a Year',
        'year': 'false'
      }];
	  	let unique = {};

      //this.items = items;


  		for(var i in items){

          if(typeof(unique[items[i].year]) == "undefined"){
    			
    			  if(items[i].year !== null && items[i].year.length > 0)
    				  tempArray.push({
                'label': items[i].year,
                'year': items[i].year
              })
    		  }

    		  unique[items[i].year] = 0;
  		}

	  	return tempArray;
	  
    };
  }
}
