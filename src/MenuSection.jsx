import { displayPrice } from './displayPrice';

export function MenuSection({ section, onAddToCart, onClick }) {
  return (
    <>
      {section
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
                        onClick={() => onAddToCart(menuItem)}
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
                          onClick={() => onClick(menuItem)}
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
    </>
  );
}
