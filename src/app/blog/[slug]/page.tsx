import PageHeader from '@/components/PageHeader';
import { fetchApi } from '@/helpers/fetch-api';
import { formatDate } from '@/helpers/format-date-helper';
import { Post } from '@/interfaces/post';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';

const getData = async (slug = '') => {
  const path = '/posts';
  const urlParamsObject = {
    populate: '*',
    filters: {
      slug: slug,
    },
  };
  const { data } = await fetchApi(path, urlParamsObject);
  return data[0];
};

interface Props {
  params: {
    slug: string;
  };
}

const Slug = async ({ params }: Props) => {
  const { slug } = params;
  const post: Post = await getData(slug);
  if (!post) {
    return notFound();
  }

  const { title, description, body, createdAt, image } = post.attributes;
  const { url, width, height } = image.data.attributes.formats.medium;
  return (
    <div className='space-y-8 dark:bg-slate-700'>
      <PageHeader text={title} />
      <p className='text-gray-500'>{formatDate(createdAt)}</p>
      <Image
        className='h-auto rounded-lg'
        src={url}
        alt={`imagen de ${title}`}
        width={width}
        height={height}
      />
      <p className='mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left'>
        {description}
      </p>

      <div className='prose dark:text-gray-400'>
        <MDXRemote source={body} />
      </div>

      {/* {
        <p className='mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left'>
          {body}
        </p>
      } */}
    </div>
  );
};
export default Slug;
