import { items } from "../data";
import { useState ,useEffect} from "react";
import ItemCard from "./ItemCard";
export default function Game(){
    const [items,setItems]=useState([
        {name:'Banana Peel',type:'wet',img:'/banana.jpg'},
        {name:'Plastic Bottle',type:'dry',img:'/bottle.jpg'},
        {name:'Battery',type:'hazardous',img:'/battery.jpg'},
        {name:'broken-toy',type:'dry',img:'/broken-toy.jpg'},
        {name:'bulb',type:'hazardous',img:'/bulb-broken.jpg'},
        {name:'chips',type:'dry',img:'/chips.jpg'},
        {name:'expiredMedicine',type:'hazardous',img:'/expiredMedicine.jpg'},
        {name:'left-over-food',type:'wet',img:'/left-over.jpg'},
        {name:'newspaper',type:'dry',img:'/newspaper.jpg'},
        {name:'vegetable_scraps',type:'wet',img:'/vegetable_scraps.png'},
        {name:'chocolate_wrapper',type:'dry',img:'/chocolate.png'},
        {name:'glues',type:'hazardous',img:'/glues.png'}
    ])  
    
    const bins=[
        {label:'Wet Bin',type:'wet',img:'/wet-bin.png'},
        {label:'Dry Bin',type:'dry',img:'/dry-bin.png'},
        {label:'Hazardous Bin',type:'hazardous',img:'/hazardous-bin.png'}
    ]
    const [score, setScore] = useState(0);
    const [binMood,setBinMood]=useState({type:null,mood:null});
    const [wrongOnce,setWrongOnce]=useState(false);
    const [fading,setFading]=useState(false);
    const [feedback,setFeedback]=useState("");

    const [touchedItem, setTouchedItem] = useState(null);


   const handleDragStart=(e,item)=>{
       e.dataTransfer.setData('item',JSON.stringify(item));
   }
   const handleDrop=(e,binType)=>{
       e.preventDefault();
       const droppedItem=JSON.parse(e.dataTransfer.getData('item'));
       if(droppedItem.type===binType){
         if(!wrongOnce){
             setScore((prev)=>prev+1);
         }
         setTimeout(()=>{
             setItems((prevItems) => prevItems.slice(1));
         },1000)
         setFading(true);
         setFeedback("✅ Correct! Great Job!");
         setBinMood({type:binType,mood:'happy'})
         setWrongOnce(false);
       }
       else{
         setFeedback(`❌ Oops! That's ${droppedItem.type} waste.`);
         setBinMood({type:binType,mood:'sad'});
         setWrongOnce(true);

       }
       setTimeout(() => {
            setFeedback('');
            setBinMood({type:null,mood:null})
           // setItems((prevItems) => prevItems.slice(1));
            setFading(false);
       }
       , 1000);
       setCurrentIndex((prev)=>prev+1);
   }


   const handleDropTouch = (touchedItem, binType) => {
  if (!touchedItem) return;

  if (touchedItem.type === binType) {
    if (!wrongOnce) {
      setScore((prev) => prev + 1);
    }
    setTimeout(() => {
      setItems((prevItems) => prevItems.slice(1));
    }, 1000);
    setFading(true);
    setFeedback("✅ Correct! Great Job!");
    setBinMood({ type: binType, mood: "happy" });
    setWrongOnce(false);
  } else {
    setFeedback(`❌ Oops! That's ${touchedItem.type} waste.`);
    setBinMood({ type: binType, mood: "sad" });
    setWrongOnce(true);
  }

  setTimeout(() => {
    setFeedback("");
    setBinMood({ type: null, mood: null });
    setFading(false);
  }, 1000);

  setCurrentIndex((prev) => prev + 1);
};



useEffect(() => {
  items.forEach(item => new Image().src = item.img);
  bins.forEach(bin => {
    new Image().src = bin.img;
    new Image().src = `/happy-${bin.type}-bin.png`;
    new Image().src = `/sad-${bin.type}-bin.png`;
  });
}, []);



const handleTouchStart = (e, item) => {
  const touch = e.touches[0];
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();

  const offsetX = touch.clientX - rect.left;
  const offsetY = touch.clientY - rect.top;

  el.dataset.offsetX = offsetX;
  el.dataset.offsetY = offsetY;

  setTouchedItem(item);
};

const handleTouchMove = (e) => {
  const touch = e.touches[0];
  const el = e.currentTarget;

  el.style.position = 'absolute';
  el.style.zIndex = 9999;

  const offsetX = Number(el.dataset.offsetX);
  const offsetY = Number(el.dataset.offsetY);

  // el.style.left = `${touch.clientX - offsetX}px`;
  // el.style.top = `${touch.clientY - offsetY}px`;
  el.style.transform = `translate(${touch.clientX - offsetX}px, ${touch.clientY - offsetY}px)`;

};

const handleTouchEnd = (e) => {
  const touch = e.changedTouches[0];
  const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);

  if (dropTarget) {
    const binElement = dropTarget.closest("[data-bin-type]");
    const binType = binElement?.dataset?.binType;

    if (binType && touchedItem) {
      handleDropTouch(touchedItem, binType);
    }
  }

  const el = e.currentTarget;
  el.style.position = "";
  el.style.left = "";
  el.style.top = "";
  el.style.zIndex = "";

  setTouchedItem(null);
};





   const allowDrop=(e)=>e.preventDefault();

    const currentItem=items[0];
    return(
        <div className="p-4">
            <h1 className="text-3xl font-bold text-center mb-6">♻️ Waste Segregation Game</h1>
            
              {currentItem ? (
        <div className={`flex flex-col items-center mb-10 transition-opacity duration-1000 ${fading ? "opacity-0" : "opacity-100"}`}>
       <div className="relative h-36 w-36 flex items-center justify-center">
  <img
    src={currentItem.img}
    alt={currentItem.name}
    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain cursor-move animate-bounce touch-none"
    draggable
    onDragStart={(e) => handleDragStart(e, currentItem)}
     onTouchStart={(e) => handleTouchStart(e, currentItem)}
  onTouchMove={(e) => handleTouchMove(e)}
  onTouchEnd={(e) => handleTouchEnd(e)}
  

    
  />
</div>





          <p className={`mt-2 font-semibold transition-opacity duration-500 `}>{currentItem.name}</p>
        </div>
      ) : (
        // <h2 className="text-xl font-bold text-green-700">🎉 Game Over! Your Score: {score}</h2>
        null
      )}

   





      {/* Bins */}
      {/* <div className="flex items-center justify-center gap-10 mt-6">
        {bins.map((bin, index) => (
          <div
            key={index}
            onDrop={(e) => handleDrop(e, bin.type)}
            onDragOver={allowDrop}
            className="flex flex-col items-center border-4 border-dashed rounded-2xl p-4 shadow-lg hover:scale-105 transition-transform bg-white"
          >
            <img
              src={bin.img}
              alt={bin.label}
              className="w-32 h-32 object-contain"
            />
            <span className="mt-2 font-bold text-lg text-gray-700">{bin.label}</span>
          </div>
        ))}
      </div> */}

      {/* {
        items.length>0 && (
            <div className="flex items-center justify-center gap-10 mt-6">
                {bins.map((bin,index)=>(
                    <div key={index} onDrop={(e)=>handleDrop(e,bin.type)}
                       onDragOver={allowDrop} className="flex flex-col items-center border-4 border-dashed rounded-2xl p-4 shadow-lg hover:scale-105
                         transition-transform bg-white
                       "
                    >         

                        {/* <img src={bin.img} alt={bin.label} className="w-32 h-32 object-contain"/> */}
{/*           
                         let binImage = bin.img;
            if (binMood.type === bin.type) {
              if (binMood.mood === "happy") binImage = `/happy-${bin.type}-bin.png`;
              else if (binMood.mood === "sad") binImage = `/sad-${bin.type}-bin.png`;
            }



                        <span className="mt-2 font-bold text-lg text-gray-700">{bin.label}</span>

                    </div>
                ))}

            </div>
        )
      } */} 

       {items.length > 0 && (
  // <div className="flex flex-wrap items-center justify-center gap-10 mt-6">
    <div className="flex flex-wrap justify-center items-center gap-4 mt-8 relative">
    {bins.map((bin, index) => {
      // 🛠️ Move logic here, before the return
      let binImage = bin.img;
      if (binMood.type === bin.type) {
        if (binMood.mood === "happy") {
          binImage = `/happy-${bin.type}-bin.png`;
        } else if (binMood.mood === "sad") {
          binImage = `/sad-${bin.type}-bin.png`;
        }
      }

      return (
        <div
          key={index}
          data-bin-type={bin.type}
          onDrop={(e) => handleDrop(e, bin.type)}
          onDragOver={allowDrop}
   

          className={`flex flex-col items-center border-4 border-dashed rounded-2xl p-4 shadow-lg hover:scale-105 transition-transform bg-white 
              ${binMood.type===bin.type  ?   binMood.mood==="happy" ? "animate-rotate-pop" : binMood.mood==="sad" ? "animate-shake":"":""}
            
            `}
        >
          {/* ✅ Use the resolved image */}
          <img
            src={binImage}
            alt={bin.label}
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contai"
          />
          <span className="mt-2 font-bold text-lg text-gray-700">{bin.label}</span>
        </div>
      );
    })}
  </div>
)}





       
       {feedback && (
  <div className="mt-4 text-center text-xl font-semibold text-purple-700 animate-pulse">
    {feedback}
  </div>
)}


      {items.length==0 && (
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white bg-opacity-80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl text-center border-4 border-green-300">
                 <img src="ecochamps.jpg" alt="Congratulations" className="mx-auto mb-4 w-32 h-32 object-contain"/>
                <h2>🎉 Game Over!</h2>
                <p>Your eco score : <span className="text-green-600">{score}</span></p>
                <p>Great job ! saving the planet 🌍 </p>
                <button onClick={()=>window.location.reload()} className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-700 text-white 
                 font-semibold rounded-full shadow-lg transition duration-200
                ">🔁Play again</button>
            </div>
        </div>
      )}


    </div>
        
    );
};

