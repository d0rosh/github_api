import { Component } from '@angular/core';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.css']
})
export class BlocksComponent {
  users: any[] = [];

  getResult({ items }) {
    console.log(items);
    this.users = items;
  }
}
