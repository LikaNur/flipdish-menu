import { useEffect, useState } from 'react';
import { displayPrice } from './displayPrice';
import { Modal } from './Modal';
import { enqueueSnackbar } from 'notistack';

function App() {
  const [menu, setMenu] = useState([]);
  const [selected, setSelectedItem] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  function addToCart(selected) {
    enqueueSnackbar(`Added ${selected.Name} to the cart!`, {
      variant: 'success',
    });
    setCartCount(cartCount + 1);

    {
      selected && setSelectedItem(null);
    }
  }

  const handleModalOpen = menuItem => {
    if (!selected) {
      setSelectedItem(menuItem);
    }
  };
  const handleModalClose = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    fetch(
      'https://menus.flipdish.co/prod/16798/e6220da2-c34a-4ea2-bb51-a3e190fc5f08.json'
    )
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setMenu(data.MenuSections);
      })
      .catch(error => {
        console.error(
          `'There was a problem with the fetch operation:' ${error}`
        );
      });
  }, []);

  return (
    <>
      <header className='flex justify-between mt-6'>
        <a href='https://www.flipdish.com/gb' target='blank' aria-label='link'>
          <img
            src='/src/assets/flipdish-logo.svg'
            alt='Flipdish Logo'
            draggable='false'
            className='w-[135px] h-[40px]'
          />
        </a>
        <div className='flex relative'>
          <img
            src='/src/assets/shopping-cart.png'
            alt='Shopping Cart'
            draggable='false'
            className='w-6 h-6'
          />
          <p className='rounded-4xl bg-[#E02500]/85 bottom-8 left-4 px-2 absolute flex text-sm text-white cursor-pointer'>
            {cartCount}
          </p>
        </div>
      </header>
      <h1 className='text-4xl font-bold text-center mt-6 text-[#0B75D7]'>
        MENU
      </h1>
      <main className='my-4 flex flex-col gap-6 mb-12'>
        {menu
          .filter(menuSection => !/test/i.test(menuSection.Name))
          .map(menuSection => {
            return (
              <div key={menuSection?.MenuSectionId}>
                {menuSection?.Name && (
                  <h2 className='text-lg md:text-xl font-bold underline-offset-8 my-9'>
                    {menuSection.Name.toUpperCase()}
                    <hr className='w-full mx-auto border-gray-200 border-2 rounded-sm'></hr>
                  </h2>
                )}
                <section className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                  {menuSection?.MenuItems.filter(
                    menuItem => !/test/i.test(menuItem.Name)
                  ).map(menuItem => {
                    const isDisabled = menuItem.MenuItemOptionSets.length === 0;
                    return (
                      <section
                        key={menuItem?.MenuItemId}
                        className='flex flex-col gap-2 border rounded-xl bg-white border-gray-100 shadow-sm p-4'
                      >
                        <button
                          type='button'
                          aria-label='Like button'
                          className='flex self-end cursor-pointer'
                          onClick={() => addToCart(menuItem)}
                        >
                          <img
                            src='/src/assets/like-icon.png'
                            alt='Like Icon'
                            draggable='false'
                            className='like-icon w-5 h-5 mb-2 mr-2 transition-transform duration-200 hover:scale-120'
                            loading='lazy'
                          />
                        </button>
                        {menuItem?.ImageUrl && (
                          <div className='shrink-0 lg:w-[450px] h-[250px] overflow-hidden rounded-2xl'>
                            <img
                              src={menuItem.ImageUrl}
                              alt={menuItem?.Name || 'Menu Item'}
                              draggable='false'
                              className='h-full w-full object-cover rounded-2xl transition-transform duration-400 hover:scale-110'
                              loading='lazy'
                            />
                          </div>
                        )}
                        <div>
                          {menuItem?.Name && (
                            <h4 className='text-lg font-bold tracking-wide'>
                              {menuItem.Name}
                            </h4>
                          )}
                          {menuItem?.Description && (
                            <p className='text-gray-500 line-clamp-3'>
                              {menuItem.Description}
                            </p>
                          )}
                        </div>
                        <div className='flex justify-between mt-auto items-center text-start'>
                          <p className='text-xl font-bold'>
                            {displayPrice(menuItem)}
                          </p>
                          <button
                            key={menuItem?.MenuItemId}
                            onClick={() => handleModalOpen(menuItem)}
                            className={`pointer text-white rounded-3xl px-4 py-2 ${
                              isDisabled
                                ? 'bg-[#9cc5ee]  cursor-not-allowed'
                                : 'bg-[#1879D8] hover:bg-[#2574bd] cursor-pointer'
                            } `}
                            disabled={isDisabled}
                          >
                            Customize &gt;
                          </button>
                        </div>
                      </section>
                    );
                  })}
                </section>
              </div>
            );
          })}
      </main>

      {selected && (
        <Modal
          item={selected}
          onClose={handleModalClose}
          onAddToCart={addToCart}
        />
      )}
    </>
  );
}

export default App;
