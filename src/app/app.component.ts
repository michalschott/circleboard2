import { ActivatedRoute } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';
import { take, map, filter } from 'rxjs/operators';

import { BoardConfigService } from './board-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  constructor(
    private route: ActivatedRoute,
    private configService: BoardConfigService,
  ) {
    // on initialization read GET parameters
    this.route.queryParams
      .subscribe((params) => {
        const config = this.configService.read();
        config.merge(params);
        this.configService.save(config);
      });

    // subscribe to font size changes and set them on the body
    this.configService.change$.subscribe((config) => {
      document.body.style.fontSize = `${config.fontSize}px`;
    });
  }
}
