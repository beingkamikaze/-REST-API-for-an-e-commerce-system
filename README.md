# E-Commerce API

This is a simple Node.js and MongoDB-based REST API for an e-commerce system.

## Postman collection

```bash
https://www.postman.com/beingkamikaze/workspace/ecommapiworkspace/collection/18544750-1cdb5af9-a654-464f-a297-e1141cd47f8f?action=share&creator=18544750
```

## Prerequisites

- Node.js 
- MongoDB
- npm (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/e-commerce-api.git
2.Change into the project directory:
   cd e-commerce-api
3. RUN NPM install

## To start the application run npm start

# API REFERNCE

##  Create a new Product [POST][/api/products]
in body pass:

```json
{
  "name": "mirar product test",
  "description": "This is an example product test for mirar",
  "price": 50,
  "variants": [
    {
      "name": "test for product",
      "SKU": "V1",
      "additionalCost": 10,
      "stockCount": 100
    },
    {
      "name": "Variant 2 mirrar",
      "SKU": "V2",
      "additionalCost": 15,
      "stockCount": 50
    }
  ]
}
```

## retrieve products [GET][/api/products]


## Create a New variant for a product [POST][/api/products/:productId/variants]

In Body-Raw-Json pass:
```json
{
  "name": "New Variant UPDATED for mirrar",
  "SKU": "NV1",
  "additionalCost": 5,
  "stockCount": 50000
}
```

In params pass:
```
productId : 65bbfdf420036076af06ace9 // or refer to ecomm.products.api for refernce

```

   
## Search products by name, decription or Variant name [GET][/api/products/search]

In query Pass:
```

q = Example Product computer or This is an example product computer or desktop
```
## Update a Product [PUT][/api/products/:productId]

In Body-Raw-JSON Pass:
```json
{
  "name": "Updated Product Name",
  "description": "Updated product description",
  "price": 60
}
```
In params pass:
```
productId : 65bbfdf420036076af06ace9 // or refer to ecomm.products.api for refernce
```
## Update a variant for a product [PUT][/api/products/:productId/variants/:variantId]
```json
In Body-Raw-JSON Pass : 

{
  "name": "Updated Variant Name for mirrar",
  "additionalCost": 20,
  "stockCount": 80
}
```
```
In params pass:

productId : 65bbfe7520036076af06acf9 // or refer to ecomm.products.api for refernce
variantId : 65bbfe7520036076af06acfb // or refer to ecomm.products.api for refernce
```
## Delete a Product [DELETE][/api/products/:productId]

In params pass:
```
productId : 65bbfe1320036076af06aced // or refer to ecomm.products.api for refernce
```
## Delete a Variant of product [DELETE][/api/products/:productId/variants/:variantId]
```
In params pass:

productId : 65bbfe7520036076af06acf9 // or refer to ecomm.products.api for refernce
variantId : 65bbfe7520036076af06acfb // or refer to ecomm.products.api for refernce
```

``If any particular API fails for given cases, you can refer to the ecomm.products.api file for manual testing. This file contains detailed schema and data collection for testing each API.``
