interface Props {
  text: string;
}

const PageHeader = ({ text }: Props) => {
  return (
    <h1 className='mt-8 text-5xl font-extrabold dark:text-white text-center'>
      {text}
    </h1>
  );
};
export default PageHeader;
