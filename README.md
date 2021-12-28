# React Cart

In module 19 of bootcamp, we were provided the starter code for a single page application React shopping cart.  We were asked to implement a couple of pieces of implementation. After doing the assignment, I refactored the application, making the following improvements:

1) I changed the UI to make moving products from the product list to the cart more intuitive.
2) When a product is depleted it disappears from the product list.
3) When the cart has been "paid for", no more items can be added to the existing cart. New cart button added.
4) I simplified the restocking code - in the starter code, this relied on a custom hook that then called a useEffect hook and utilized a useReducer hook. For such a simple application, this seemed overly complicated.
5) When items are restocked, the app first checks to see if some of that product is already on the shelf.  If so, the quantity is simply updated. If not, a new item is added.
6) I added two properties to each item of stock - a product Id and the name of the designated .png photo.

## Instructions

Note that in order to use the restock function, you will need to create your own third party database, using the hard-coded product list as a guide to the fields needed. I used Strapi.

After downloading this application, open the command line, navigate to the root director and type the command nmp start.
