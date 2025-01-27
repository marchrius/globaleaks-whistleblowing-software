import {Component, OnInit, inject} from "@angular/core";
import {NodeResolver} from "@app/shared/resolvers/node.resolver";
import {PreferenceResolver} from "@app/shared/resolvers/preference.resolver";
import {nodeResolverModel} from "@app/models/resolvers/node-resolver-model";
import {preferenceResolverModel} from "@app/models/resolvers/preference-resolver-model";
import {UtilsService} from "@app/shared/services/utils.service";
import {NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLinkButton, NgbNavLinkBase, NgbNavContent, NgbNavOutlet} from "@ng-bootstrap/ng-bootstrap";
import {UserHomeComponent} from "@app/shared/partials/user-home/user-home.component";

import {TranslatorPipe} from "@app/shared/pipes/translate";

@Component({
    selector: "src-luna-version",
    templateUrl: "./luna-version.component.html",
    standalone: true,
    imports: [TranslatorPipe]
})
export class lunaVersionComponent implements OnInit {
  protected nodeResolver = inject(NodeResolver);

  nodeData: nodeResolverModel;
  
  ngOnInit(): void {
    if (this.nodeResolver.dataModel) {
      this.nodeData = this.nodeResolver.dataModel;
    }
  }
}
