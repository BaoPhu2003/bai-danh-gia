function createId() {
  // trả về một chuỗi ngẫu nhiên gồm 12 ký tự: 0-9a-zA-Z;
  const characters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];
  let length = 12;
  let charactersLength = characters.length;
  let result = '';
  for (let i = 0; i < length; i++) {
    let idx = Math.floor(Math.random() * charactersLength);
    result += characters[idx];
  }
  return result;
}

const PRODUCTS = [
  {
    id: 'hBuZdx1elR5a',
    name: 'Fushigidane',
    thumb: 'Fushigidane.png',
    shortDesc:
      'Người ta thường thấy Fushigidane nằm ngủ dưới ánh nắng. Càng đắm mình trong nắng, hạt giống trên lưng chúng càng phát triển.',
    price: 12,
  },
  {
    id: 'fDQWzrgq6gXX',
    name: 'Hitokage',
    thumb: 'Hitokage.png',
    shortDesc: 'Tính cách ưa thích đồ nóng. Nghe nói khi trời mưa khói sẽ phụt ra từ đuôi của nó.',
    price: 15,
  },
  {
    id: 'aLjNSdeJi9Q2',
    name: 'Zenigame',
    thumb: 'Zenigame.png',
    shortDesc:
      'Chiếc mai của Zenigame không chỉ để tự vệ, mà còn làm giảm tối đa lực cản nước nhờ hình dáng tròn trịa cùng bề mặt nhiều rãnh, giúp chúng bơi nhanh hơn.',
    price: 25,
  },
  {
    id: 'rOYIHlZQlwdV',
    name: 'Pikachu',
    thumb: 'Pikachu.png',
    shortDesc: 'Những Pikachu có thể tạo ra dòng điện càng mạnh thì túi má càng mềm mại và lớn nhanh.',
    price: 32,
  },
  {
    id: 'zzC3HkWp9g4s',
    name: 'Purin',
    thumb: 'Purin.png',
    shortDesc:
      'Những bản thu âm tuyển tập bài hát ru kì lạ của Purin được bán tại các cửa hàng tạp hóa. Rất nhiều người coi chúng là vật gối đầu giường.',
    price: 9,
  },
];

let carts = [
    {
      id: 'qhZ2wNwZZW63',
      productId: 'hBuZdx1elR5a',
      quantity: 2,
    },
    {
      id: 'gijYjCti3BvR',
      productId: 'fDQWzrgq6gXX',
      quantity: 1,
    },
    {
      id: 'RQpImf7zc8ao',
      productId: 'aLjNSdeJi9Q2',
      quantity: 3,
    },
    {
      id: 'LPobAEvux29H',
      productId: 'rOYIHlZQlwdV',
      quantity: 6,
    },
    {
      id: 'PpLjmYoKdRG1',
      productId: 'zzC3HkWp9g4s',
      quantity: 1,
    },
];
window.onload = () => {
  createListProducts();
  changeQuantity();
}
const createListProducts = () =>{
  let xhtml = '';
  PRODUCTS.map(value => {
    xhtml += `
      <div class="row align-items-center">
        <div class="col-6 col-md-4">
          <img src="img/${value.thumb}" alt="" class="img-fluid">
        </div>
        <div class="col-6 col-md-8">
          <h6>${value.name}</h6>
          <div class="form-group">
            <div class="d-flex">
              <button class="btn btn-primary"> - </button>
              <input type="text" class="form-control mx-1" value="1" min="1">
              <button class="btn btn-primary"> + </button>
            </div>
            <button class="btn btn-danger btn-block mt-1 btn-add-to-cart">${value.price}</button>
          </div>
        </div>
      </div> 
    `
  });
  document.getElementById('listProducts').innerHTML = xhtml;
}
const changeQuantity = () => {
  const getFormProducts = document.getElementsByClassName('form-group');  
  let temp = [];
  for(let i in getFormProducts){
    let getQuantity = getFormProducts[i].querySelector('input').value;
    let btnChangeQuantity = getFormProducts[i].querySelectorAll('.btn-primary');
    temp.push(getQuantity);
    btnChangeQuantity.forEach((x,key)=> {
      if(key === 0) 
        x.addEventListener('click', () =>{
          if(temp[i] !== 1)
            getFormProducts[i].querySelector('input').value = --temp[i];
        });
      else
        x.addEventListener('click', () =>{
          getFormProducts[i].querySelector('input').value = ++temp[i];
        });
    });
  };
};