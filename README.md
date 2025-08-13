# BE Test – Zach Stephan Magistrado

This repository contains my solution for the **Backend Engineering Test**, which includes:

1. **Tuple Shuffling Pseudocode**
2. **JSON Restructuring (Section A → Section B)**
3. **Accelerometer Data Processing Strategy**
4. **API Server Implementation** with Node.js & Express

---

## Requirements

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- npm (comes with Node.js)
- [Express.js](https://expressjs.com/) (for the API server)

---

## Project Structure

├── .gitattributes

├── .gitignore

├── API_Tests.postman_collection.json

├── hierarchy.js

├── package.json

├── package-lock.json

├── server.js

├── BE_test_1.js

└── README.md

---

## Running the JSON Restructuring Script

This script takes **Section A** data and rewrites it into the hierarchical **Section B** structure, removing empty `subordinate` arrays.

**Steps:**
1. Open your terminal in the project folder.
2. Run:
   ```bash
   node BE_test_1.js
   ```
3. The transformed JSON will be logged in the console.

---

## Running the API Server

The API server is built with Node.js and Express.

1. Install Dependencies
    ```bash
    npm install express
    ```
2. Start the Server
    ```bash
    node server.js
    ```
3. Server Information
Runs on: *http://localhost:8000*

---

## API Endpoints

1. **Login** - 
POST /api/login

Body JSON:
```json
{
  "username": "abacca",
  "password": "accaba"
}
```
- Validates username: must contain "a", "b", "c" in order (case-insensitive, at least 4 letters).
- Password must be the reverse of username.

2. **List Letters** - 
GET /api/letters

- Returns all letters sorted by value in ascending order.

3. **Add Letter** - 
POST /api/letter/add
Body JSON:
``` json
{
  "letter": "C",
  "value": 3,
  "strokes": 1,
  "vowel": false
}
```
- Letters must be unique.
- value must not equal strokes.

4. **Get Letter** -
GET /api/letter/:letter

Example:
```bash
http://localhost:8000/api/letter/A
```
- Returns details of the given letter.

5. **Shuffle Letters** - 
GET /api/letter/shuffle
- Returns all letters in random order.

6. **Filter Letters** - 
GET /api/letter/filter/:val   

Example:
```bash
http://localhost:8000/api/letter/filter/1
```
- Returns letters with value <= val, ordered by insertion.

---

##Postman Collection

A Postman collection is included for quick testing of the API endpoints.

File: ``` API_Tests.postman_collection.json ```

**How to Import:**

1. Open Postman.
2. Click File → Import.
3. Select the API_Tests.postman_collection.json file.

**Preview:**
``` json
{
	"info": {
		"_postman_id": "1d107ce0-ba51-40b7-8095-f2c497d805dd",
		"name": "API Tests",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "42485853"
	},
	"item": [
		{
			"name": "test 1 - /api/login - abacca",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\n \"username\": \"abacca\",\n \"password\": \"accaba\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:8000/api/login",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "8000",
					"path": [
						"api",
						"login"
					]
				}
			},
			"response": []
		}, ...
```

---

## Notes:
1. *hierarchy.js* can be run independently to test JSON restructuring logic.
2. *server.js* implements the API and must have Express installed before running.
