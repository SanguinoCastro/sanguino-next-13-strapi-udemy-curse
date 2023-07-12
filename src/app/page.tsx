import PageCardImage from '@/components/PageCardImage';
import PageHeader from '@/components/PageHeader';
import PagePagination from '@/components/PagePagination';
import { fetchApi } from '@/helpers/fetch-api';
import { Post } from '@/interfaces/post';
import Image from 'next/image';
import Link from 'next/link';

const getData = async (page = 1, pageSize = 2) => {
  const path = '/posts';
  const urlParamsObject = {
    populate: '*',
    sort: {
      createdAt: 'asc',
    },
    pagination: {
      page: page,
      pageSize: pageSize,
    },
  };
  const { data, meta } = await fetchApi(path, urlParamsObject);
  return {
    data,
    pagination: meta.pagination,
  };
};

interface Props {
  searchParams: {
    page?: string;
  };
}
const Home = async ({ searchParams }: Props) => {
  const { page } = searchParams;

  let pageNumber = page ? parseInt(page) : 1;

  if (isNaN(pageNumber) || pageNumber < 1) {
    pageNumber = 1;
    console.log(
      'Valor no válido como parámetro de página. Se establece a 1 🤞'
    );
  }

  const { data, pagination } = await getData(pageNumber);

  return (
    <div className='dark:bg-slate-800 space-y-8'>
      <PageHeader text='¡Bienvenidos!' />
      <Image
        className='rounded-t-lg'
        src='https://res.cloudinary.com/dneoubwsw/image/upload/v1688984397/avatar_30c0501b4b.png'
        alt={`image welcome`}
        width={1355}
        height={1525}
      />
      <div className='text-center'>
        <Link
          href={`/blog`}
          className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Acceder al Blog
          <svg
            className='w-3.5 h-3.5 ml-2'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 10'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M1 5h12m0 0L9 1m4 4L9 9'
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};
export default Home;
