# VisioBrain 🧠🔍

VisioBrain is a revolutionary one-click platform designed to simplify data analysis for users of all skill levels. No coding or statistical expertise required!

## Features

- 🖱️ One-Click Analysis: Upload data and select analysis type for instant insights
- 📊 Universal Data Support: Compatible with diverse data formats
- 🤖 Automated Operations: From descriptive stats to predictive modeling
- 📈 Interactive Visualizations: Data storytelling through charts and reports
- 🛠️ Customizable Options: Tailor analysis to your specific needs
- 🔄 Continuous Improvement: Ongoing updates and feature enhancements

## Tech Stack

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Additional: Python for data processing
- Authentication & Security: Firebase

## Prerequisites

- Node.js and npm (Node Package Manager)
- MongoDB
- Python 3.x

## Installation & Setup

1. Clone the repository:
   ```
   git clone https:/Kandarp-Joshi-007/github.com//visiobrain.git
   cd visiobrain
   ```

2. Set up the server:
   ```
   cd server
   npm install
   ```
   If you encounter errors, try:
   ```
   npm install --force
   ```

3. Set up the client:
   ```
   cd ../client
   npm install
   ```
   If you encounter errors, try:
   ```
   npm install --force
   ```

## Running the Application

You need to run both the server and client simultaneously. Open two terminal windows:

1. In the first terminal, start the server:
   ```
   cd server
   nodemon app
   ```
   If `nodemon` is not available, try:
   ```
   node app.js
   ```
   or
   ```
   node app
   ```

2. In the second terminal, start the client:
   ```
   cd client
   npm start
   ```

Both the server and client should now be running in parallel.

## Usage

1. Open your web browser and navigate to `http://localhost:3000` (or the port specified by the client)
2. Upload your data file
3. Select the type of analysis you want to perform
4. Click the analyze button
5. View and interact with the generated insights and visualizations

## Contributing

We welcome contributions to VisioBrain! Please feel free to submit pull requests or open issues for bugs and feature requests.

## Contact

For any queries or support, please contact [kandarpjoshi0809@gmail.com]
