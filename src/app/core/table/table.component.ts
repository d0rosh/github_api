import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  users: any[] = null;

  getResult({ items }) {
    console.log(items);
    this.users = items;
  }
}
