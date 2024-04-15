-- Creación de la tabla Categories
CREATE TABLE Categories (
    ID INT PRIMARY KEY,
    Name VARCHAR(255),
    Description TEXT
);

-- Creación de la tabla Products
CREATE TABLE Products (
    ID INT PRIMARY KEY,
    Name VARCHAR(255),
    Price INT,
    image VARCHAR(255),
    Category_ID INT,
    Value INT,
    Stock VARCHAR(255),
    Creation_Date VARCHAR(255),
    FOREIGN KEY (Category_ID) REFERENCES Categories(ID)
);

-- creación de la tabla saveTransaction
CREATE TABLE IF NOT EXISTS saveTransaction (
      id SERIAL PRIMARY KEY,
      name VARCHAR(80) NOT NULL,
      price INTEGER NOT NULL,
      image VARCHAR(255) NOT NULL,
      category_id INTEGER NOT NULL,
      value INTEGER NOT NULL,
      stock VARCHAR(255) NOT NULL,
      idProduct VARCHAR(255) NOT NULL,
      creation_date VARCHAR(255) NOT NULL,
      numberOfProducts INTEGER NOT NULL
)
-- categories
INSERT INTO categories (ID, Name, Description) VALUES ('Balde', 'Aceite 100% sintético de extra alto rendimiento para motores diésel.');
INSERT INTO categories (ID, Name, Description) VALUES ('Tambor', 'Aceite 100% sintético de extra alto rendimiento para motores diésel.');
INSERT INTO categories (ID, Name, Description) VALUES ('Galón', 'Aceite 100% sintético de extra alto rendimiento para motores diésel.');
INSERT INTO categories (ID, Name, Description) VALUES ('Cuarto', 'Aceite tecnología sintética con 50% mayor protección contra el desgaste*.');

-- products

INSERT INTO products (ID, Name, Price, image, Category_ID, Value, Stock, Creation_Date) VALUES (1, 'Mobiaal', 100000, 'https://res.cloudinary.com/dbtk64lp4/image/upload/v1713103540/xankse82jpdcvbwuh9wf.png', 1, 5, 'In Stock', '2021-10-10');

INSERT INTO products (ID, Name, Price, image, Category_ID, Value, Stock, Creation_Date) VALUES (1, 'Mobil Delvac ModernTM 10W-40 Advanced Protection 2', 1000, 'https://res.cloudinary.com/dbtk64lp4/image/upload/v1713103540/xankse82jpdcvbwuh9wf.png', 500000, 5, 'In Stock', '2021-10-10');
