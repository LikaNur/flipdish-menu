import { useEffect, useRef } from 'react';

export function Modal({ item, onClose, onAddToCart }) {
  const modalRef = useRef();

  function handleClickOutsideModal(event) {
    if (item && modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  }

  useEffect(() => {
    if (!item) return;

    document.addEventListener('pointerdown', handleClickOutsideModal);

    return () =>
      document.removeEventListener('pointerdown', handleClickOutsideModal);
  }, [item]);

  return (
    <div className='modal-container fixed inset-0 w-full h-full flex justify-center items-center px-4  bg-black/85'>
      <div
        ref={modalRef}
        role='dialog'
        aria-modal='true'
        className='modal bg-white w-[30rem] rounded-2xl p-8'
      >
        <div className='flex justify-between'>
          <h2 id='modal-title' className='modal-header text-lg font-bold'>
            CUSTOMIZE YOUR CHOICE
          </h2>
          <button
            type='reset'
            aria-label='Close button'
            onClick={onClose}
            className='hover:bg-[#EEEDED] rounded-3xl p-2 cursor-pointer flex self-end'
          >
            <img
              src='/src/assets/close-icon.png'
              alt='Close Icon'
              draggable='false'
              className='w-5 h-5'
            />
          </button>
        </div>
        <p className='text-sm text-gray-500'>
          Please choose options as of your preference
        </p>

        <section id='modal-content' className='modal-content pr-3 mt-6 mb-12'>
          {item.MenuItemOptionSets.map(menuOption =>
            menuOption.MenuItemOptionSetItems.map(menuOptionItem => {
              return (
                <div
                  key={menuOptionItem.MenuItemOptionSetItemId}
                  className='flex justify-between pb-2'
                >
                  <div className='flex gap-2'>
                    <input
                      type='radio'
                      id={menuOptionItem.MenuItemOptionSetItemId}
                      name={menuOption.MenuItemOptionSetId}
                      value={menuOptionItem.Name}
                    />
                    <label htmlFor={menuOptionItem.Name}>
                      <label className='pr-2'>{menuOptionItem?.Name}</label>
                    </label>
                  </div>
                  {typeof menuOptionItem?.Price === 'number' && (
                    <p>£{menuOptionItem.Price.toFixed(2)}</p>
                  )}
                </div>
              );
            })
          )}
        </section>
        <div className='flex justify-center'>
          <button
            className='modal-submit-btn flex justify-between cursor-pointer p-4 bg-[#1879D8] gap-4 rounded-4xl hover:ring-blue-500 hover:ring-1'
            onClick={() => onAddToCart(item)}
          >
            <img
              src='/src/assets/shopping-cart-white.png'
              alt='Shopping Cart'
              draggable='false'
              className='w-4 h-4'
            />
            <p className='text-[#1879D8] text-sm font-bold'>ADD TO CART</p>
          </button>
        </div>
      </div>
    </div>
  );
}
