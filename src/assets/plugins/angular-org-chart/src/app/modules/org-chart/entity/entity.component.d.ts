import { EventEmitter } from '@angular/core';
import { OrgData } from '../orgData';
export declare class EntityComponent {
    toggleChild: EventEmitter<{}>;
    data: OrgData;
    hasParent: boolean;
    hideChild: any;
    toggleShowChild(): void;
}
