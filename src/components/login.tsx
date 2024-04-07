
function Login() {
  return (
    <div className="flex flex-col items-center px-20 py-16 max-w-lg text-base bg-white rounded-3xl max-md:px-5">
      <div className="mt-5 text-4xl font-bold tracking-tighter text-sky-500 leading-[49px]">
        Login
      </div>
      <div className="flex gap-5 justify-between px-4 py-3.5 mt-16 max-w-full whitespace-nowrap bg-white rounded-3xl border border-violet-300 border-solid text-stone-900 w-[313px] max-md:mt-10">
        <div className="self-start mt-3">Username</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/36926529292b60d9d99a0b43cad698dfb62162c0b5f32cd996964a166d30f932?"
          className="shrink-0 aspect-[1.04] w-[27px]"
        />
      </div>
      <div className="flex gap-5 justify-between px-4 py-4 mt-8 max-w-full whitespace-nowrap bg-white rounded-3xl border border-violet-300 border-solid text-stone-900 w-[313px]">
        <div className="my-auto">Password</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/90c81ed823e897068317c0545da3816c477dca8dc76800fce88d5117a5b81ea4?"
          className="shrink-0 aspect-[1.09] w-[26px]"
        />
      </div>
      <div className="mt-4 text-sm text-cyan-900">Forgot password?</div>
      <div className="flex gap-5 justify-between items-start py-4 pr-7 pl-20 mt-16 max-w-full text-sky-50 whitespace-nowrap rounded-3xl w-[313px] max-md:px-5 max-md:mt-10">
        <div>Login</div>
        <img
          loading="lazy"
          srcSet="..."
          className="shrink-0 border-2 border-white border-solid aspect-[1.25] stroke-[2px] stroke-white w-[15px]"
        />
      </div>
      <div className="flex gap-2.5 mt-20 text-base max-md:mt-10">
        <div className="grow text-cyan-900">New here?</div>
        <div className="flex-auto font-bold text-sky-600 underline">
          Register Now!
        </div>
      </div>
    </div>
  );
}
export default Login;