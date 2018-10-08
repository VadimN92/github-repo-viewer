import { Injectable } from '@angular/core';
import { Order } from '../interfaces/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orders: Array<Order> = [
    {value: 'asc', label: 'Asc'},
    {value: 'decs', label: 'Desc'}
  ];

  constructor() { }

  getOrders(): Array<Order> {
    return this.orders;
  }
}
