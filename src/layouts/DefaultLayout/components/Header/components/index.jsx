const WrapperHeader = ({ children }) => {
  return (
    <div className="relative w-full h-full flex left-[7px] bg-layout-background border-b">
      {/* Children - FeedHeader */}
      {children}

      <div className="w-full sm:max-w-[640px]  h-[50px] absolute  top-[35px] md:top-[49px] left-0 ">
        <div className="w-full sm:max-w-[640px] h-[50px] relative">
          <div
            className="absolute w-[50px] h-[50px] left-[-25px] top-0  overflow-hidden  pointer-events-none  bg-transparent"
            aria-hidden="true"
          >
            <div
              className="w-[50px] h-[50px] border border-border rounded-full relative left-[25px] top-[25px]"
              style={{
                outline: "100px solid var(--color-layout-background)",
              }}
            />
          </div>

          <div
            className="absolute w-[50px] h-[50px] right-[-25px] top-0 overflow-hidden bg-transparent pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="w-[50px] h-[50px] border border-border rounded-full relative right-[25px] top-[25px]"
              style={{
                outline: "100px solid var(--color-layout-background)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WrapperHeader;
