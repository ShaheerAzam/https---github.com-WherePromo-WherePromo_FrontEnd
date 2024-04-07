interface HeroProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  ctaText: string;
  ctaColor: string;
}

const HeroSection: React.FC<HeroProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  ctaText,
  ctaColor,
}) => {
  return (
    <div className="flex flex-col px-5 w-full max-w-full max-md:max-w-full">
      <div className="max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch my-auto max-md:mt-10 max-md:max-w-full">
              <h1 className="text-5xl font-medium tracking-widest bg-clip-text leading-[69px] text-sky-500 max-md:max-w-full max-md:text-4xl max-md:leading-[64px]">
                <span>{title.split(" ")[0]} </span>
                <span>{title.split(" ")[1]} </span>
                <span>{title.split(" ").slice(2).join(" ")}</span>
              </h1>
              <p className="mt-14 text-xl text-zinc-400 max-md:mt-10 max-md:max-w-full">
                {description}
              </p>
            </div>
          </div>
          <div className="flex flex-col ml-5 mt-2 w-6/12 max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src={imageSrc}
              alt={imageAlt}
              className="grow w-full aspect-[1.23] max-md:mt-10 max-md:max-w-full"
            />
          </div>
        </div>
      </div>
      <button
        className={`justify-center self-start px-12 py-4 mt-1.5 text-xl text-white whitespace-nowrap rounded-3xl max-md:px-5 ${ctaColor}`}
      >
        {ctaText}
      </button>
    </div>
  );
};

export default HeroSection;