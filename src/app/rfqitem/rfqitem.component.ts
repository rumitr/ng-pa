import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { PaService } from '../service/pa.service';


@Component({
  selector: '[app-rfqitem]',
  templateUrl: './rfqitem.component.html',
  styleUrls: ['./rfqitem.component.scss']
})
export class RfqitemComponent implements OnInit, OnChanges {

  constructor(private pa: PaService) { }
  @Input() rfqitem;
  @Input() offers;
  @Output() selected = new EventEmitter<{}>();
  private selectedOffer: '';
  total: number = 0;


   ngOnInit() {
    this.selectByPrice();
    }

    ngOnChanges() {
      this.offers = Object.values(this.offers);
    }

    selectOffer(index) {
      let prev_supplier = '';
      if (this.selectedOffer !== undefined) {
        prev_supplier = this.offers[this.selectedOffer].Supplier.id;
        this.offers[this.selectedOffer].selected = false;
      }
      const prev_total = this.total;
      this.offers[index].selected = true;
      this.total = this.offers[index].price * this.rfqitem.quantity;
      this.selectedOffer = index;
      const difference = this.total- prev_total;
      this.selected.emit({ total: this.total, prev_total: prev_total, id: this.rfqitem._id, supplier: this.offers[index].Supplier.id, prev_supplier: prev_supplier });
    }

    selectByPrice(){
      let price, selected_offer;
      this.offers.forEach((offer, index) => {
        if(offer !== 'null') {
          if(price == undefined){
            price = offer.price;
            selected_offer = index;
          } else if(price > offer.price) {
            price = offer.price;
            selected_offer = index;
          }
        }
      });
      if(price != undefined) {
        this.selectOffer( selected_offer);
      }
    }




}
