// import { useCheckoutHook } from '@/hooks/Product/product.hook';
// import { useUserCartItem } from '@/hooks/User/user.hook'
// import React, { useState } from 'react'

// const Cart = () => {
//    const { data: cartItems = [] } = useUserCartItem(); 
//    const { mutate: checkout, isLoading: checkoutLoading } = useCheckoutHook();
//     const [couponCode, setCouponCode] = useState("");

//     console.log(cartItems)
//     // console.log(cartItems)
//    const handleCheckout = () => {
//     // Step 1: Check cart empty to nahi
//     if (cartItems.length === 0) {
//       alert("Cart is empty");
//       return;
//     }

//     // Step 2: Cart items ko backend format me convert karo
//     const products = cartItems?.map((item) => ({
//       _id: item._id,
//       name: item.name,
//       price: item.price,
//       image: item.image,
//       quantity: item.quantity,
//     }));

//     console.log(products)
//     // Step 3: Backend ko bhej do
//     checkout({ products, couponCode: couponCode || undefined });
//   };
  
//   // ... rest of component


//   // console.log(cartItems)
//   return (
//     <div>
//       {
//         cartItems?.map((item,index)=>{
//           return(
//             <div key={index} className=' flex flex-col items-center justify-center '>
//               <div className='flex flex-col'>
//                 <div className='h-24 w-24 '>
//                 <img className='h-full w-full object-contain' src={item.image} alt="" />

//               </div>
//               {item?.name}

             

//               <div className='flex items-center justify-center gap6'>
//                 <h1>increaseQuantity</h1>
//                  {item.quantity}
//                 <h1>decreaseQuantity</h1>
//               </div>
//               </div>
//             </div>
//           )
//         })
//       }

//       <button onClick={handleCheckout}>
//         data
//       </button>
//     </div>
//   )
// }

// export default Cart



// src/pages/Cart.jsx
import { useUserCartItem } from '@/hooks/User/user.hook';
import { useUpdateQuantity } from '@/hooks/Cart/cart.hook';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCheckoutHook } from '@/hooks/Product/product.hook';

const Cart = () => {
  const { data: cartItems = [], isLoading } = useUserCartItem();
  const { mutate: updateQuantity, isPending } = useUpdateQuantity();
const { mutate: checkout, isLoading: checkoutLoading } = useCheckoutHook();

   const handleCheckout = () => {
    // Step 1: Check cart empty to nahi
    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    // Step 2: Cart items ko backend format me convert karo
    const products = cartItems?.map((item) => ({
      _id: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
    }));

    console.log(products)
    // Step 3: Backend ko bhej do
    checkout({ products });
  };
  
  const handleIncrease = (productId) => {
    updateQuantity({ productId, operation: "increase" });
  };

  const handleDecrease = (productId) => {
    updateQuantity({ productId, operation: "decrease" });
  };

  if (isLoading) return <div>Loading cart...</div>;

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className='text-gray-500'>Your cart is empty</p>
      ) : (
        <div className='space-y-4'>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className='flex items-center gap-4 bg-white border rounded-lg p-4'
            >
              <img
                src={item.image}
                alt={item.name}
                className='w-24 h-24 object-cover rounded'
              />

              <div className='flex-1'>
                <h3 className='font-semibold text-lg'>{item.name}</h3>
                <p className='text-gray-600'>₹{item.price}</p>
              </div>

              {/* Quantity Controls */}
              <div className='flex items-center gap-3'>
                 <Trash2 className='w-4 h-4 text-red-600' />
                <button
                  onClick={() => handleDecrease(item._id)}
                  disabled={isPending}
                  className='p-2 border rounded hover:bg-gray-100 disabled:opacity-50'
                >
                 
                 <Minus className='w-4 h-4' />
                </button>

                <span className='font-medium text-lg w-8 text-center'>
                  {item.quantity}
                </span>

                <button
                  onClick={() => handleIncrease(item._id)}
                  disabled={isPending}
                  className='p-2 border rounded hover:bg-gray-100 disabled:opacity-50'
                >
                  <Plus className='w-4 h-4' />
                </button>
              </div>

              {/* Item Total */}
              <div className='font-bold text-lg'>
                ₹{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}

          {/* Cart Total */}
          <div className='bg-gray-50 p-4 rounded-lg'>
            <div className='flex justify-between text-xl font-bold'>
              <span>Total:</span>
              <span>
                ₹
                {cartItems
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      <h1 onClick={handleCheckout}>submit</h1>
    </div>
  );
};

export default Cart;
