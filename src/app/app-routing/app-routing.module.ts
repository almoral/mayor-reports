import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MayorPdfSearchComponent} from '../mayor-pdf-search/mayor-pdf-search.component';

const routes: Routes = [
  // {path: '', redirectTo: 'calendar', pathMatch: 'full' },
  // {path: 'calendar', component: CalendarComponent,
  //   children: [
  //     {path: '', redirectTo: 'events', pathMatch: 'full'},
  //     {path: 'events', component: EventsComponent},
  //     {path: 'test', component: TestViewComponent}
  //   ]
  // },
  {path: '**', component: MayorPdfSearchComponent}
  // {path: '', redirectTo: 'events', pathMatch: 'full'},
  // {path: 'events', component: EventsComponent},
  // {path: 'test', component: TestViewComponent},
  // {path: '**', component: EventsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
