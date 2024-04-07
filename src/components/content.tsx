
interface ContentProps {
  title: string;
  description: string;
  linkText: string;
  linkColor: string;
}

const Content: React.FC<ContentProps> = ({
  title,
  description,
  linkText,
  linkColor,
}) => {
  return (
    <div className="text-center">
      <h2 className="self-center mt-40 text-3xl tracking-widest leading-10 text-center text-zinc-800 max-md:mt-10 max-md:max-w-full">
        {title}
      </h2>
     <div className="flex justify-center"> 
        <p className="mt-11 text-xl text-center text-zinc-400 w-[653px] max-md:mt-10 max-md:max-w-full">
          {description}
        </p>
      </div>
      <a
        href="#"
        className={`self-end mt-10 mr-7 text-base font-bold whitespace-nowrap max-md:mt-10 max-md:mr-2.5 ${linkColor}`}
      >
        {linkText}
      </a>
    </div>
  );
};

export default Content;