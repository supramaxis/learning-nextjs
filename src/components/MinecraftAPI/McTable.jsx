export default function McTable({ minecraft }) {
  return (
    <div>
      <div className='overflow-x-auto relative shadow-md sm:rounded-lg flex items-center justify-center'>
        <table className='w-0 text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='py-3 px-6'>
                Name
              </th>
              <th scope='col' className='py-3 px-6'>
                Category
              </th>
              <th scope='col' className='py-3 px-6'>
                Minecraft ID Name
              </th>
              <th scope='col' className='py-3 px-6'>
                Is Stackable?
              </th>
              <th scope='col' className='py-3 px-6'>
                Max Stack Size
              </th>
              <th scope='col' className='py-3 px-6'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {minecraft.map((mc, i) => {
              return (
                <tr
                  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                  key={i}>
                  <th
                    scope='row'
                    className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    {mc.name}
                  </th>
                  <td className='py-4 px-6'>{mc.category}</td>
                  <td className='py-4 px-6'>{mc.minecraft_id_name}</td>
                  <td className='py-4 px-6'>{mc.stackable}</td>
                  <td className='py-4 px-6'>{mc.max_stack_size}</td>
                  <td className='py-4 px-6'>
                    <a
                      href='#'
                      className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
                      Edit
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

