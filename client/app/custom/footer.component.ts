import {Component, inject} from "@angular/core";
import {AppDataService} from "@app/app-data.service";
import {NodeResolver} from "@app/shared/resolvers/node.resolver";

import {MarkdownComponent} from "ngx-markdown";

import {TranslatePipe, TranslateDirective} from "@ngx-translate/core";
import {StripHtmlPipe} from "@app/shared/pipes/strip-html.pipe";

@Component({
    selector: "app-footer",
    templateUrl: "./footer.component.html",
    standalone: true,
    imports: [MarkdownComponent, TranslatePipe, TranslateDirective, StripHtmlPipe]
})
export class FooterComponent {
  protected appDataService = inject(AppDataService);
  protected nodeResolver = inject(NodeResolver);
}
