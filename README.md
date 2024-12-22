# Ecommerce Admin

This project is an admin dashboard for an e-commerce platform built with **Next.js**. It leverages technologies like **MongoDB**, **AWS S3**, and **TailwindCSS** to provide a robust and scalable admin interface.

---

## Table of Contents

1. [Features](#features)  
2. [Installation](#installation)  
3. [Scripts](#scripts)  
4. [Usage](#usage)  
5. [Technologies Used](#technologies-used)  
6. [Admin Setup](#admin-setup)  
7. [Contributing](#contributing)  
8. [License](#license)

---

## Features

- User authentication with **NextAuth.js**  
- Database management using **MongoDB** and **Mongoose**  
- File uploads to **AWS S3**  
- Responsive UI with **TailwindCSS**  
- Drag-and-drop functionality using **Sortable.js**  
- Alerts and notifications with **SweetAlert2**

---

## Installation

### Prerequisites

- **Node.js** (v16 or higher)  
- **Yarn** (preferred over npm for dependency management)  
- A configured **MongoDB** instance  
- AWS credentials for **S3**  

### Steps

1. Clone the repository:  

   ```bash
   git clone https://github.com/your-username/ecommerce-admin.git
   cd ecommerce-admin
   ```

2. Install dependencies:  

   ```bash
   yarn install
   ```

3. Configure environment variables:  

   Create a `.env.local` file in the root directory with the following:  

   ```env
   NEXTAUTH_SECRET=<your-nextauth-secret>
   GOOGLE_ID=<your-google-client-id>
   GOOGLE_SECRET=<your-google-client-secret>
   MONGODB_URI=<your-mongodb-uri>
   AWS_ACCESS_KEY_ID=<your-aws-access-key>
   AWS_SECRET_ACCESS_KEY=<your-aws-secret-key>
   AWS_S3_BUCKET_NAME=<your-aws-s3-bucket-name>
   ```

4. Run the development server:  

   ```bash
   yarn dev
   ```

---

## Scripts

Here are the scripts available in the project:

- `yarn dev`: Starts the development server on [http://localhost:3000](http://localhost:3000).  
- `yarn build`: Builds the application for production.  
- `yarn start`: Starts the production server.  
- `yarn lint`: Lints the codebase using ESLint.

---

## Usage

1. Start the development server:  

   ```bash
   yarn dev
   ```

2. Access the dashboard at [http://localhost:3000](http://localhost:3000).  
3. Use the admin dashboard to manage products, orders, and other e-commerce features.

---

## Technologies Used

- **Frontend**: React, Next.js, TailwindCSS, Styled Components  
- **Backend**: Next.js API routes, MongoDB, Mongoose  
- **File Storage**: AWS S3  
- **Utilities**: Axios, Multiparty, React-SortableJS, SweetAlert2  

---

## Admin Setup

To set up admin access for specific users, follow these steps:

1. Open the file located at `/pages/api/auth/[...nextauth].js`.  
2. Add the email address of the user you want to make an admin to the `adminEmails` array. For example:  

   ```javascript
   const adminEmails = [
     'chiemgiabaost@gmail.com',
     'kuriseti.sravan@gmail.com',
     'jeremyj3@my.yorku.ca',
     'victor980911@yahoo.com'
   ];
   ```

3. Save the file. Users with the specified email addresses will now have admin access.

---

## Contributing

Contributions are welcome! Follow these steps:  

1. Fork the repository.  
2. Create a new branch:  

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes:  

   ```bash
   git commit -m "Add your message here"
   ```

4. Push to the branch:  

   ```bash
   git push origin feature/your-feature-name
   ```

5. Create a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

