function ContentContainer({ children }) {
  return (
    <div className="w-[640px] border-l-black-2 border-r-black-2 border-border h-full bg-layout-main overflow-hidden">
      {children}
    </div>
  );
}

export default ContentContainer;
