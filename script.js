"use strict";

let shoppingCart = [];

let product = {
  productId: 1,
  productImage: 'src',
  productName: 'Name',
  productPrice: 100,
  productNumber: 1
};

class ShoppingItems {
  constructor(id, img, price, number, title, description){
    this.id = id;
    this.img = img;
    this.price = price;
    this.title = title;
    this.description = description;
    this.number = +number;
  }
  addNumber() {
    this.number += 1;
    
  }
  minusNumber() {
    this.number -= 1;
    
  }
}

let handlers = {
  addToCart(id) {

    let block = document.getElementById(id);
    let imgSrc = block.childNodes[1].childNodes[0].currentSrc;
    let price = block.childNodes[5].childNodes[0].textContent;
    let number = 1;
    let title = block.childNodes[3].childNodes[1].textContent;
    let description = block.childNodes[3].childNodes[3].textContent;
    
    shoppingCart.push( new ShoppingItems(id, imgSrc, price, number, title, description) );
    
    view.renderShoppingCart();
  }
  
  
};

let view = {
  setUpEventListener() {
    let shoppingList = document.getElementsByClassName("left");

    shoppingList[0].addEventListener('click', function(event) {
      //debugger;

      let clickedElement = event.target;
      let toBeAddedToCartId = clickedElement.parentNode.id;
      if (clickedElement.constructor.name === "HTMLButtonElement") {
        handlers.addToCart(toBeAddedToCartId);
        
      }
    });

  },
  renderShoppingCart() {
    let blockWrapper = document.getElementsByClassName('blockWrapper')[0];
    blockWrapper.innerHTML = '';
    
    for (let i = 0; i < shoppingCart.length; i++ ){
      let newBlock = document.createElement('div');
      newBlock.className = "rightBlock";
      
      let backgroundCircle = document.createElement('div');
      backgroundCircle.className = "backgroundCircle";
      
      let newImageBlock = document.createElement('div');
      newImageBlock.className = "imageBlock";
      let newImage = document.createElement('img');
      newImage.src = shoppingCart[i].img;
      newImageBlock.appendChild(newImage);
      
      let newTitle = document.createElement('h4');
      let newTitleText = document.createTextNode(shoppingCart[i].title);
      newTitle.appendChild(newTitleText);
      
      let newPrice = document.createElement('div');
      newPrice.className = "price";
      let newPriceText = document.createTextNode(shoppingCart[i].price);
      newPrice.appendChild(newPriceText);
      
      let numberWrapper = document.createElement('div');
      numberWrapper.className = 'numberWrapper';
      
      let newMinusButton = document.createElement('div');
      newMinusButton.className = 'minusButton';
      let newMinusButtonText = document.createTextNode('<');
      newMinusButton.appendChild(newMinusButtonText);
      numberWrapper.appendChild(newMinusButton);
      
      let number = document.createElement('div');
      number.className = 'number';
      let numberText = document.createTextNode(shoppingCart[i].number);
      number.appendChild(numberText);
      numberWrapper.appendChild(number);
      
      let newAddButton = document.createElement('div');
      newAddButton.className = 'addButton';
      let newAddButtonText = document.createTextNode('>');
      newAddButton.appendChild(newAddButtonText);
      numberWrapper.appendChild(newAddButton);

      //newBlock.appendChild(backgroundCircle);
      newBlock.appendChild(newImageBlock);
      newBlock.appendChild(newTitle);
      newBlock.appendChild(newPrice);
      newBlock.appendChild(numberWrapper);
      newBlock.setAttribute("id", shoppingCart[i].id);
      
      
      newBlock.addEventListener('click', addOrMinus);
    
      function addOrMinus(event){
        let clickedElement = event.target;
        
        if (clickedElement.className === "addButton") {
          shoppingCart[i].addNumber();
          view.renderShoppingCart();
        }
        if (clickedElement.className === "minusButton") {
          shoppingCart[i].minusNumber();
          view.renderShoppingCart();
        } 
      }


      document.getElementsByClassName('blockWrapper')[0].appendChild(newBlock);
    }
    
    
    
    
    
  }
};

view.setUpEventListener();




//To dos
//We need to display the items to the webpage
//We need to be able to add items to the list
//We need animation of the click button




//To dos
//We need to display the items to the webpage
//We need to be able to add items to the list
//We need animation of the click button

