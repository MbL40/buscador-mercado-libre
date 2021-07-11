import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchItemService } from 'src/app/modules/core/services/search-items/search-item.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  formSearch: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  public passQueryParameter() {
    this.router.navigate(['/']).then(() => { this.router.navigate(['/items'], { queryParams: { search: this.search?.value } }); })
  }

  private buildForm() {
    this.formSearch = this.formBuilder.group({
      search: ['', Validators.required]
    })
  }

  get form() { return this.formSearch }
  get search() { return this.formSearch.get("search") }
}
