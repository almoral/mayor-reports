import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonthService {
  months = [
    {
      label: 'January',
      value: 'January',
      isDisabled: false
    },
    {
      label: 'February',
      value: 'February',
      isDisabled: false
    },
    {
      label: 'March',
      value: 'March',
      isDisabled: false
    },
    {
      label: 'April',
      value: 'April',
      isDisabled: false
    },
    {
      label: 'May',
      value: 'May',
      isDisabled: false
    },
    {
      label: 'June',
      value: 'June',
      isDisabled: false
    },
    {
      label: 'July',
      value: 'July',
      isDisabled: false
    },
    {
      label: 'August',
      value: 'August',
      isDisabled: false
    },
    {
      label: 'September',
      value: 'September',
      isDisabled: false
    },
    {
      label: 'October',
      value: 'October',
      isDisabled: false
    },
    {
      label: 'November',
      value: 'November',
      isDisabled: false
    },
    {
      label: 'December',
      value: 'December',
      isDisabled: false
    }
  ];

  constructor() {}
}
