"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { LuCalendarDays, LuMapPin } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import DestinationEditModal from "@/app/components/DestinationEditModal";


const DestinationDetailsPage = ({ params }) => {
  const [destination, setDestination] = useState(null);


  useEffect(() => {
    const getDestination = async () => {
      const { id } = await params;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE}/api/destinations/${id}`,
       
      );

      const data = await res.json();
      setDestination(data);
    };

    getDestination();
  }, [params]);

  if (!destination) {
    return <div className="max-w-7xl mx-auto">Loading...</div>;
  }

  const {
    _id,
    imageUrl,
    destinationName,
    description,
    country,
    duration,
    price,
  } = destination;

  
  return (
    <div className="max-w-7xl mx-auto" suppressHydrationWarning>
      <div className="mb-4 flex justify-end gap-3">
       <DestinationEditModal
          destination={destination}
          setDestination={setDestination}
        />
        <FaTrash size={20} className="text-red-500 cursor-pointer" />
      </div>
      <Image
        src={imageUrl}
        loading="eager"
        alt={destinationName}
        width={800}
        height={500}
        className="w-full h-96 object-cover rounded-lg"
      />

      <div className="grid grid-cols-6 mt-5 gap-5">
        <div className="col-span-4">
          <p className="flex items-center gap-1 text-muted mt-3">
            <LuMapPin /> {country}
          </p>

          <h1 className="text-4xl font-bold mt-2">{destinationName}</h1>

          <p className="mt-2">{description}</p>

          <div className="text-muted flex items-center gap-1">
            <LuCalendarDays size={15} />
            <span className="mt-1">{duration}</span>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default DestinationDetailsPage;
