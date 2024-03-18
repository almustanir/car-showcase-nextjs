"use client";
import { useEffect, useState } from "react";

import { CustomFilter, Hero, SearchBar, CarCard, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";
import Image from "next/image";
import { useSearchParams } from "next/navigation";


export default function Home() {
  const [allCars, setAllCars] =useState([]);
  const [loading, setLoading] = useState(false);

  //search state

  const [manufacturer, setmanufacturer] = useState("");
  const [model, setmodel] = useState("");

  //filter state
  const [fuel, setfuel] = useState("");
  const [year, setyear] = useState(2022);

  //pagination state
  const [limit, setlimit] = useState(10);
  const getCars = async () => {
    const result = await fetchCars({
      manufacturer: manufacturer || '',
      year: year || 2022,
      fuel: fuel || '',
      limit: limit || 10,
      model: model || '',
    });

    setAllCars(result);
  }
  
useEffect (() => {
  getCars();
}, [fuel,year,limit,manufacturer,model])
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl fonnt-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ?  (
          <section>
           <div className="home__cars-wrapper">
              {allCars?.map((car) => ( 
              <CarCard car={car}/>
              
              ))}

           </div>
           <ShowMore
            pageNumber={(searchParams.limit || 
              10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
           />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Ooops, No result </h2>
            <p>{allCars?.message}</p>
          </div>
        )}


      </div>
    </main>
  );
}
