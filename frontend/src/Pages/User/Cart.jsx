import { useUserCartItem } from '@/hooks/User/user.hook';
import { useDeleteProduct, useUpdateQuantity } from '@/hooks/Cart/cart.hook';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCheckoutHook } from '@/hooks/Product/product.hook';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Cart = () => {
  const { data: cartItems = [], isLoading } = useUserCartItem();
  const { mutate: updateQuantity, isPending } = useUpdateQuantity();
  const { mutate: checkout, isLoading: checkoutLoading } = useCheckoutHook();
  const { mutate: deleteCartItem } = useDeleteProduct();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    const products = cartItems?.map((item) => ({
      _id: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
    }));

    checkout({ products });
  };

  const handleIncrease = (productId) => {
    updateQuantity({ productId, operation: "increase" });
  };

  const handleDecrease = (productId) => {
    updateQuantity({ productId, operation: "decrease" });
  };

  const handleDelete = (productId) => {
    deleteCartItem(productId);
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <div className='text-gray-500'>Loading cart...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-6xl mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-6'>
          <Link 
            to='/product' 
            className='inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4'
          >
            <ArrowLeft className='h-4 w-4' />
            Continue Shopping
          </Link>
          <h1 className='text-2xl font-semibold text-gray-900'>Shopping Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className='bg-white rounded-lg border border-gray-200 p-12 text-center'>
            <ShoppingBag className='h-16 w-16 text-gray-300 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>Your cart is empty</h3>
            <p className='text-gray-500 mb-6'>Add items to get started</p>
            <Link to='/product'>
              <Button>Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className='grid lg:grid-cols-3 gap-6'>
            {/* Cart Items */}
            <div className='lg:col-span-2 space-y-4'>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className='bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition'
                >
                  <div className='flex gap-4'>
                    {/* Product Image */}
                    <div className='flex-shrink-0'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='w-24 h-24 object-cover rounded-md border border-gray-100'
                      />
                    </div>

                    {/* Product Details */}
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-start justify-between mb-2'>
                        <div className='flex-1 pr-4'>
                          <h3 className='font-medium text-gray-900 text-sm mb-1 line-clamp-2'>
                            {item.name}
                          </h3>
                          <p className='text-sm text-gray-600'>₹{item.price}</p>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(item._id)}
                          className='p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition'
                          aria-label='Remove item'
                        >
                          <Trash2 className='h-4 w-4' />
                        </button>
                      </div>

                      {/* Quantity Controls & Price */}
                      <div className='flex items-center justify-between mt-3'>
                        <div className='flex items-center gap-2'>
                          <button
                            onClick={() =>
                              item.quantity > 1
                                ? handleDecrease(item._id)
                                : handleDelete(item._id)
                            }
                            disabled={isPending}
                            className='p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 transition'
                          >
                            <Minus className='h-3.5 w-3.5 text-gray-600' />
                          </button>

                          <span className='text-sm font-medium text-gray-900 w-8 text-center'>
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => handleIncrease(item._id)}
                            disabled={isPending}
                            className='p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 transition'
                          >
                            <Plus className='h-3.5 w-3.5 text-gray-600' />
                          </button>
                        </div>

                        <div className='font-semibold text-gray-900'>
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className='lg:col-span-1'>
              <div className='bg-white rounded-lg border border-gray-200 p-6 sticky top-4'>
                <h2 className='text-lg font-semibold text-gray-900 mb-4'>
                  Order Summary
                </h2>

                <div className='space-y-3 mb-4'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Subtotal</span>
                    <span className='text-gray-900 font-medium'>
                      ₹{totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Shipping</span>
                    <span className='text-green-600 font-medium'>Free</span>
                  </div>
                  <div className='border-t border-gray-200 pt-3'>
                    <div className='flex justify-between'>
                      <span className='font-semibold text-gray-900'>Total</span>
                      <span className='font-semibold text-gray-900 text-lg'>
                        ₹{totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className='w-full'
                >
                  {checkoutLoading ? 'Processing...' : 'Proceed to Checkout'}
                </Button>

                <p className='text-xs text-gray-500 text-center mt-4'>
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
