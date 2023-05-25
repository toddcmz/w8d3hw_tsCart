import {v4 as uuidv4} from 'uuid'

type Item = {
    id:string
    itemName:string
    price: number
    description:string
}

type User = {
    id: string
    fullName: string
    age: number
    cart: Item[]
}

function createUser(userName:string, userAge:number):User{

    const thisUser:User = {
        id: uuidv4(),
        fullName: userName,
        age: userAge,
        cart: []
    }
    return(thisUser)
}

function createItem(nameOfItem:string, itemPrice:number, itemDesc:string ):Item{

    const thisItem:Item = {
        id: uuidv4(),
        itemName: nameOfItem,
        price: itemPrice,
        description: itemDesc
    }
    return thisItem
}

function addToCart(thisItem:Item, thisUser:User):void{
    thisUser.cart.push(thisItem)
}

function removeFromCart(thisItem:Item, thisUser:User):void{
    thisUser.cart = thisUser.cart.filter(item => item.itemName !== thisItem.itemName)
}

function removeQuantityFromCart(thisItem:Item, thisUser:User, quantity:number):void{
    let itemCount:number = 0
    for(let i=0; i<thisUser.cart.length; i++){
        if(thisUser.cart[i].itemName === thisItem.itemName){
            itemCount +=1
        } // end if
    } // end get count of items for loop
    // if our count of items is less than or equal to removal quantity, run remove from cart
    if (itemCount <= quantity){
        removeFromCart(thisItem, thisUser)
    }else{
        let countRemoved:number = 0
        const tempCart:Item[] = []
        for(let ele of thisUser.cart){
            if (ele.itemName !== thisItem.itemName || countRemoved === quantity){
                tempCart.push(ele)
            }else{
                // if we're here in the if chain then the name should equal the target
                // and we should not have removed the target quantity yet, skip this item.
                // and increment count removed (it's removed by not adding it to the)
                // temp cart, which will become the new cart when we're done.
                countRemoved += 1
            } // end if - checking if we add the item to the new car
        }// end for - for each item in the old cart
        // reassign the temp cart as that users cart, which should now have the correct
        // number of htings removed
        thisUser.cart = tempCart
    }// end handling removal if chain entirely
}

function cartTotal(thisUser:User):number{
    let tempTotal:number = 0
    if(thisUser.cart.length === 0){
        return 0
    }else{
        for(let ele of thisUser.cart){
            tempTotal += ele.price
        }
        return tempTotal
    }
}

function printCart(thisUser:User):void{
    console.log(thisUser.cart)
}

const toddc = createUser('Todd Camnitz', 36)
const tshirt1 = createItem("fridgeShirt", 20, 't shirt with a funny haiku')
const tshirt2 = createItem('calvinShirt', 15, 'unlicensed comic material')
const tshirt3 = createItem('vbShirt', 30, 'dryfit sports shirt')

addToCart(tshirt1, toddc)
printCart(toddc)
console.log(cartTotal(toddc))

addToCart(tshirt2, toddc)
addToCart(tshirt2, toddc)
addToCart(tshirt2, toddc)
printCart(toddc)
console.log(cartTotal(toddc))

addToCart(tshirt3, toddc)
addToCart(tshirt3, toddc)
addToCart(tshirt3, toddc)
printCart(toddc)
console.log(cartTotal(toddc))

removeFromCart(tshirt2, toddc)
printCart(toddc)
console.log(cartTotal(toddc))

removeQuantityFromCart(tshirt3, toddc, 2)
printCart(toddc)
console.log(cartTotal(toddc))

