import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sobre-adatech',
  templateUrl: './sobre-adatech.component.html',
  styleUrls: ['./sobre-adatech.component.css']
})
export class SobreAdatechComponent implements OnInit {

  constructor(

    private router: Router

  ) { }

  ngOnInit() {

    window.scroll(0,0)

  }

}
