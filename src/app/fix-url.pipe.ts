import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixUrl'
})
export class FixUrl implements PipeTransform {

transform(value:string){

     //Remove inetpub/WWW/

     if(value){

     	let domain:string = value.substring(0, value.indexOf('inetpub'));

     	let realPath: string = value.substring(value.indexOf('WWW/') + 4, value.length);

    	return domain + realPath;
 	}
	  
    };

}
