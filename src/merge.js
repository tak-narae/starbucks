const fs = require('fs');
const path = require('path');

// JSON 파일 경로
const beveragePath = path.join(__dirname, 'db', 'beverage.json');
const coffeePath = path.join(__dirname, 'db', 'coffee.json');
const foodPath = path.join(__dirname, 'db', 'food.json');
const productPath = path.join(__dirname, 'db', 'product.json');

// JSON 파일 읽기
const beverageData = JSON.parse(fs.readFileSync(beveragePath, 'utf8'));
const coffeeData = JSON.parse(fs.readFileSync(coffeePath, 'utf8'));
const foodData = JSON.parse(fs.readFileSync(foodPath, 'utf8'));
const productData = JSON.parse(fs.readFileSync(productPath, 'utf8'));

// 병합된 데이터 생성
const mergedData = {
  beverage: beverageData,
  coffee: coffeeData,
  food: foodData,
  product: productData
};

// 병합된 데이터를 새로운 JSON 파일로 저장
const outputPath = path.join(__dirname, 'db', 'db.json');
fs.writeFileSync(outputPath, JSON.stringify(mergedData, null, 2));

console.log('JSON 파일이 성공적으로 병합되었습니다.');