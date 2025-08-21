import { useEffect, useState } from 'react';
import { Modal } from './Modal';
import { enqueueSnackbar } from 'notistack';
import { MenuSection } from './MenuSection';

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
        <MenuSection
          section={menu}
          onClick={handleModalOpen}
          onAddToCart={addToCart}
        />
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
