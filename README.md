# E-Commerce API

This is a simple Node.js and MongoDB-based REST API for an e-commerce system.

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

##  Create a new Product [/api/products]
in body pass:

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

## retrieve products [/api/products]


## Create a New variant for a product [/api/products/:productId/variants]

In Body-Raw-Json pass:

{
  "name": "New Variant UPDATED for mirrar",
  "SKU": "NV1",
  "additionalCost": 5,
  "stockCount": 50000
}

In params pass:
productId : 65bbfdf420036076af06ace9 // or refer to ecomm.products.api for refernce

   
