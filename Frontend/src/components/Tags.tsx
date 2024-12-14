const Tags = ({ text }: { text: string }) => {
  return (
    <div
      className={`border border-black-500 bg-black-700 w-fit xl:px-3 xl:py-1 px-2 py-1 sm:text-sm xl:text-base text-xs rounded-full `}
    >
      {text}
    </div>
  );
};

export default Tags;
