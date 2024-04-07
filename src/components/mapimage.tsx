function MapImage() {
  return (
    <div className="flex overflow-hidden relative flex-col items-end pt-6 pr-6 pb-20 pl-16 mt-20 max-w-full text-base font-medium leading-5 text-black whitespace-nowrap shadow-sm min-h-[592px] w-[1600px] max-md:px-5 max-md:mt-10">
      <img
        loading="lazy"
        srcSet="src\assets\map.png"
        className="object-contain absolute inset-0 h-full w-full" 
      />
      <div className="absolute top-6 right-40 px-7 py-5 bg-white rounded-3xl max-md:px-5"> 
        Search Area
      </div>
    </div>
  );
}

export default MapImage;
