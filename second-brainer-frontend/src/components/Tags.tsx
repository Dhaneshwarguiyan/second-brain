const Tags = ({ text }: { text: string }) => {
  return (
    <div
      className={`border border-black-500 bg-black-700 w-fit px-4 py-2 rounded-full `}
    >
      {text}
    </div>
  );
};

export default Tags;
