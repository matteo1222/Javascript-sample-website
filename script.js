"use strict";

let shoppingCart = [];

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
    
    view.renderShoppingCart( shoppingCart.length - 1, true );
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
        clickedElement.disabled = true;
        clickedElement.className = 'addedButton';
        
      }
    });

  },

  renderShoppingCart( i, fadeInTrueFalse ) {
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
    
    if (fadeInTrueFalse === true) {
      fadeIn(newBlock);
    }
    
    
    function fadeIn(element) {
    let op = 0.1;  // initial opacity
    let timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        
        //element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += 0.05;
    }, 10);
    }

    function addOrMinus(event){
      let clickedElement = event.target;

      if (clickedElement.className === "addButton") {
        shoppingCart[i].addNumber();
        view.renderShoppingCartAll();
      }
      if (clickedElement.className === "minusButton") {
        shoppingCart[i].minusNumber();
        if (shoppingCart[i].number === 0) {
          let toBeDeletedId = shoppingCart[i].id;

          let toBeDeletedItem = document.getElementById( toBeDeletedId );
          //make the button functional again
          toBeDeletedItem.lastElementChild.classList.remove("addedButton");
          toBeDeletedItem.lastElementChild.disabled = false;
          shoppingCart.splice(i, 1);

        } 


        //delete the item with number 0
        view.renderShoppingCartAll();
      } 
    }


    document.getElementsByClassName('blockWrapper')[0].appendChild(newBlock);
    
    
    
    
    
    
  },
  
  renderShoppingCartAll() {
    let blockWrapper = document.getElementsByClassName('blockWrapper')[0];
    blockWrapper.innerHTML = '';
    
    for (let i = 0; i < shoppingCart.length; i++ ) {
      this.renderShoppingCart(i, false);
    }
    
    
  }
};

view.setUpEventListener();




//To dos
//We need to display the items to the webpage
//We need to be able to add items to the list
//We need animation of the click button

