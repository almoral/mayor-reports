import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class Search implements PipeTransform {

transform(value: any, term:string, selectedYear:any, selectedMonth:any){

		if(value !== null && value !== undefined){

			let results:any;
			let file:any = { showMessage: "No Results Found" };
			
			if(!selectedYear && !selectedMonth){

				results =  value.filter((item:any) => item.label !== null && item.label.toLowerCase().indexOf(term.toLowerCase()) > -1);
									
				if(results.length == 0)
					results = [file];

				return results;

			} 
		
			if(!selectedYear && !selectedMonth) {

				results =  value.filter((item:any) => item.year !== null && item.year == selectedYear.target.value);

				if(results.length == 0)
					results = [file];

				return results;
			}

		
			if(selectedYear && !selectedMonth){

				results =  value.filter((item:any) => item.year !== null && item.year == selectedYear.target.value && item.label.toLowerCase().indexOf(term.toLowerCase()) > -1);

				if(results.length == 0)
					results = [file];

				return results;

			}

			if(selectedYear && selectedMonth){

				if(selectedYear.target.value == 'false' && selectedMonth.target.value == 'false'){

					results =  value.filter((item:any) => item.label !== null && item.label.toLowerCase().indexOf(term.toLowerCase()) > -1);

					if(results.length == 0)
						results = [file];

					return results;

				}


				if(selectedMonth.target.value == 'false'){
					results =  value.filter((item:any) => item.year !== null && item.year == selectedYear.target.value && item.label.toLowerCase().indexOf(term.toLowerCase()) > -1);

					if(results.length == 0)
						results = [file];

					return results;
				}

				if(selectedYear.target.value == 'false'){
					results =  value.filter((item:any) => item.year !== null && item.monthLabel == selectedMonth.target.value);

					if(results.length == 0)
						results = [file];

					return results;
				}

				results =  value.filter((item:any) => item.year !== null && item.year == selectedYear.target.value && item.label.toLowerCase().indexOf(term.toLowerCase()) > -1 && item.monthLabel == selectedMonth.target.value);

					
					if(results.length == 0)
						results = [file];

				return results;

			}

			if(!selectedYear && selectedMonth){

				if(selectedMonth.target.value == 'false'){
					results =  value.filter((item:any) => item.label !== null && item.label.toLowerCase().indexOf(term.toLowerCase()) > -1);

					if(results.length == 0)
						results = [file];

					return results;
				}

				results =  value.filter((item:any) => item.year !== null && item.monthLabel == selectedMonth.target.value);

					if(results.length == 0)
						results = [file];

				return results;

			}

			if(selectedYear && selectedMonth){

				results =  value.filter((item:any) => item.year !== null && item.label.toLowerCase().indexOf(term.toLowerCase()) > -1 && item.monthLabel == selectedMonth.target.value);

					
					if(results.length == 0)
						results = [file];

				return results;

			}

		}

	}

}
