import { Component, ChangeDetectorRef } from '@angular/core';
import { PaService } from './service/pa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-pa';
  constructor(private pa: PaService, private cdr: ChangeDetectorRef) {
    this.count = 0;
   }
  rfq;
  rfqitems;
  offers;
  suppliers;
  mapped;
  count;
  total:number = 0;

  ngOnInit() {
    this.pa.get().subscribe((data: {rfq: {}, quote_items: {}, rfq_items: {}, suppliers: {}}) => {
      this.rfq = data.rfq;
      this.rfqitems = data.rfq_items;
      this.offers = data.quote_items;
      this.suppliers = this.mapSupplier(data.suppliers);
      // this.suppliers = data.suppliers;
      this.count = this.rfqitems.length;

      this.mapped = this.offerMap();
    });
  }

  mapSupplier(suppliers) {
    let temp = [];
    suppliers.forEach(supplier => {
      supplier['coverage'] = 0;
      supplier['total'] = 0;
    });
    return suppliers;
  }

  // no longer required
  // getSuppliers() {
  //   let temp = [];

  //   this.offers.forEach(offer => {
  //     if (temp.indexOf(offer.Supplier.id) === -1) {
  //       temp.push(offer.Supplier.id);
  //     }
  //   });
  //   return temp;
  // }

  getSupplierById(supplier_id) {
    for(let i = 0; i < this.suppliers.length; i++) {
      if(supplier_id == this.suppliers[i]._id) {
        return this.suppliers[i];
      }
    }

  }

  offerMap () {
    let map = [];
    this.rfqitems.forEach((rfqitem, index) => {
      rfqitem.total = 0;
      map[rfqitem._id] = {};
      this.suppliers.forEach((supplier, count) =>  {
        map[rfqitem._id][supplier._id] = 'null';
      });
    });
    this.offers.forEach(offer => {
      map[offer.RfqItem.id][offer.Supplier.id] = offer;
      let supplier = this.getSupplierById(offer.Supplier.id);
      supplier['coverage']++;
    });
    return map;
  }


  onSelected(item: {total: number, prev_total: number, id: string, supplier: string, prev_supplier: string}){
    let target;
    for(let i = 0; i < this.rfqitems.length; i++) {
      if(this.rfqitems[i]._id === item.id) {
        target = this.rfqitems[i];
        break;
      }
    }

    if(item.prev_supplier != '') {
      const prevSupplier = this.getSupplierById(item.prev_supplier);
      prevSupplier['total'] -= item.prev_total;
    }
    const supplier = this.getSupplierById(item.supplier);
    supplier['total'] += item.total;
    this.total += item.total - item.prev_total;
    target.total = item.total;
    this.cdr.detectChanges();
  }

  sortByValue() {
    // this.rfqitems.sort((a,b) =>  { console.log(a, b, a.total - b.total ); a.total - b.total});
    this.rfqitems.sort((a,b) =>  a.total - b.total);
    console.log(this.rfqitems);
  }

  sortByCoverage() {
    // this.rfqitems.sort((a,b) =>  { console.log(a, b, a.total - b.total ); a.total - b.total});
    this.suppliers.sort((a,b) => b.coverage - a.coverage);
    // console.log(this.suppliers);
    this.mapped = this.offerMap();
    // this.cdr.detectChanges();

  }
}
