export interface Course{
    image:string,
    name:string,
    id:string,
    instructor_id:string,
    description:string,
    is_active:boolean,
    is_free:boolean,
    language:string,
    price_actual:number,
    price_offer:number,
    validity:number,
    validity_type:string,
    category:string,
    duration:string,
    overview:string,
    validities:any[]
}