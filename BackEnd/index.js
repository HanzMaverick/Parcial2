const express = require('express');
const cors = require('cors');
const app = express();
const employeeRoutes = require('./routes/employeeRoutes');

app.use(cors()); 
app.use(express.json());
app.use('/employees', employeeRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

