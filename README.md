# Home Test Project  

## 🚀 Introduction  

Thank you **Modelty Strategy and Consulting** for giving me the opportunity to take this test. Below is a detailed explanation of the project to help everyone understand it better.  

## 📦 Technologies Used  

- **ExpressJS** - Backend framework  
- **TypeScript** - Ensures safer code with static typing  
- **Zod** - Powerful validation library  
- **Jest** - Popular testing framework  
- **Supertest** - API testing tool  
- **TypeORM** - A powerful ORM  
- **SQLite** - Lightweight and easy-to-deploy database  

## 🛠 Installation  


1. Clone the repository:  

   ```sh
   git clone <repository-url>
   cd <project-folder>
   ```  

2. Install dependencies:  

   ```sh
   npm install
   ```  

## 🚀 Running the Project  

### Development Mode  

Run the server in development mode:  

```sh
npm run dev
```  

### Testing  

Run all unit tests with Jest:  

```sh
npm run test
```  

## 📌 Project Structure  

```plaintext
📂 src
 ┣ 📂 controllers    # Handles request logic
 ┣ 📂 services       # Business logic
     ┣ 📂 dtos       # Handles validation with Zod and data mapping
 ┣ 📂 __tests__       # Unit tests using Jest & Supertest
 ┗ 📜 index.ts        # Main server configuration
