import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
var EntityComponent = /** @class */ (function () {
    function EntityComponent() {
        this.toggleChild = new EventEmitter();
        this.hasParent = false;
    }
    EntityComponent.prototype.toggleShowChild = function () {
        this.toggleChild.emit(new Date());
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], EntityComponent.prototype, "toggleChild", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], EntityComponent.prototype, "data", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], EntityComponent.prototype, "hasParent", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], EntityComponent.prototype, "hideChild", void 0);
    EntityComponent = tslib_1.__decorate([
        Component({
            selector: 'org-chart-entity',
            template: "<div class=\"org-chart-entity-connector org-chart-entity-border\" *ngIf=\"hasParent\"></div>\n<div class=\"org-chart-entity-box\" (click)=\"toggleShowChild()\">\n\t<div class=\"org-chart-entity-name\">{{data?.name}}</div>\n\t<div class=\"org-chart-entity-type\">{{data?.type}}</div>\n</div>\n<div class=\"org-chart-entity-connector org-chart-entity-border\" *ngIf=\"data?.children.length && !hideChild\"></div>\n",
            styles: [":host{margin:0 1em;display:flex;flex-direction:column;align-items:center}", ".org-chart-entity-border{border-left:1px solid green;border-top:1px solid green}.org-chart-entity-connector{height:2em}.org-chart-entity-box{padding:.25em .5em;display:flex;flex-direction:column;align-items:center;border:1px solid #0085ca;background-color:#0085ca;border-radius:3px;cursor:pointer;box-shadow:0 .5rem 1rem #777!important}.org-chart-entity-name{white-space:nowrap;color:#fff;text-transform:capitalize}.org-chart-entity-type{white-space:nowrap;color:#fff;font-size:10px;text-transform:capitalize}.org-chart-container{display:flex;flex:1}.org-chart-sub-container{display:flex;flex-direction:column}.org-chart-connector-container{display:flex}.org-chart-connector{flex:1}"]
        })
    ], EntityComponent);
    return EntityComponent;
}());
export { EntityComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItb3JnLWNoYXJ0LyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL29yZy1jaGFydC9lbnRpdHkvZW50aXR5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVF2RTtJQUxBO1FBTVcsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxDLGNBQVMsR0FBRyxLQUFLLENBQUM7SUFNNUIsQ0FBQztJQUhBLHlDQUFlLEdBQWY7UUFDQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQVBTO1FBQVQsTUFBTSxFQUFFOzt3REFBa0M7SUFDbEM7UUFBUixLQUFLLEVBQUU7O2lEQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7O3NEQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTs7c0RBQVc7SUFKUCxlQUFlO1FBTDNCLFNBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsd2FBQXNDOztTQUV0QyxDQUFDO09BQ1csZUFBZSxDQVMzQjtJQUFELHNCQUFDO0NBQUEsQUFURCxJQVNDO1NBVFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPcmdEYXRhIH0gZnJvbSAnLi4vb3JnRGF0YSc7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ29yZy1jaGFydC1lbnRpdHknLFxuXHR0ZW1wbGF0ZVVybDogJy4vZW50aXR5LmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vZW50aXR5LmNvbXBvbmVudC5zY3NzJywgJy4uL29yZy1jaGFydC1jb21iaW5lZC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRW50aXR5Q29tcG9uZW50IHtcblx0QE91dHB1dCgpIHRvZ2dsZUNoaWxkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXHRASW5wdXQoKSBkYXRhOiBPcmdEYXRhO1xuXHRASW5wdXQoKSBoYXNQYXJlbnQgPSBmYWxzZTtcblx0QElucHV0KCkgaGlkZUNoaWxkO1xuXG5cdHRvZ2dsZVNob3dDaGlsZCgpe1xuXHRcdHRoaXMudG9nZ2xlQ2hpbGQuZW1pdChuZXcgRGF0ZSgpKTtcblx0fVxufVxuIl19