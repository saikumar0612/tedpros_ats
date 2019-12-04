(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('angular-org-chart', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = global || self, factory(global['angular-org-chart'] = {}, global.ng.core, global.ng.common));
}(this, function (exports, core, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    var OrgChartComponent = /** @class */ (function () {
        function OrgChartComponent() {
            this.hasParent = false;
            this.hideChild = false;
        }
        OrgChartComponent.prototype.toggleShowChild = function (value) {
            this.hideChild = !this.hideChild;
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], OrgChartComponent.prototype, "data", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], OrgChartComponent.prototype, "hasParent", void 0);
        OrgChartComponent = __decorate([
            core.Component({
                selector: 'angular-org-chart',
                template: "<org-chart-entity *ngIf=\"data\" [data]=\"data\" [hasParent]=\"hasParent\" (toggleChild)=\"toggleShowChild($event)\" [hideChild]=\"hideChild\"></org-chart-entity>\n<div class=\"org-chart-container\" [style.display]=\"hideChild ? 'none' : 'flex'\">\n\t<ng-container *ngFor=\"let data of data?.children; first as isFirst; last as isLast\">\n\t\t<div class=\"org-chart-sub-container\">\n\t\t\t<div class=\"org-chart-connector-container\">\n\t\t\t\t<div class=\"org-chart-connector org-chart-entity-border\" [style.border-color]=\"isFirst?'transparent':''\"></div>\n\t\t\t\t<div class=\"org-chart-entity-border\"></div>\n\t\t\t\t<div class=\"org-chart-connector org-chart-entity-border\" [style.border-color]=\"isLast?'transparent':''\"></div>\n\t\t\t</div>\n\t\t\t<angular-org-chart [data]=\"data\" [hasParent]=\"true\"></angular-org-chart>\n\t\t</div>\n\t</ng-container>\n</div>",
                styles: [":host{display:flex;flex-direction:column;align-items:center;flex-wrap:wrap;padding-bottom:5px}", ".org-chart-entity-border{border-left:1px solid green;border-top:1px solid green}.org-chart-entity-connector{height:2em}.org-chart-entity-box{padding:.25em .5em;display:flex;flex-direction:column;align-items:center;border:1px solid #0085ca;background-color:#0085ca;border-radius:3px;cursor:pointer;box-shadow:0 .5rem 1rem #777!important}.org-chart-entity-name{white-space:nowrap;color:#fff;text-transform:capitalize}.org-chart-entity-type{white-space:nowrap;color:#fff;font-size:10px;text-transform:capitalize}.org-chart-container{display:flex;flex:1}.org-chart-sub-container{display:flex;flex-direction:column}.org-chart-connector-container{display:flex}.org-chart-connector{flex:1}"]
            })
        ], OrgChartComponent);
        return OrgChartComponent;
    }());

    var EntityComponent = /** @class */ (function () {
        function EntityComponent() {
            this.toggleChild = new core.EventEmitter();
            this.hasParent = false;
        }
        EntityComponent.prototype.toggleShowChild = function () {
            this.toggleChild.emit(new Date());
        };
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], EntityComponent.prototype, "toggleChild", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], EntityComponent.prototype, "data", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], EntityComponent.prototype, "hasParent", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], EntityComponent.prototype, "hideChild", void 0);
        EntityComponent = __decorate([
            core.Component({
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
            core.NgModule({
                imports: [
                    common.CommonModule
                ],
                declarations: [OrgChartComponent, EntityComponent],
                exports: [
                    OrgChartComponent
                ]
            })
        ], OrgChartModule);
        return OrgChartModule;
    }());

    exports.OrgChartModule = OrgChartModule;
    exports.ɵa = OrgChartComponent;
    exports.ɵb = EntityComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=angular-org-chart.umd.js.map
