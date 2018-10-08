import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { GithubService } from '../../services/github.service';
import { Language } from './../../interfaces/Language';
import { Order } from './../../interfaces/Order';
import { Repo } from './../../interfaces/Repo';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public languages: Array<Language>;
  public orders: Array<Order>;
  public totalCount: Number;
  public repos: Array<Repo> = [];
  public loaded: Boolean = false;
  searchForm; // Add Type
  initioalForm = {
    query: '',
    language: '',
    order: '',
    page: '1'
  };

  constructor(
    private languageService: LanguageService,
    private githubService: GithubService,
    private orderService: OrderService,
  ) {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      query: new FormControl(this.initioalForm.query),
      language: new FormControl(this.initioalForm.language),
      order: new FormControl(this.initioalForm.order),
      page: new FormControl(this.initioalForm.page),
    });

    this.languages = this.languageService.getLanguages();
    this.orders = this.orderService.getOrders();
    this.getData({});
  }

  @HostListener('window:scroll', []) onScrollBottom() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.getData(this.searchForm.value);
  }
}

  getData(values) {
    this.loaded = false;
    this.githubService.getRepos(values)
    .subscribe(data => {
      this.totalCount = data['total_count'];
      data['items'].forEach(element => {
        this.repos.push(element);
      });
      this.updateFormPage();
      this.loaded = true;
    });
  }

  onSubmit() {
    this.repos = [];
    this.getData(this.searchForm.value);
  }

  updateFormPage() {
    const nextPage = parseInt(this.searchForm.value.page, 10) + 1;
    this.searchForm.patchValue({
      page: nextPage
    });
  }
}
