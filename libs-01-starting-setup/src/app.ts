import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { Product } from "./product.model";

const p1 = new Product('A book', 12.99)
console.log(p1.getInformation())

const products = [{
    title: 'A carpet',
    price: 13.99
},
    {
        title: 'A book',
        price: 10.99
}
]

const newPrd = new Product("", -7.99)
validate(newPrd).then(errors => {
    if (errors.length > 0) {
        console.log('VALI ERROR')
        console.log(errors)
    } else {
        console.log(newPrd.getInformation())
    }
})

const loadedProducts = plainToClass(Product, products)

for (const prod of loadedProducts) {
    console.log(prod.getInformation())
}