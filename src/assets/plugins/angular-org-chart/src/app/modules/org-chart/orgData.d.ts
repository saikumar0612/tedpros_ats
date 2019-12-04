export interface OrgData {
    name: string;
    type: string;
    children: OrgData[];
    img: string;
    id: string;
}
export declare class OrgEntity implements OrgData {
    name: string;
    type: string;
    img: string;
    id: string;
    children: OrgEntity[];
    parent?: OrgEntity;
    constructor(orgStructure: string[], parent?: OrgEntity);
}
