import { __decorate, __metadata } from 'tslib';
import { Input, Component, Output, EventEmitter, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

var OrgChartComponent = /** @class */ (function () {
    function OrgChartComponent() {
        this.hasParent = false;
        this.hideChild = false;
    }
    OrgChartComponent.prototype.toggleShowChild = function (value) {
        this.hideChild = !this.hideChild;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], OrgChartComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], OrgChartComponent.prototype, "hasParent", void 0);
    OrgChartComponent = __decorate([
        Component({
            selector: 'angular-org-chart',
            template: "<org-chart-entity *ngIf=\"data\" [data]=\"data\" [hasParent]=\"hasParent\" (toggleChild)=\"toggleShowChild($event)\" [hideChild]=\"hideChild\"></org-chart-entity>\n<div class=\"org-chart-container\" [style.display]=\"hideChild ? 'none' : 'flex'\">\n\t<ng-container *ngFor=\"let data of data?.children; first as isFirst; last as isLast\">\n\t\t<div class=\"org-chart-sub-container\">\n\t\t\t<div class=\"org-chart-connector-container\">\n\t\t\t\t<div class=\"org-chart-connector org-chart-entity-border\" [style.border-color]=\"isFirst?'transparent':''\"></div>\n\t\t\t\t<div class=\"org-chart-entity-border\"></div>\n\t\t\t\t<div class=\"org-chart-connector org-chart-entity-border\" [style.border-color]=\"isLast?'transparent':''\"></div>\n\t\t\t</div>\n\t\t\t<angular-org-chart [data]=\"data\" [hasParent]=\"true\"></angular-org-chart>\n\t\t</div>\n\t</ng-container>\n</div>",
            styles: [":host{display:flex;flex-direction:column;align-items:center;flex-wrap:wrap;padding-bottom:5px}", ".org-chart-entity-border{border-left:1px solid green;border-top:1px solid green}.org-chart-entity-connector{height:2em}.org-chart-entity-box{padding:.25em .5em;display:flex;flex-direction:column;align-items:center;border:1px solid #0085ca;background-color:#0085ca;border-radius:3px;cursor:pointer;box-shadow:0 .5rem 1rem #777!important}.org-chart-entity-name{white-space:nowrap;color:#fff;text-transform:capitalize}.org-chart-entity-type{white-space:nowrap;color:#fff;font-size:10px;text-transform:capitalize}.org-chart-container{display:flex;flex:1}.org-chart-sub-container{display:flex;flex-direction:column}.org-chart-connector-container{display:flex}.org-chart-connector{flex:1}"]
        })
    ], OrgChartComponent);
    return OrgChartComponent;
}());

var EntityComponent = /** @class */ (function () {
    function EntityComponent() {
        this.toggleChild = new EventEmitter();
        this.hasParent = false;
    }
    EntityComponent.prototype.toggleShowChild = function () {
        this.toggleChild.emit(new Date());
    };
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], EntityComponent.prototype, "toggleChild", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], EntityComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], EntityComponent.prototype, "hasParent", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], EntityComponent.prototype, "hideChild", void 0);
    EntityComponent = __decorate([
        Component({
            selector: 'org-chart-entity',
            template: "<div class=\"org-chart-entity-connector org-chart-entity-border\" *ngIf=\"hasParent\"></div>\n<div class=\"org-chart-entity-box\" (click)=\"toggleShowChild()\">\n\t<div class=\"org-chart-entity-name\">{{data?.name}}</div>\n\t<div class=\"org-chart-entity-type\">{{data?.type}}</div>\n</div>\n<div class=\"org-chart-entity-connector org-chart-entity-border\" *ngIf=\"data?.children.length && !hideChild\"></div>\n",
            styles: [":host{margin:0 1em;display:flex;flex-direction:column;align-items:center}", ".org-chart-entity-border{border-left:1px solid green;border-top:1px solid green}.org-chart-entity-connector{height:2em}.org-chart-entity-box{padding:.25em .5em;display:flex;flex-direction:column;align-items:center;border:1px solid #0085ca;background-color:#0085ca;border-radius:3px;cursor:pointer;box-shadow:0 .5rem 1rem #777!important}.org-chart-entity-name{white-space:nowrap;color:#fff;text-transform:capitalize}.org-chart-entity-type{white-space:nowrap;color:#fff;font-size:10px;text-transform:capitalize}.org-chart-container{display:flex;flex:1}.org-chart-sub-container{display:flex;flex-direction:column}.org-chart-connector-container{display:flex}.org-chart-connector{flex:1}"]
        })
    ], EntityComponent);
    return EntityComponent;
}());

var OrgChartModule = /** @class */ (function () {
    function OrgChartModule() {
    }
    OrgChartModule = __decorate([
        NgModule({
            imports: [
                CommonModule
            ],
            declarations: [OrgChartComponent, EntityComponent],
            exports: [
                OrgChartComponent
            ]
        })
    ], OrgChartModule);
    return OrgChartModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { OrgChartModule, OrgChartComponent as ɵa, EntityComponent as ɵb };
//# sourceMappingURL=angular-org-chart.js.map
