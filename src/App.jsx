import { Fragment, useEffect, useState } from 'react';

function App() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch(
      'https://menus.flipdish.co/prod/16798/e6220da2-c34a-4ea2-bb51-a3e190fc5f08.json'
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        setMenu(data.MenuSections);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <header className='flex justify-between'>
        <img
          src='/src/assets/flipdish-logo.svg'
          alt='Flipdish Logo'
          className='w-[135px] h-[40px] my-4'
        />
        <img
          src='/src/assets/shopping-cart.png'
          alt='Shopping Cart'
          className='w-6 h-6 my-4'
        />
      </header>
      <h1 className='text-4xl font-bold text-center mt-6 text-[#0B75D7]'>
        MENU
      </h1>
      <main className='my-4 flex flex-col gap-6'>
        {menu.map(menuSection => {
          return (
            <>
              <h2 className='text-lg md:text-xl font-bold underline-offset-8 mt-9'>
                {menuSection?.Name.toUpperCase()}
                <hr class='w-full mx-auto border-gray-400 border-2 border-double rounded-sm'></hr>
              </h2>
              <section className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                {menuSection?.MenuItems.map(menuItem => {
                  return (
                    <>
                      <section className='flex flex-col gap-2 border rounded-xl border-gray-100 shadow-sm p-4'>
                        <div className='shrink-0 lg:w-[450px] h-[200px] overflow-hidden rounded-2xl'>
                          <img
                            src={menuItem?.ImageUrl}
                            alt={menuItem?.Name}
                            className='h-full w-full object-cover rounded-2xl transition-transform duration-400 hover:scale-120'
                          />
                        </div>
                        <div>
                          <h4 className='text-lg font-bold tracking-wide'>
                            {menuItem?.Name}
                          </h4>
                          <p className='text-gray-500 line-clamp-3'>
                            {menuItem?.Description}
                          </p>
                        </div>
                        <p className='mt-auto text-end text-xl'>
                          {menuItem?.Price}£
                        </p>
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
