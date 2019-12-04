import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let OrgChartComponent = class OrgChartComponent {
    constructor() {
        this.hasParent = false;
        this.hideChild = false;
    }
    toggleShowChild(value) {
        this.hideChild = !this.hideChild;
    }
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
export { OrgChartComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnLWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItb3JnLWNoYXJ0LyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL29yZy1jaGFydC9vcmctY2hhcnQvb3JnLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRakQsSUFBYSxpQkFBaUIsR0FBOUI7SUFMQTtRQU9VLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDM0IsY0FBUyxHQUFHLEtBQUssQ0FBQztJQUtuQixDQUFDO0lBSEEsZUFBZSxDQUFDLEtBQUs7UUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDbEMsQ0FBQztDQUNELENBQUE7QUFQUztJQUFSLEtBQUssRUFBRTs7K0NBQWU7QUFDZDtJQUFSLEtBQUssRUFBRTs7b0RBQW1CO0FBRmYsaUJBQWlCO0lBTDdCLFNBQVMsQ0FBQztRQUNWLFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsdzNCQUF5Qzs7S0FFekMsQ0FBQztHQUNXLGlCQUFpQixDQVE3QjtTQVJZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9yZ0RhdGEgfSBmcm9tICcuLi9vcmdEYXRhJztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnYW5ndWxhci1vcmctY2hhcnQnLFxuXHR0ZW1wbGF0ZVVybDogJy4vb3JnLWNoYXJ0LmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vb3JnLWNoYXJ0LmNvbXBvbmVudC5zY3NzJywgJy4uL29yZy1jaGFydC1jb21iaW5lZC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgT3JnQ2hhcnRDb21wb25lbnQge1xuXHRASW5wdXQoKSBkYXRhOiBPcmdEYXRhO1xuXHRASW5wdXQoKSBoYXNQYXJlbnQgPSBmYWxzZTtcblx0aGlkZUNoaWxkID0gZmFsc2U7XG5cdFxuXHR0b2dnbGVTaG93Q2hpbGQodmFsdWUpe1xuXHRcdHRoaXMuaGlkZUNoaWxkID0gIXRoaXMuaGlkZUNoaWxkO1xuXHR9XG59XG4iXX0=