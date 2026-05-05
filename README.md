# Development Technical Assessment (MERN Stack)

## Project Start
- React frontend
- Node.js 22 backend
- MongoDB 8 database

Run everything with:

```bash
docker compose up --build
```

Services:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- MongoDB: mongodb://localhost:27017/dev-interview

On first creation of the MongoDB volume, Docker restores the dump in `resources/database/dev-interview` into a `dev-interview` database.

In exercise 1 of the MongoDB part, the pricing for the same product seems inconsistent, I assumed the price was for an individual product, therefore it needed to be multiplied by the quantity to figure out the final price.