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

##  Create a new Product
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

   
