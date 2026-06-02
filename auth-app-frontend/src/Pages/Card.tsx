type CardProps = {
  name: string;
  sign: React.ElementType;
  text: string;
  check: React.ElementType;
};

const Card = (props:CardProps) => {
  return (
    <div className="flex flex-col border-1 border-gray-600 rounded-md p-2 dark:bg-slate-800/40 gap-2 justify-between h-fu">
      <div className="flex flex-row justify-center gap-2">
        <span className="logo border-1 border-gray-500  p-2 rounded-md flex self-start shadow-gray-500 shadow-sm">
          <props.sign />
        </span>

        <div className="flex flex-col gap-2">
          <div className="font-semibold text-md">
            {props.name}
          </div>
          <div className=" text-xs font-light text-black dark:text-white">
            {props.text}
          </div>
        </div>
        </div>

        <div>
          <div className="flex flex-row justify-center items-center gap-2 ">
           <props.check />
            <span className="text-xs font-light text-black font-semibold dark:text-white">Lorem ipsum dolor sit amet.</span>
          </div>
          </div>
      </div>
    
  )
}

export default Card
