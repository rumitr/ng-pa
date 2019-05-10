import { Component } from '@angular/core';
import { PaService } from './service/pa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-pa';
  constructor(private pa: PaService) { }
   rfq;
   rfqitems;
   offers;
   suppliers;
   mapped;

  ngOnInit() {
    this.pa.get().subscribe((data: {rfq: {}, quote_items: {}, rfq_items: {}}) => {
      this.rfq = data.rfq;
      this.rfqitems = data.rfq_items;
      this.offers = data.quote_items;
      this.suppliers = this.getSuppliers();
      this.mapped = this.offerMap();
    });

  }

  getSuppliers() {
    let temp = [];

    this.offers.forEach(offer => {
      if (temp.indexOf(offer.Supplier.id) === -1) {
        temp.push(offer.Supplier.id);
      }
    });
    return temp;
  }

  offerMap () {
    let map = [];
    this.rfqitems.forEach((rfqitem, index) => {
      map[rfqitem._id] = {};
      this.suppliers.forEach((supplier, count) =>  {
        map[rfqitem._id][supplier] = 'null';
      });
    });
    this.offers.forEach(offer => {
      map[offer.RfqItem.id][offer.Supplier.id] = offer;
    });
    return map;
  }
}
