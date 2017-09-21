export class OrganizationNode {
    id: string;
    text:string;
    path:string;
    type:string;
    count:number;
    province:string;
    city:string;
    county:string;
    street:string;
    longitude:string;
    latitude:string;
    addrPath:string;
    brandId:string;
    storeCode:string;
    leaf:boolean;
    expanded:boolean;
    children:OrganizationNode[];
}