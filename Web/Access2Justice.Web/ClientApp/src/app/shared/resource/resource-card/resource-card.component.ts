import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-resource-card',
  templateUrl: './resource-card.component.html',
  styleUrls: ['./resource-card.component.css']
})
export class ResourceCardComponent implements OnInit {
  modalRef: BsModalRef;

  @Input() resource: any;
  @Input() searchResource: any;
  @Input() isSearchResults: boolean;
  url: any;

  constructor(public sanitizer: DomSanitizer, private modalService: BsModalService) {
    this.sanitizer = sanitizer;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  resourceUrl() {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.resource.url);
    return this.url;
  }

  ngOnInit() {
    if (this.searchResource != null || this.searchResource != undefined) {
      this.resource = this.searchResource;
    } else {
      this.resource = this.resource;
    }
  }

}
