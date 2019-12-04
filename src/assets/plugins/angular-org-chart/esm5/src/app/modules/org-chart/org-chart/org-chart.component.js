import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
var OrgChartComponent = /** @class */ (function () {
    function OrgChartComponent() {
        this.hasParent = false;
        this.hideChild = false;
    }
    OrgChartComponent.prototype.toggleShowChild = function (value) {
        this.hideChild = !this.hideChild;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], OrgChartComponent.prototype, "data", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], OrgChartComponent.prototype, "hasParent", void 0);
    OrgChartComponent = tslib_1.__decorate([
        Component({
            selector: 'angular-org-chart',
            template: "<org-chart-entity *ngIf=\"data\" [data]=\"data\" [hasParent]=\"hasParent\" (toggleChild)=\"toggleShowChild($event)\" [hideChild]=\"hideChild\"></org-chart-entity>\n<div class=\"org-chart-container\" [style.display]=\"hideChild ? 'none' : 'flex'\">\n\t<ng-container *ngFor=\"let data of data?.children; first as isFirst; last as isLast\">\n\t\t<div class=\"org-chart-sub-container\">\n\t\t\t<div class=\"org-chart-connector-container\">\n\t\t\t\t<div class=\"org-chart-connector org-chart-entity-border\" [style.border-color]=\"isFirst?'transparent':''\"></div>\n\t\t\t\t<div class=\"org-chart-entity-border\"></div>\n\t\t\t\t<div class=\"org-chart-connector org-chart-entity-border\" [style.border-color]=\"isLast?'transparent':''\"></div>\n\t\t\t</div>\n\t\t\t<angular-org-chart [data]=\"data\" [hasParent]=\"true\"></angular-org-chart>\n\t\t</div>\n\t</ng-container>\n</div>",
            styles: [":host{display:flex;flex-direction:column;align-items:center;flex-wrap:wrap;padding-bottom:5px}", ".org-chart-entity-border{border-left:1px solid green;border-top:1px solid green}.org-chart-entity-connector{height:2em}.org-chart-entity-box{padding:.25em .5em;display:flex;flex-direction:column;align-items:center;border:1px solid #0085ca;background-color:#0085ca;border-radius:3px;cursor:pointer;box-shadow:0 .5rem 1rem #777!important}.org-chart-entity-name{white-space:nowrap;color:#fff;text-transform:capitalize}.org-chart-entity-type{white-space:nowrap;color:#fff;font-size:10px;text-transform:capitalize}.org-chart-container{display:flex;flex:1}.org-chart-sub-container{display:flex;flex-direction:column}.org-chart-connector-container{display:flex}.org-chart-connector{flex:1}"]
        })
    ], OrgChartComponent);
    return OrgChartComponent;
}());
export { OrgChartComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnLWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItb3JnLWNoYXJ0LyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL29yZy1jaGFydC9vcmctY2hhcnQvb3JnLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRakQ7SUFMQTtRQU9VLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDM0IsY0FBUyxHQUFHLEtBQUssQ0FBQztJQUtuQixDQUFDO0lBSEEsMkNBQWUsR0FBZixVQUFnQixLQUFLO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ2xDLENBQUM7SUFOUTtRQUFSLEtBQUssRUFBRTs7bURBQWU7SUFDZDtRQUFSLEtBQUssRUFBRTs7d0RBQW1CO0lBRmYsaUJBQWlCO1FBTDdCLFNBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsdzNCQUF5Qzs7U0FFekMsQ0FBQztPQUNXLGlCQUFpQixDQVE3QjtJQUFELHdCQUFDO0NBQUEsQUFSRCxJQVFDO1NBUlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT3JnRGF0YSB9IGZyb20gJy4uL29yZ0RhdGEnO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdhbmd1bGFyLW9yZy1jaGFydCcsXG5cdHRlbXBsYXRlVXJsOiAnLi9vcmctY2hhcnQuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9vcmctY2hhcnQuY29tcG9uZW50LnNjc3MnLCAnLi4vb3JnLWNoYXJ0LWNvbWJpbmVkLnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBPcmdDaGFydENvbXBvbmVudCB7XG5cdEBJbnB1dCgpIGRhdGE6IE9yZ0RhdGE7XG5cdEBJbnB1dCgpIGhhc1BhcmVudCA9IGZhbHNlO1xuXHRoaWRlQ2hpbGQgPSBmYWxzZTtcblx0XG5cdHRvZ2dsZVNob3dDaGlsZCh2YWx1ZSl7XG5cdFx0dGhpcy5oaWRlQ2hpbGQgPSAhdGhpcy5oaWRlQ2hpbGQ7XG5cdH1cbn1cbiJdfQ==