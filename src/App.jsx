import { useEffect, useRef, useState } from 'react';

function App() {
  const [menu, setMenu] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  let modalRef = useRef();

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  function handleClickOutsideModal(e) {
    if (
      isModalOpen &&
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      handleModalClose();
    }
  }

  useEffect(() => {
    if (!isModalOpen) return;

    document.addEventListener('pointerdown', handleClickOutsideModal);

    return () =>
      document.removeEventListener('pointerdown', handleClickOutsideModal);
  }, [isModalOpen]);

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
        console.log(data);
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
      <header className='flex justify-between'>
        <img
          src='/src/assets/flipdish-logo.svg'
          alt='Flipdish Logo'
          draggable='false'
          className='w-[135px] h-[40px] my-4'
        />
        <div>
          <img
            src='/src/assets/shopping-cart.png'
            alt='Shopping Cart'
            draggable='false'
            className='w-6 h-6 my-4'
          />
        </div>
      </header>
      <h1 className='text-4xl font-bold text-center mt-6 text-[#0B75D7]'>
        MENU
      </h1>
      <main className='my-4 flex flex-col gap-6'>
        {menu
          .filter(menuSection => !/test/i.test(menuSection.Name))
          .map(menuSection => {
            return (
              <>
                {menuSection?.Name && (
                  <h2 className='text-lg md:text-xl font-bold underline-offset-8 mt-9'>
                    {menuSection.Name.toUpperCase()}
                    <hr className='w-full mx-auto border-gray-200 border-2 rounded-sm'></hr>
                  </h2>
                )}
                <section
                  key={menuSection?.MenuSectionId}
                  className='grid grid-cols-1 md:grid-cols-2 gap-12'
                >
                  {menuSection?.MenuItems.filter(
                    menuItem => !/test/i.test(menuItem.Name)
                  ).map(menuItem => {
                    return (
                      <>
                        <section
                          key={menuItem?.MenuItemId}
                          className='flex flex-col gap-2 border rounded-xl bg-white border-gray-100 shadow-sm p-4'
                        >
                          <button
                            type='button'
                            aria-label='Like button'
                            className='flex self-end cursor-pointer'
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
                                src={menuItem.ImageUrl || 'Menu Item'}
                                alt={menuItem?.Name}
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
                          <div className='flex justify-between mt-auto text-start'>
                            {menuItem?.Price > 0 ? (
                              <p className='text-xl font-medium'>
                                £{menuItem?.Price.toFixed(2)}
                              </p>
                            ) : (
                              menuItem.MenuItemOptionSets.map(options => (
                                <p
                                  key={options.MenuItemOptionSetId}
                                  className='text-xl font-medium'
                                >
                                  from £{options?.MinPrice.toFixed(2)}
                                </p>
                              ))
                            )}
                            <button
                              onClick={handleModalOpen}
                              className='pointer text-white rounded-3xl bg-[#1879D8] hover:bg-[#2574bd] px-4 py-2 cursor-pointer'
                            >
                              Customize &gt;
                            </button>
                            {isModalOpen && (
                              <div className='modal-container fixed inset-0 w-full h-full flex justify-center items-center px-4  bg-black/20'>
                                <div
                                  ref={modalRef}
                                  className='modal bg-white w-[30rem] rounded-2xl p-6'
                                >
                                  <div className='flex justify-between'>
                                    <h2 className='modal-header text-lg font-bold'>
                                      CUSTOMIZE YOUR CHOICE
                                    </h2>
                                    <button
                                      type='reset'
                                      aria-label='Close button'
                                      onClick={handleModalClose}
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

                                  <section className='modal-content'></section>
                                  <button className='modal-submit-btn flex justify-between cursor-pointer p-4 bg-[#1879D8] gap-4 rounded-4xl hover:ring-blue-500 hover:ring-1'>
                                    <img
                                      src='/src/assets/shopping-cart-white.png'
                                      alt='Shopping Cart'
                                      draggable='false'
                                      className='w-5 h-5'
                                    />
                                    <p className='text-[#1879D8] text-sm font-bold'>
                                      ADD TO CART
                                    </p>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </section>
                      </>
                    );
                  })}
                </section>
              </>
            );
          })}
      </main>
    </>
  );
}

export default App;
